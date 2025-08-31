// SQL Query Executor
// Executes SQL queries against in-memory datasets for practice

import { sqlDatasets } from "../data/sqlDatasets.js";

class SQLExecutor {
  constructor() {
    this.datasets = sqlDatasets;
    this.currentDataset = null;
    this.tables = {};
  }

  // Load a dataset into memory
  loadDataset(datasetName) {
    if (!this.datasets[datasetName]) {
      throw new Error(`Dataset '${datasetName}' not found`);
    }

    this.currentDataset = datasetName;
    this.tables = {};

    const dataset = this.datasets[datasetName];

    // Convert array data to objects for easier querying
    Object.keys(dataset.tables).forEach((tableName) => {
      const table = dataset.tables[tableName];
      this.tables[tableName] = table.data.map((row) => {
        const obj = {};
        table.columns.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });
    });

    return this.tables;
  }

  // Execute SQL query
  execute(query) {
    try {
      if (!this.currentDataset) {
        throw new Error("No dataset loaded. Please load a dataset first.");
      }

      const normalizedQuery = query.trim().toLowerCase();

      if (normalizedQuery.startsWith("select")) {
        return this.executeSelect(query);
      } else if (normalizedQuery.startsWith("show tables")) {
        return this.showTables();
      } else if (
        normalizedQuery.startsWith("describe") ||
        normalizedQuery.startsWith("desc")
      ) {
        return this.describeTable(query);
      } else {
        throw new Error(
          "Only SELECT, SHOW TABLES, and DESCRIBE queries are supported in practice mode"
        );
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        query: query,
      };
    }
  }

  // Show available tables
  showTables() {
    const tables = Object.keys(this.tables).map((name) => ({
      table_name: name,
    }));
    return {
      success: true,
      columns: ["table_name"],
      data: tables,
      rowCount: tables.length,
      query: "SHOW TABLES",
    };
  }

  // Describe table structure
  describeTable(query) {
    const match = query.match(/describe\s+(\w+)|desc\s+(\w+)/i);
    if (!match) {
      throw new Error("Invalid DESCRIBE syntax");
    }

    const tableName = match[1] || match[2];
    if (!this.tables[tableName]) {
      throw new Error(`Table '${tableName}' does not exist`);
    }

    const dataset = this.datasets[this.currentDataset];
    const tableInfo = dataset.tables[tableName];

    const description = tableInfo.columns.map((col) => ({
      column_name: col,
      data_type: this.inferDataType(tableName, col),
    }));

    return {
      success: true,
      columns: ["column_name", "data_type"],
      data: description,
      rowCount: description.length,
      query: query,
    };
  }

  // Infer data type from sample data
  inferDataType(tableName, columnName) {
    const table = this.tables[tableName];
    if (table.length === 0) return "unknown";

    const sampleValue = table[0][columnName];
    if (typeof sampleValue === "number") {
      return Number.isInteger(sampleValue) ? "INTEGER" : "DECIMAL";
    } else if (typeof sampleValue === "string") {
      // Check if it looks like a date
      if (sampleValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return "DATE";
      }
      return "VARCHAR";
    } else if (sampleValue === null) {
      return "NULL";
    }
    return "VARCHAR";
  }

  // Execute SELECT query
  executeSelect(query) {
    const parser = new SimpleSelectParser();
    const parsed = parser.parse(query);

    let result = this.tables[parsed.from];
    if (!result) {
      throw new Error(`Table '${parsed.from}' does not exist`);
    }

    // Apply JOINs
    if (parsed.joins && parsed.joins.length > 0) {
      result = this.applyJoins(result, parsed.joins);
    }

    // Apply WHERE clause
    if (parsed.where) {
      result = this.applyWhere(result, parsed.where);
    }

    // Apply GROUP BY
    if (parsed.groupBy && parsed.groupBy.length > 0) {
      result = this.applyGroupBy(result, parsed.groupBy, parsed.select);
    }

    // Apply ORDER BY
    if (parsed.orderBy && parsed.orderBy.length > 0) {
      result = this.applyOrderBy(result, parsed.orderBy);
    }

    // Apply SELECT (column selection and aggregation)
    const finalResult = this.applySelect(result, parsed.select);

    // Apply LIMIT
    if (parsed.limit) {
      finalResult.data = finalResult.data.slice(0, parsed.limit);
    }

    return {
      success: true,
      columns: finalResult.columns,
      data: finalResult.data,
      rowCount: finalResult.data.length,
      query: query,
    };
  }

  // Apply JOIN operations
  applyJoins(leftTable, joins) {
    let result = leftTable;

    joins.forEach((join) => {
      const rightTable = this.tables[join.table];
      if (!rightTable) {
        throw new Error(`Table '${join.table}' does not exist`);
      }

      const joined = [];

      if (join.type === "INNER" || join.type === "JOIN") {
        result.forEach((leftRow) => {
          rightTable.forEach((rightRow) => {
            if (this.evaluateJoinCondition(leftRow, rightRow, join.on)) {
              joined.push({ ...leftRow, ...rightRow });
            }
          });
        });
      } else if (join.type === "LEFT") {
        result.forEach((leftRow) => {
          let hasMatch = false;
          rightTable.forEach((rightRow) => {
            if (this.evaluateJoinCondition(leftRow, rightRow, join.on)) {
              joined.push({ ...leftRow, ...rightRow });
              hasMatch = true;
            }
          });
          if (!hasMatch) {
            const nullRightRow = {};
            Object.keys(rightTable[0] || {}).forEach((key) => {
              nullRightRow[key] = null;
            });
            joined.push({ ...leftRow, ...nullRightRow });
          }
        });
      }

      result = joined;
    });

    return result;
  }

  // Evaluate JOIN condition
  evaluateJoinCondition(leftRow, rightRow, condition) {
    // Simple equality check for now (e.g., "left.id = right.left_id")
    const parts = condition.split("=").map((p) => p.trim());
    if (parts.length !== 2) return false;

    const leftValue = this.getColumnValue(leftRow, parts[0]);
    const rightValue = this.getColumnValue(rightRow, parts[1]);

    return leftValue === rightValue;
  }

  // Get column value with table alias support
  getColumnValue(row, columnRef) {
    // Handle table.column format
    if (columnRef.includes(".")) {
      const [, column] = columnRef.split(".");
      return row[column];
    }
    return row[columnRef];
  }

  // Apply WHERE clause
  applyWhere(data, whereClause) {
    return data.filter((row) => this.evaluateCondition(row, whereClause));
  }

  // Evaluate WHERE condition
  evaluateCondition(row, condition) {
    // Simple condition evaluation
    // Supports: column = value, column > value, column < value, column IS NULL, column IS NOT NULL

    if (condition.includes(" IS NULL")) {
      const column = condition.replace(" IS NULL", "").trim();
      return row[column] === null || row[column] === undefined;
    }

    if (condition.includes(" IS NOT NULL")) {
      const column = condition.replace(" IS NOT NULL", "").trim();
      return row[column] !== null && row[column] !== undefined;
    }

    const operators = [">=", "<=", ">", "<", "=", "!=", "<>"];
    let operator = null;
    let parts = [];

    for (const op of operators) {
      if (condition.includes(op)) {
        operator = op;
        parts = condition.split(op).map((p) => p.trim());
        break;
      }
    }

    if (!operator || parts.length !== 2) {
      return true; // If we can't parse, include the row
    }

    const columnValue = row[parts[0]];
    let compareValue = parts[1];

    // Remove quotes from string values
    if (compareValue.startsWith("'") && compareValue.endsWith("'")) {
      compareValue = compareValue.slice(1, -1);
    } else if (!isNaN(compareValue)) {
      compareValue = Number(compareValue);
    }

    switch (operator) {
      case "=":
        return columnValue == compareValue;
      case "!=":
      case "<>":
        return columnValue != compareValue;
      case ">":
        return columnValue > compareValue;
      case "<":
        return columnValue < compareValue;
      case ">=":
        return columnValue >= compareValue;
      case "<=":
        return columnValue <= compareValue;
      default:
        return true;
    }
  }

  // Apply GROUP BY
  applyGroupBy(data, groupByColumns, selectColumns) {
    const groups = {};

    data.forEach((row) => {
      const groupKey = groupByColumns.map((col) => row[col]).join("|");
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(row);
    });

    return Object.values(groups).map((group) => {
      const result = {};

      // Add group by columns
      groupByColumns.forEach((col) => {
        result[col] = group[0][col];
      });

      // Calculate aggregates
      selectColumns.forEach((selectCol) => {
        if (selectCol.includes("COUNT(")) {
          const column = selectCol.match(/COUNT\(([^)]+)\)/i)?.[1] || "*";
          result[selectCol.toLowerCase()] = group.length;
        } else if (selectCol.includes("SUM(")) {
          const column = selectCol.match(/SUM\(([^)]+)\)/i)?.[1];
          result[selectCol.toLowerCase()] = group.reduce(
            (sum, row) => sum + (row[column] || 0),
            0
          );
        } else if (selectCol.includes("AVG(")) {
          const column = selectCol.match(/AVG\(([^)]+)\)/i)?.[1];
          const sum = group.reduce((sum, row) => sum + (row[column] || 0), 0);
          result[selectCol.toLowerCase()] = sum / group.length;
        } else if (selectCol.includes("MAX(")) {
          const column = selectCol.match(/MAX\(([^)]+)\)/i)?.[1];
          result[selectCol.toLowerCase()] = Math.max(
            ...group.map((row) => row[column] || 0)
          );
        } else if (selectCol.includes("MIN(")) {
          const column = selectCol.match(/MIN\(([^)]+)\)/i)?.[1];
          result[selectCol.toLowerCase()] = Math.min(
            ...group.map((row) => row[column] || 0)
          );
        }
      });

      return result;
    });
  }

  // Apply ORDER BY
  applyOrderBy(data, orderByColumns) {
    return data.sort((a, b) => {
      for (const orderCol of orderByColumns) {
        const { column, direction } = orderCol;
        const aVal = a[column];
        const bVal = b[column];

        if (aVal < bVal) return direction === "ASC" ? -1 : 1;
        if (aVal > bVal) return direction === "ASC" ? 1 : -1;
      }
      return 0;
    });
  }

  // Apply SELECT (column selection)
  applySelect(data, selectColumns) {
    if (selectColumns.includes("*")) {
      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      return { columns, data };
    }

    const columns = selectColumns.map((col) => {
      // Handle aliases (e.g., "name as employee_name")
      if (col.includes(" as ")) {
        return col.split(" as ")[1].trim();
      }
      return col;
    });

    const resultData = data.map((row) => {
      const newRow = {};
      selectColumns.forEach((col, index) => {
        const columnName = columns[index];
        if (col.includes(" as ")) {
          const originalCol = col.split(" as ")[0].trim();
          newRow[columnName] = row[originalCol];
        } else {
          newRow[columnName] = row[col];
        }
      });
      return newRow;
    });

    return { columns, data: resultData };
  }
}

// Simple SQL SELECT parser
class SimpleSelectParser {
  parse(query) {
    const normalized = query.trim().replace(/\s+/g, " ");
    const result = {
      select: [],
      from: "",
      joins: [],
      where: null,
      groupBy: [],
      orderBy: [],
      limit: null,
    };

    // Extract SELECT
    const selectMatch = normalized.match(/SELECT\s+(.*?)\s+FROM/i);
    if (selectMatch) {
      result.select = selectMatch[1].split(",").map((s) => s.trim());
    }

    // Extract FROM
    const fromMatch = normalized.match(/FROM\s+(\w+)/i);
    if (fromMatch) {
      result.from = fromMatch[1];
    }

    // Extract JOINs
    const joinRegex =
      /(LEFT\s+JOIN|INNER\s+JOIN|JOIN)\s+(\w+)\s+ON\s+([^WHERE|GROUP|ORDER|LIMIT]+)/gi;
    let joinMatch;
    while ((joinMatch = joinRegex.exec(normalized)) !== null) {
      result.joins.push({
        type: joinMatch[1].replace(/\s+/g, " ").trim().toUpperCase(),
        table: joinMatch[2],
        on: joinMatch[3].trim(),
      });
    }

    // Extract WHERE
    const whereMatch = normalized.match(/WHERE\s+([^GROUP|ORDER|LIMIT]+)/i);
    if (whereMatch) {
      result.where = whereMatch[1].trim();
    }

    // Extract GROUP BY
    const groupByMatch = normalized.match(/GROUP\s+BY\s+([^ORDER|LIMIT]+)/i);
    if (groupByMatch) {
      result.groupBy = groupByMatch[1].split(",").map((s) => s.trim());
    }

    // Extract ORDER BY
    const orderByMatch = normalized.match(/ORDER\s+BY\s+([^LIMIT]+)/i);
    if (orderByMatch) {
      const orderCols = orderByMatch[1].split(",").map((s) => s.trim());
      result.orderBy = orderCols.map((col) => {
        const parts = col.split(" ");
        return {
          column: parts[0],
          direction: parts[1]?.toUpperCase() === "DESC" ? "DESC" : "ASC",
        };
      });
    }

    // Extract LIMIT
    const limitMatch = normalized.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      result.limit = parseInt(limitMatch[1]);
    }

    return result;
  }
}

export default SQLExecutor;
