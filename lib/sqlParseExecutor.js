// sql-executor.js
import { Parser } from "node-sql-parser";

/**
 * Shape of input datasets = your existing sqlDatasets structure.
 * This class converts them to row objects and exposes a SQL engine over them.
 */
export default class SQLParseExecutor {
  constructor(sqlDatasets) {
    this.parser = new Parser();
    this.datasets = sqlDatasets;
    this.currentDatasetKey = null;
    this.tables = {}; // { tableName: Array<RowObj> }
    this.schemas = {}; // { tableName: Array<columnName> }
  }

  // ---------- Dataset loading ----------

  loadDataset(datasetName) {
    const ds = this.datasets[datasetName];
    if (!ds) throw new Error(`Dataset '${datasetName}' not found`);
    this.currentDatasetKey = datasetName;
    this.tables = {};
    this.schemas = {};

    Object.entries(ds.tables).forEach(([tableName, def]) => {
      const { columns, data } = def;
      this.schemas[tableName] = [...columns];
      this.tables[tableName] = data.map((rowArr) => {
        const obj = {};
        columns.forEach((c, i) => (obj[c] = rowArr[i]));
        return obj;
      });
    });
    return this.tables;
  }

  // ---------- Entry point ----------

  execute(sql) {
    try {
      if (!this.currentDatasetKey) {
        throw new Error("No dataset loaded. Please load a dataset first.");
      }

      const trimmed = sql.trim();
      const lc = trimmed.toLowerCase();

      // Custom helpers (not standard SQL)
      if (lc === "show tables" || lc.startsWith("show tables")) {
        return this._resp(
          true,
          ["table_name"],
          Object.keys(this.tables).map((t) => ({ table_name: t })),
          trimmed
        );
      }
      if (/^\s*(describe|desc)\s+/i.test(trimmed)) {
        const m = trimmed.match(
          /^\s*(?:describe|desc)\s+([a-zA-Z_][\w]*)\s*;?\s*$/i
        );
        if (!m) throw new Error("Invalid DESCRIBE syntax");
        const table = m[1];
        if (!this.tables[table])
          throw new Error(`Table '${table}' does not exist`);
        const cols =
          this.schemas[table] || Object.keys(this.tables[table][0] || {});
        const rows = cols.map((c) => ({
          column_name: c,
          data_type: this._inferType(table, c),
        }));
        return this._resp(true, ["column_name", "data_type"], rows, trimmed);
      }

      // Parse -> AST (may return array for multiple statements)
      let ast = this.parser.astify(sql);
      if (Array.isArray(ast)) {
        if (ast.length !== 1)
          throw new Error(
            "Only a single SQL statement is supported at a time."
          );
        ast = ast[0];
      }

      if (ast.type !== "select") {
        throw new Error(
          `Only SELECT is supported in practice mode (got: ${ast.type}).`
        );
      }

      // Execute SELECT AST
      const resultRows = this._executeSelectAst(ast);

      // Columns: infer from first row
      const columns = this._columnsFromRows(resultRows);

      return this._resp(true, columns, resultRows, sql);
    } catch (err) {
      return this._resp(false, [], [], sql, err?.message || String(err));
    }
  }

  // ---------- Core SELECT executor ----------

  _executeSelectAst(ast, outerContext = null) {
    // 1) Build FROM (including derived tables & joins)
    const fromRows = this._buildFrom(ast.from || [], outerContext);

    // 2) WHERE
    let filtered = ast.where
      ? fromRows.filter((r) => this._evalExpr(ast.where, r, outerContext))
      : fromRows;

    // 3) GROUP BY & aggregates
    let projectedRows;
    if (ast.groupby && ast.groupby.length) {
      const groups = this._groupBy(filtered, ast.groupby, outerContext);
      // Produce a single row per group using SELECT list (aggregate & group refs)
      projectedRows = groups.map((g) =>
        this._projectSelect(ast.columns, g, /*isGrouped*/ true, outerContext)
      );
      // 4) HAVING (after aggregation)
      if (ast.having) {
        projectedRows = projectedRows.filter((row) =>
          this._evalExpr(
            ast.having,
            { __row: row },
            outerContext,
            /*rowIsProjected*/ true
          )
        );
      }
    } else {
      // No GROUP BY → project rows one-by-one
      projectedRows = filtered.map((r) =>
        this._projectSelect(ast.columns, [r], /*isGrouped*/ false, outerContext)
      );
      // HAVING without GROUP BY is allowed only with aggregates across all rows; we emulate by treating as a 1-group
      if (ast.having) {
        const allAsGroup = [Object.assign({}, ...filtered)]; // placeholder, we re-eval using row wrapper
        projectedRows = projectedRows.filter((row) =>
          this._evalExpr(
            ast.having,
            { __row: row },
            outerContext,
            /*rowIsProjected*/ true
          )
        );
      }
    }

    // 5) DISTINCT
    if (ast.distinct) {
      const seen = new Set();
      projectedRows = projectedRows.filter((row) => {
        const key = JSON.stringify(row);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // 6) ORDER BY
    if (ast.orderby && ast.orderby.length) {
      projectedRows.sort((a, b) => {
        for (const ob of ast.orderby) {
          const av = this._evalExpr(ob.expr, { __row: a }, outerContext, true);
          const bv = this._evalExpr(ob.expr, { __row: b }, outerContext, true);
          if (av == null && bv != null) return ob.type === "DESC" ? 1 : -1;
          if (av != null && bv == null) return ob.type === "DESC" ? -1 : 1;
          if (av < bv) return ob.type === "DESC" ? 1 : -1;
          if (av > bv) return ob.type === "DESC" ? -1 : 1;
        }
        return 0;
      });
    }

    // 7) LIMIT/OFFSET
    if (ast.limit) {
      const v = ast.limit.value || [];
      const lim = Number(v[0]?.value ?? Infinity);
      const off = Number(v[1]?.value ?? 0);
      const start = isNaN(off) ? 0 : off;
      const end = isNaN(lim) ? projectedRows.length : start + lim;
      projectedRows = projectedRows.slice(start, end);
    }

    return projectedRows;
  }

  // ---------- FROM & JOIN ----------

  _buildFrom(fromArray, outerContext) {
    if (!fromArray || fromArray.length === 0) return [{}]; // no FROM → single empty row

    // Build initial source (first from)
    let leftRows = this._materializeSource(fromArray[0], outerContext);

    // Process any joins chained to first
    leftRows = this._applyJoins(
      leftRows,
      fromArray[0].join || [],
      outerContext
    );

    // If multiple FROM items (comma or explicit), CROSS JOIN between them
    for (let i = 1; i < fromArray.length; i++) {
      let right = this._materializeSource(fromArray[i], outerContext);
      right = this._applyJoins(right, fromArray[i].join || [], outerContext);

      const combined = [];
      for (const l of leftRows) {
        for (const r of right) {
          combined.push({ ...l, ...r });
        }
      }
      leftRows = combined;
    }

    return leftRows;
  }

  _materializeSource(src, outerContext) {
    // Source can be a table or a subquery (derived table)
    if (src.expr && src.expr.type === "select") {
      const rows = this._executeSelectAst(src.expr, outerContext);
      const alias = src.as || src.alias || "subq";
      return rows.map((r) => ({ [alias]: r }));
    }

    const tableName = src.table;
    if (!tableName) throw new Error("Malformed FROM clause.");
    const alias = src.as || src.alias || tableName;
    const data = this.tables[tableName];
    if (!data) throw new Error(`Table '${tableName}' does not exist`);

    // Return rows with table alias as a property
    return data.map((row) => ({
      [alias]: { ...row },
      __tableAlias: alias, // Store the alias for reference
    }));
  }

  _applyJoins(seedRows, joins, outerContext) {
    if (!joins || joins.length === 0) return seedRows;

    let left = seedRows;
    for (const j of joins) {
      const rightRows = this._materializeSource(j, outerContext);
      const type = (j.join || j.type || "INNER").toUpperCase();
      const onExpr = j.on || j.onExpr;

      const out = [];
      if (type.includes("LEFT")) {
        for (const L of left) {
          let matched = false;
          for (const R of rightRows) {
            const merged = { ...L, ...R };
            if (!onExpr || this._evalExpr(onExpr, merged, outerContext)) {
              out.push(merged);
              matched = true;
            }
          }
          if (!matched) {
            // right aliases → nulls
            const nullRight = {};
            Object.keys(rightRows[0] || {}).forEach((alias) => {
              nullRight[alias] = this._nullify(rightRows[0][alias]);
            });
            out.push({ ...L, ...nullRight });
          }
        }
      } else {
        // INNER (default)
        for (const L of left) {
          for (const R of rightRows) {
            const merged = { ...L, ...R };
            if (!onExpr || this._evalExpr(onExpr, merged, outerContext)) {
              out.push(merged);
            }
          }
        }
      }
      left = out;
    }
    return left;
  }

  _nullify(sampleAliasObj) {
    if (
      sampleAliasObj &&
      typeof sampleAliasObj === "object" &&
      !Array.isArray(sampleAliasObj)
    ) {
      const o = {};
      Object.keys(sampleAliasObj).forEach((k) => (o[k] = null));
      return o;
    }
    return null;
  }

  // ---------- GROUP BY & projection ----------

  _groupBy(rows, groupbyExprs, outerContext) {
    const buckets = new Map();
    for (const row of rows) {
      const keyVals = groupbyExprs.map((e) =>
        this._evalExpr(e, row, outerContext)
      );
      const key = JSON.stringify(keyVals);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(row);
    }
    return Array.from(buckets.values());
  }

  _projectSelect(columns, groupRows, isGrouped, outerContext) {
    // groupRows: array of source rows (one or many if grouped)
    // For non-grouped, groupRows[0] is the single row
    const projected = {};
    if (!columns || columns.length === 0) return {};

    // Handle SELECT *
    if (columns.length === 1 && columns[0].expr?.type === "star") {
      const col = columns[0];

      // If there's a table alias, only get columns from that table
      if (col.table) {
        const aliasObj = groupRows[0]?.[col.table];
        if (aliasObj) {
          Object.entries(aliasObj).forEach(([k, v]) => {
            if (k !== "__tableAlias") {
              projected[k] = v;
            }
          });
        }
        return projected;
      }

      // No table specified, get all columns from all tables
      const flat = {};
      groupRows.forEach((row) => {
        Object.entries(row).forEach(([tableAlias, aliasObj]) => {
          if (
            tableAlias !== "__tableAlias" &&
            aliasObj &&
            typeof aliasObj === "object"
          ) {
            Object.entries(aliasObj).forEach(([colName, value]) => {
              if (colName !== "__tableAlias") {
                flat[colName] = value;
              }
            });
          }
        });
      });
      return flat;
    }

    // Process each column in the SELECT clause
    for (const col of columns) {
      if (col.expr?.type === "star") {
        // Handle table.*
        if (col.table) {
          const aliasObj = groupRows[0]?.[col.table];
          if (aliasObj) {
            Object.entries(aliasObj).forEach(([k, v]) => {
              if (k !== "__tableAlias") {
                projected[k] = v;
              }
            });
          }
          continue;
        }
      }

      const val = this._evalSelectExpr(
        col.expr,
        groupRows,
        isGrouped,
        outerContext
      );
      const outName = col.as || this._exprOutputName(col.expr);
      projected[outName] = val;
    }
    return projected;
  }

  _exprOutputName(expr) {
    // best-effort output column name
    if (!expr) return "expr";
    if (expr.type === "column_ref") return expr.column;
    if (expr.type === "aggr_func") return expr.name;
    if (expr.type === "function") return expr.name;
    return "expr";
  }

  // Evaluate expression inside SELECT list:
  // - if aggregated: compute over groupRows
  // - else: compute from first row
  _evalSelectExpr(expr, groupRows, isGrouped, outerContext) {
    if (!expr) return null;

    // Aggregate?
    if (expr.type === "aggr_func") {
      const fn = (expr.name || "").toUpperCase();
      const distinct = !!expr.options?.distinct;
      // COUNT(*) support
      const argIsStar = expr.args === "*" || expr.args?.expr === "*";

      const values = argIsStar
        ? groupRows.map(() => 1)
        : groupRows.map((r) =>
            this._evalExpr(expr.args?.expr || expr.args, r, outerContext)
          );

      const vs = distinct
        ? Array.from(new Set(values.map((v) => JSON.stringify(v)))).map((s) =>
            JSON.parse(s)
          )
        : values;

      switch (fn) {
        case "COUNT":
          if (argIsStar) return groupRows.length;
          return vs.filter((v) => v !== null && v !== undefined).length;
        case "SUM":
          return vs.reduce((a, b) => a + (this._toNumber(b) ?? 0), 0);
        case "AVG": {
          const arr = vs.map(this._toNumber).filter((v) => !isNaN(v));
          return arr.length
            ? arr.reduce((a, b) => a + b, 0) / arr.length
            : null;
        }
        case "MIN": {
          const arr = vs.filter((v) => v !== null && v !== undefined);
          return arr.length ? arr.reduce((m, v) => (m < v ? m : v)) : null;
        }
        case "MAX": {
          const arr = vs.filter((v) => v !== null && v !== undefined);
          return arr.length ? arr.reduce((m, v) => (m > v ? m : v)) : null;
        }
        default:
          throw new Error(`Unsupported aggregate: ${fn}`);
      }
    }

    // Non-aggregate → just evaluate with first row in group
    return this._evalExpr(expr, groupRows[0], outerContext);
  }

  // ---------- Expression evaluator ----------

  _evalExpr(expr, row, outerContext, rowIsProjected = false) {
    if (!expr) return null;

    switch (expr.type) {
      // Literals
      case "number":
        return Number(expr.value);
      case "string":
        return expr.value;
      case "bool":
        return !!expr.value;
      case "null":
        return null;

      // Column reference: support alias.column and projected row (__row)
      case "column_ref": {
        const colref = expr.column; // can be "alias.col" or "col"
        const table = expr.table;
        if (rowIsProjected && row.__row) {
          // After projection (ORDER BY/HAVING over projected columns)
          const v = this._getProjected(row.__row, table, colref);
          return v;
        }
        return this._getValueFromRow(row, table, colref);
      }

      // Unary
      case "unary_expr": {
        const val = this._evalExpr(
          expr.expr,
          row,
          outerContext,
          rowIsProjected
        );
        switch ((expr.operator || "").toUpperCase()) {
          case "-":
            return -this._toNumber(val);
          case "+":
            return this._toNumber(val);
          case "NOT":
            return !val;
          default:
            throw new Error(`Unsupported unary operator: ${expr.operator}`);
        }
      }

      // Binary, logical, comparison, IN/BETWEEN/LIKE
      case "binary_expr": {
        const op = (expr.operator || "").toUpperCase();

        // Special right-side subquery for IN/EXISTS etc.
        if (op === "IN" || op === "NOT IN") {
          const leftVal = this._evalExpr(
            expr.left,
            row,
            outerContext,
            rowIsProjected
          );
          const rightVal = this._evalInRight(
            expr.right,
            row,
            outerContext,
            rowIsProjected
          );
          const found = rightVal.some((v) => this._sqlEqual(v, leftVal));
          return op === "IN" ? found : !found;
        }

        if (op === "EXISTS" || op === "NOT EXISTS") {
          const exists = this._evalExists(expr.right, row, outerContext);
          return op === "EXISTS" ? exists : !exists;
        }

        if (op === "BETWEEN") {
          const v = this._evalExpr(
            expr.left,
            row,
            outerContext,
            rowIsProjected
          );
          const lo = this._evalExpr(
            expr.right?.left || expr.right,
            row,
            outerContext,
            rowIsProjected
          );
          const hi = this._evalExpr(
            expr.right?.right || expr.right,
            row,
            outerContext,
            rowIsProjected
          );
          return v >= lo && v <= hi;
        }

        if (op === "LIKE" || op === "NOT LIKE") {
          const text = String(
            this._evalExpr(expr.left, row, outerContext, rowIsProjected) ?? ""
          );
          const patRaw =
            this._evalExpr(expr.right, row, outerContext, rowIsProjected) ?? "";
          const regex = new RegExp(
            "^" +
              String(patRaw)
                .replace(/([.*+?^${}()|[\]\\])/g, "\\$1")
                .replace(/%/g, ".*")
                .replace(/_/g, ".") +
              "$",
            "i"
          );
          const match = regex.test(text);
          return op === "LIKE" ? match : !match;
        }

        // Arithmetic/logical/compare
        const L = this._evalExpr(expr.left, row, outerContext, rowIsProjected);
        const R = this._evalExpr(expr.right, row, outerContext, rowIsProjected);

        switch (op) {
          case "+":
            return this._maybeAdd(L, R);
          case "-":
            return this._toNumber(L) - this._toNumber(R);
          case "*":
            return this._toNumber(L) * this._toNumber(R);
          case "/":
            return this._toNumber(L) / this._toNumber(R);
          case "%":
            return this._toNumber(L) % this._toNumber(R);

          case "=":
            return this._sqlEqual(L, R);
          case "!=":
          case "<>":
            return !this._sqlEqual(L, R);
          case ">":
            return L > R;
          case "<":
            return L < R;
          case ">=":
            return L >= R;
          case "<=":
            return L <= R;

          case "AND":
            return Boolean(L) && Boolean(R);
          case "OR":
            return Boolean(L) || Boolean(R);

          case "IS": {
            // IS NULL / IS NOT NULL
            if (expr.right?.type === "null")
              return L === null || L === undefined;
            if (expr.right?.type === "bool")
              return Boolean(L) === Boolean(expr.right.value);
            // e.g., IS NOT NULL is parsed as unary? Parser typically uses "IS" + "NOT" → operator "IS" + right: { type: 'not', ... } varies; we fallback below
            return this._sqlEqual(
              L,
              this._evalExpr(expr.right, row, outerContext, rowIsProjected)
            );
          }
          case "IS NOT": {
            if (expr.right?.type === "null")
              return !(L === null || L === undefined);
            return !this._sqlEqual(
              L,
              this._evalExpr(expr.right, row, outerContext, rowIsProjected)
            );
          }

          default:
            throw new Error(`Unsupported operator: ${op}`);
        }
      }

      // Case/When
      case "case": {
        for (const w of expr.args) {
          if (w.type === "when") {
            const cond = this._evalExpr(
              w.expr,
              row,
              outerContext,
              rowIsProjected
            );
            if (cond)
              return this._evalExpr(
                w.result,
                row,
                outerContext,
                rowIsProjected
              );
          }
        }
        return expr.else
          ? this._evalExpr(expr.else, row, outerContext, rowIsProjected)
          : null;
      }

      // Scalar functions
      case "function": {
        const fn = (expr.name || "").toUpperCase();
        const argsList = this._evalArgs(
          expr,
          row,
          outerContext,
          rowIsProjected
        );

        switch (fn) {
          case "UPPER":
            return String(argsList[0] ?? "").toUpperCase();
          case "LOWER":
            return String(argsList[0] ?? "").toLowerCase();
          case "LENGTH":
            return (argsList[0] ?? "").toString().length;
          case "ABS":
            return Math.abs(this._toNumber(argsList[0]));
          case "COALESCE": {
            for (const a of argsList)
              if (a !== null && a !== undefined) return a;
            return null;
          }
          case "CONCAT":
            return argsList.map((v) => (v == null ? "" : String(v))).join("");
          case "SUBSTR":
          case "SUBSTRING": {
            const s = String(argsList[0] ?? "");
            const start = (this._toNumber(argsList[1]) || 1) - 1;
            const len =
              argsList[2] == null ? undefined : this._toNumber(argsList[2]);
            return len == null ? s.slice(start) : s.slice(start, start + len);
          }
          case "ROUND": {
            const n = this._toNumber(argsList[0]);
            const p = this._toNumber(argsList[1] ?? 0);
            const f = Math.pow(10, p);
            return Math.round(n * f) / f;
          }
          default:
            throw new Error(`Unsupported function: ${fn}`);
        }
      }

      // Subquery as scalar expression
      case "select": {
        const rows = this._executeSelectAst(expr, outerContext);
        if (!rows.length) return null;
        const cols = Object.keys(rows[0]);
        return rows[0][cols[0]];
      }

      default:
        throw new Error(`Unsupported expression type: ${expr.type}`);
    }
  }

  _evalArgs(funcExpr, row, outerContext, rowIsProjected) {
    const args = [];
    if (!funcExpr.args) return args;
    if (Array.isArray(funcExpr.args.value)) {
      for (const a of funcExpr.args.value)
        args.push(this._evalExpr(a, row, outerContext, rowIsProjected));
    } else if (funcExpr.args?.expr) {
      args.push(
        this._evalExpr(funcExpr.args.expr, row, outerContext, rowIsProjected)
      );
    } else if (funcExpr.args !== "*") {
      args.push(
        this._evalExpr(funcExpr.args, row, outerContext, rowIsProjected)
      );
    }
    return args;
  }

  _evalInRight(rightExpr, row, outerContext, rowIsProjected) {
    // right side can be list or subquery
    if (rightExpr?.type === "select") {
      const rows = this._executeSelectAst(rightExpr, outerContext);
      if (!rows.length) return [];
      const col = Object.keys(rows[0])[0];
      return rows.map((r) => r[col]);
    }
    if (rightExpr?.type === "expr_list" && Array.isArray(rightExpr.value)) {
      return rightExpr.value.map((v) =>
        this._evalExpr(v, row, outerContext, rowIsProjected)
      );
    }
    // Fallback single value
    return [this._evalExpr(rightExpr, row, outerContext, rowIsProjected)];
  }

  _evalExists(subq, row, outerContext) {
    if (!subq || subq.type !== "select") return false;
    const rows = this._executeSelectAst(subq, outerContext);
    return rows.length > 0;
  }

  _maybeAdd(a, b) {
    // SQL '+' is numeric unless either is string → concat
    const aNum = this._toNumber(a);
    const bNum = this._toNumber(b);
    if (!isNaN(aNum) && !isNaN(bNum)) return aNum + bNum;
    return (a ?? "") + (b ?? "");
  }

  _toNumber(v) {
    const n = Number(v);
    return isNaN(n) ? NaN : n;
  }

  _sqlEqual(a, b) {
    // SQL semantics: NULL != anything (including NULL)
    if (a === null || a === undefined || b === null || b === undefined)
      return false;
    return a === b;
  }

  _getValueFromRow(row, tableOrAlias, column) {
    // Prefer alias.column
    if (tableOrAlias) {
      const aliasObj = row[tableOrAlias];
      if (!aliasObj) return undefined;
      return aliasObj[column];
    }
    // Try all aliases to find column (disambiguation: first hit)
    for (const alias of Object.keys(row)) {
      const obj = row[alias];
      if (obj && typeof obj === "object" && column in obj) {
        return obj[column];
      }
    }
    return undefined;
  }

  _getProjected(projectedRow, tableOrAlias, column) {
    if (!tableOrAlias) return projectedRow[column];
    // Rare case: ORDER BY table.col after projection with table.*
    const nested = projectedRow[tableOrAlias];
    if (nested && typeof nested === "object") return nested[column];
    return projectedRow[column];
  }

  // ---------- Utilities & response ----------

  _columnsFromRows(rows) {
    if (!rows.length) return [];

    const columnSet = new Set();

    rows.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        // Skip internal fields
        if (key === "__tableAlias") return;

        // If the value is an object, get its keys (nested columns)
        if (value && typeof value === "object" && !Array.isArray(value)) {
          Object.keys(value).forEach((col) => {
            if (col !== "__tableAlias") {
              columnSet.add(col);
            }
          });
        }
      });
    });

    return Array.from(columnSet);
  }

  _inferType(table, col) {
    const arr = this.tables[table] || [];
    if (!arr.length) return "UNKNOWN";
    const v = arr[0][col];
    if (typeof v === "number")
      return Number.isInteger(v) ? "INTEGER" : "DECIMAL";
    if (typeof v === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return "DATE";
      return "VARCHAR";
    }
    if (v === null) return "NULL";
    return "VARCHAR";
  }

  _resp(success, columns, data, query, error = null) {
    return {
      success,
      columns,
      data,
      rowCount: data?.length ?? 0,
      query,
      ...(error ? { error } : {}),
    };
  }
}
