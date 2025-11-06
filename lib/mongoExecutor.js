import { mongoDatasets } from "../data/mongoDatasets.js";

class MongoExecutor {
  constructor() {
    this.datasets = mongoDatasets;
  }

  // Execute MongoDB query
  executeQuery(datasetName, query) {
    try {
      const dataset = this.datasets[datasetName];
      if (!dataset) {
        throw new Error(`Dataset '${datasetName}' not found`);
      }

      // Parse and execute the query
      const result = this.parseAndExecute(dataset.collections, query);
      return {
        success: true,
        result: result,
        executionTime: Math.random() * 50 + 10, // Simulated execution time
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        executionTime: 0,
      };
    }
  }

  parseAndExecute(collections, query) {
    // Remove db. prefix and clean query
    const cleanQuery = query.trim().replace(/^db\./, "");

    // Extract collection name and operation
    const match = cleanQuery.match(/^(\w+)\.(.+)$/);
    if (!match) {
      throw new Error(
        "Invalid query format. Expected: db.collection.operation()"
      );
    }

    const [, collectionName, operation] = match;
    const collection = collections[collectionName];

    if (!collection) {
      throw new Error(`Collection '${collectionName}' not found`);
    }

    return this.executeOperation(collection, operation, collectionName);
  }

  executeOperation(collection, operation, collectionName) {
    // Handle different MongoDB operations
    if (operation.startsWith("find(")) {
      return this.handleFind(collection, operation);
    } else if (operation.startsWith("aggregate(")) {
      return this.handleAggregate(collection, operation);
    } else if (operation.startsWith("countDocuments(")) {
      return this.handleCountDocuments(collection, operation);
    } else if (operation.startsWith("distinct(")) {
      return this.handleDistinct(collection, operation);
    } else if (operation.startsWith("findOne(")) {
      return this.handleFindOne(collection, operation);
    } else {
      throw new Error(`Operation '${operation}' is not supported`);
    }
  }

  handleFind(collection, operation) {
    // Parse find operation: find(query, projection).sort().limit()
    const findMatch = operation.match(/find\(([^)]*)\)/);
    if (!findMatch) {
      throw new Error("Invalid find operation");
    }

    let result = [...collection];
    const queryStr = findMatch[1].trim();

    // Apply query filter if provided
    if (queryStr && queryStr !== "") {
      const query = this.parseQuery(queryStr);
      result = this.applyFilter(result, query);
    }

    // Handle chained operations (sort, limit, projection)
    const remainingOps = operation.substring(findMatch[0].length);
    result = this.handleChainedOperations(result, remainingOps);

    return result;
  }

  handleFindOne(collection, operation) {
    const findOneMatch = operation.match(/findOne\(([^)]*)\)/);
    if (!findOneMatch) {
      throw new Error("Invalid findOne operation");
    }

    let result = [...collection];
    const queryStr = findOneMatch[1].trim();

    if (queryStr && queryStr !== "") {
      const query = this.parseQuery(queryStr);
      result = this.applyFilter(result, query);
    }

    return result.length > 0 ? result[0] : null;
  }

  handleCountDocuments(collection, operation) {
    const countMatch = operation.match(/countDocuments\(([^)]*)\)/);
    if (!countMatch) {
      throw new Error("Invalid countDocuments operation");
    }

    let result = [...collection];
    const queryStr = countMatch[1].trim();

    if (queryStr && queryStr !== "") {
      const query = this.parseQuery(queryStr);
      result = this.applyFilter(result, query);
    }

    return result.length;
  }

  handleDistinct(collection, operation) {
    const distinctMatch = operation.match(
      /distinct\(["']([^"']+)["'](?:,\s*([^)]+))?\)/
    );
    if (!distinctMatch) {
      throw new Error("Invalid distinct operation");
    }

    const field = distinctMatch[1];
    const queryStr = distinctMatch[2];

    let result = [...collection];

    if (queryStr && queryStr.trim() !== "") {
      const query = this.parseQuery(queryStr.trim());
      result = this.applyFilter(result, query);
    }

    const distinctValues = [
      ...new Set(result.map((doc) => this.getNestedValue(doc, field))),
    ];
    return distinctValues.filter((val) => val !== undefined);
  }

  handleAggregate(collection, operation) {
    const aggregateMatch = operation.match(/aggregate\((\[.*\])\)/s);
    if (!aggregateMatch) {
      throw new Error("Invalid aggregate operation");
    }

    try {
      const pipelineStr = aggregateMatch[1];
      const pipeline = eval(`(${pipelineStr})`);

      return this.executeAggregationPipeline(collection, pipeline);
    } catch (error) {
      throw new Error(`Error parsing aggregation pipeline: ${error.message}`);
    }
  }

  executeAggregationPipeline(collection, pipeline) {
    let result = [...collection];

    for (const stage of pipeline) {
      const stageType = Object.keys(stage)[0];
      const stageValue = stage[stageType];

      switch (stageType) {
        case "$match":
          result = this.applyFilter(result, stageValue);
          break;
        case "$group":
          result = this.applyGroup(result, stageValue);
          break;
        case "$sort":
          result = this.applySort(result, stageValue);
          break;
        case "$limit":
          result = result.slice(0, stageValue);
          break;
        case "$skip":
          result = result.slice(stageValue);
          break;
        case "$project":
          result = this.applyProjection(result, stageValue);
          break;
        case "$lookup":
          result = this.applyLookup(result, stageValue);
          break;
        case "$unwind":
          result = this.applyUnwind(result, stageValue);
          break;
        case "$addFields":
          result = this.applyAddFields(result, stageValue);
          break;
        default:
          throw new Error(`Aggregation stage '${stageType}' is not supported`);
      }
    }

    return result;
  }

  applyFilter(collection, query) {
    return collection.filter((doc) => this.matchesQuery(doc, query));
  }

  matchesQuery(doc, query) {
    for (const [key, value] of Object.entries(query)) {
      if (!this.matchesCondition(doc, key, value)) {
        return false;
      }
    }
    return true;
  }

  matchesCondition(doc, key, value) {
    const docValue = this.getNestedValue(doc, key);

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Handle operators like $gt, $lt, $in, etc.
      for (const [operator, operatorValue] of Object.entries(value)) {
        switch (operator) {
          case "$gt":
            if (!(docValue > operatorValue)) return false;
            break;
          case "$gte":
            if (!(docValue >= operatorValue)) return false;
            break;
          case "$lt":
            if (!(docValue < operatorValue)) return false;
            break;
          case "$lte":
            if (!(docValue <= operatorValue)) return false;
            break;
          case "$eq":
            if (docValue !== operatorValue) return false;
            break;
          case "$ne":
            if (docValue === operatorValue) return false;
            break;
          case "$in":
            if (!operatorValue.includes(docValue)) return false;
            break;
          case "$nin":
            if (operatorValue.includes(docValue)) return false;
            break;
          case "$exists":
            if (operatorValue && docValue === undefined) return false;
            if (!operatorValue && docValue !== undefined) return false;
            break;
          case "$regex":
            const regex = new RegExp(operatorValue);
            if (!regex.test(docValue)) return false;
            break;
          default:
            throw new Error(`Operator '${operator}' is not supported`);
        }
      }
      return true;
    } else {
      return docValue === value;
    }
  }

  applyGroup(collection, groupStage) {
    const groups = {};
    const groupId = groupStage._id;

    for (const doc of collection) {
      const groupKey = this.evaluateGroupId(doc, groupId);
      const keyStr = JSON.stringify(groupKey);

      if (!groups[keyStr]) {
        groups[keyStr] = {
          _id: groupKey,
          docs: [],
        };
      }
      groups[keyStr].docs.push(doc);
    }

    const result = [];
    for (const group of Object.values(groups)) {
      const groupResult = { _id: group._id };

      for (const [field, expression] of Object.entries(groupStage)) {
        if (field === "_id") continue;

        groupResult[field] = this.evaluateGroupExpression(
          group.docs,
          expression
        );
      }

      result.push(groupResult);
    }

    return result;
  }

  evaluateGroupId(doc, groupId) {
    if (typeof groupId === "string" && groupId.startsWith("$")) {
      return this.getNestedValue(doc, groupId.substring(1));
    }
    return groupId;
  }

  evaluateGroupExpression(docs, expression) {
    if (typeof expression === "object" && expression !== null) {
      const operator = Object.keys(expression)[0];
      const operand = expression[operator];

      switch (operator) {
        case "$sum":
          if (operand === 1) return docs.length;
          return docs.reduce((sum, doc) => {
            const value = this.getNestedValue(doc, operand.substring(1));
            return sum + (typeof value === "number" ? value : 0);
          }, 0);
        case "$avg":
          const values = docs
            .map((doc) => this.getNestedValue(doc, operand.substring(1)))
            .filter((val) => typeof val === "number");
          return values.length > 0
            ? values.reduce((a, b) => a + b) / values.length
            : 0;
        case "$max":
          return Math.max(
            ...docs.map((doc) => this.getNestedValue(doc, operand.substring(1)))
          );
        case "$min":
          return Math.min(
            ...docs.map((doc) => this.getNestedValue(doc, operand.substring(1)))
          );
        case "$first":
          return docs.length > 0
            ? this.getNestedValue(docs[0], operand.substring(1))
            : null;
        case "$last":
          return docs.length > 0
            ? this.getNestedValue(docs[docs.length - 1], operand.substring(1))
            : null;
        default:
          throw new Error(`Group operator '${operator}' is not supported`);
      }
    }
    return expression;
  }

  applySort(collection, sortStage) {
    return [...collection].sort((a, b) => {
      for (const [field, direction] of Object.entries(sortStage)) {
        const aVal = this.getNestedValue(a, field);
        const bVal = this.getNestedValue(b, field);

        if (aVal < bVal) return direction === 1 ? -1 : 1;
        if (aVal > bVal) return direction === 1 ? 1 : -1;
      }
      return 0;
    });
  }

  applyProjection(collection, projection) {
    return collection.map((doc) => {
      const projected = {};

      for (const [field, include] of Object.entries(projection)) {
        if (include === 1 || include === true) {
          // Simple field inclusion
          projected[field] = this.getNestedValue(doc, field);
        } else if (include === 0 || include === false) {
          // Field exclusion - skip this field
          continue;
        } else if (typeof include === 'object') {
          // Computed field with expression
          projected[field] = this.evaluateExpression(doc, include);
        }
      }

      return projected;
    });
  }

  applyLookup(collection, lookupStage) {
    // Simplified lookup - would need access to other collections in real implementation
    return collection.map((doc) => ({
      ...doc,
      [lookupStage.as]: [], // Placeholder for joined data
    }));
  }

  applyUnwind(collection, unwindStage) {
    const field =
      typeof unwindStage === "string"
        ? unwindStage.substring(1)
        : unwindStage.path.substring(1);
    const result = [];

    for (const doc of collection) {
      const arrayValue = this.getNestedValue(doc, field);
      if (Array.isArray(arrayValue)) {
        for (const item of arrayValue) {
          const newDoc = { ...doc };
          this.setNestedValue(newDoc, field, item);
          result.push(newDoc);
        }
      } else {
        result.push(doc);
      }
    }

    return result;
  }

  applyAddFields(collection, addFieldsStage) {
    return collection.map((doc) => {
      const newDoc = { ...doc };

      for (const [field, expression] of Object.entries(addFieldsStage)) {
        newDoc[field] = this.evaluateExpression(doc, expression);
      }

      return newDoc;
    });
  }

  evaluateExpression(doc, expression) {
    if (typeof expression === "object" && expression !== null) {
      const operator = Object.keys(expression)[0];
      const operands = expression[operator];

      switch (operator) {
        // ===== ARITHMETIC OPERATORS =====
        case "$add":
          return operands.reduce((sum, operand) => {
            const value = this.resolveOperand(doc, operand);
            return sum + (typeof value === "number" ? value : 0);
          }, 0);
        case "$subtract":
          const subtractValues = operands.map(op => this.resolveOperand(doc, op));
          return subtractValues[0] - subtractValues[1];
        case "$multiply":
          return operands.reduce((product, operand) => {
            const value = this.resolveOperand(doc, operand);
            return product * (typeof value === "number" ? value : 1);
          }, 1);
        case "$divide":
          const dividend = this.resolveOperand(doc, operands[0]);
          const divisor = this.resolveOperand(doc, operands[1]);
          return divisor !== 0 ? dividend / divisor : null;
        case "$mod":
          const modDividend = this.resolveOperand(doc, operands[0]);
          const modDivisor = this.resolveOperand(doc, operands[1]);
          return modDividend % modDivisor;
        case "$abs":
          return Math.abs(this.resolveOperand(doc, operands));
        case "$ceil":
          return Math.ceil(this.resolveOperand(doc, operands));
        case "$floor":
          return Math.floor(this.resolveOperand(doc, operands));
        case "$round":
          const roundValue = this.resolveOperand(doc, operands[0]);
          const places = operands[1] !== undefined ? this.resolveOperand(doc, operands[1]) : 0;
          return Number(roundValue.toFixed(places));
        case "$sqrt":
          return Math.sqrt(this.resolveOperand(doc, operands));
        case "$pow":
          return Math.pow(this.resolveOperand(doc, operands[0]), this.resolveOperand(doc, operands[1]));
        case "$exp":
          return Math.exp(this.resolveOperand(doc, operands));
        case "$ln":
          return Math.log(this.resolveOperand(doc, operands));
        case "$log":
          return Math.log(this.resolveOperand(doc, operands[0])) / Math.log(this.resolveOperand(doc, operands[1]));
        case "$log10":
          return Math.log10(this.resolveOperand(doc, operands));
        case "$trunc":
          return Math.trunc(this.resolveOperand(doc, operands[0]));

        // ===== STRING OPERATORS =====
        case "$concat":
          return operands.map(operand => {
            const val = this.resolveOperand(doc, operand);
            return val !== null && val !== undefined ? String(val) : "";
          }).join("");
        case "$toUpper":
          const upperValue = this.resolveOperand(doc, operands);
          return typeof upperValue === "string" ? upperValue.toUpperCase() : upperValue;
        case "$toLower":
          const lowerValue = this.resolveOperand(doc, operands);
          return typeof lowerValue === "string" ? lowerValue.toLowerCase() : lowerValue;
        case "$substr":
        case "$substrBytes":
          const strValue = this.resolveOperand(doc, operands[0]);
          const startCheck = this.resolveOperand(doc, operands[1]);
          const length = this.resolveOperand(doc, operands[2]);
          return typeof strValue === "string" ? strValue.substr(startCheck, length) : "";
        case "$substrCP":
          const cpStr = this.resolveOperand(doc, operands[0]);
          const cpStart = this.resolveOperand(doc, operands[1]);
          const cpLength = this.resolveOperand(doc, operands[2]);
          return typeof cpStr === "string" ? cpStr.substring(cpStart, cpStart + cpLength) : "";
        case "$strcasecmp":
          const str1 = String(this.resolveOperand(doc, operands[0])).toLowerCase();
          const str2 = String(this.resolveOperand(doc, operands[1])).toLowerCase();
          return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
        case "$indexOfBytes":
        case "$indexOfCP":
          const searchStr = String(this.resolveOperand(doc, operands[0]));
          const substring = String(this.resolveOperand(doc, operands[1]));
          const startPos = operands[2] !== undefined ? this.resolveOperand(doc, operands[2]) : 0;
          const endPos = operands[3] !== undefined ? this.resolveOperand(doc, operands[3]) : searchStr.length;
          const index = searchStr.indexOf(substring, startPos);
          return index >= 0 && index < endPos ? index : -1;
        case "$split":
          const splitStr = String(this.resolveOperand(doc, operands[0]));
          const delimiter = String(this.resolveOperand(doc, operands[1]));
          return splitStr.split(delimiter);
        case "$strLenBytes":
        case "$strLenCP":
          const lenStr = String(this.resolveOperand(doc, operands));
          return lenStr.length;
        case "$trim":
          const trimStr = String(this.resolveOperand(doc, operands.input));
          const chars = operands.chars ? String(this.resolveOperand(doc, operands.chars)) : " ";
          const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
          return trimStr.replace(regex, '');
        case "$ltrim":
          const ltrimStr = String(this.resolveOperand(doc, operands.input));
          const lchars = operands.chars ? String(this.resolveOperand(doc, operands.chars)) : " ";
          const lregex = new RegExp(`^[${lchars}]+`, 'g');
          return ltrimStr.replace(lregex, '');
        case "$rtrim":
          const rtrimStr = String(this.resolveOperand(doc, operands.input));
          const rchars = operands.chars ? String(this.resolveOperand(doc, operands.chars)) : " ";
          const rregex = new RegExp(`[${rchars}]+$`, 'g');
          return rtrimStr.replace(rregex, '');
        case "$replaceOne":
        case "$replaceAll":
          const replaceStr = String(this.resolveOperand(doc, operands.input));
          const find = String(this.resolveOperand(doc, operands.find));
          const replacement = String(this.resolveOperand(doc, operands.replacement));
          if (operator === "$replaceAll") {
            return replaceStr.split(find).join(replacement);
          }
          return replaceStr.replace(find, replacement);

        // ===== ARRAY OPERATORS =====
        case "$size":
          const arr = this.resolveOperand(doc, operands);
          return Array.isArray(arr) ? arr.length : 0;
        case "$arrayElemAt":
          const elemArr = this.resolveOperand(doc, operands[0]);
          const elemIdx = this.resolveOperand(doc, operands[1]);
          if (!Array.isArray(elemArr)) return null;
          const idx = elemIdx < 0 ? elemArr.length + elemIdx : elemIdx;
          return elemArr[idx];
        case "$slice":
          const sliceArr = this.resolveOperand(doc, operands[0]);
          const sliceN = this.resolveOperand(doc, operands[1]);
          const slicePos = operands[2] !== undefined ? this.resolveOperand(doc, operands[2]) : undefined;
          if (!Array.isArray(sliceArr)) return [];
          if (slicePos !== undefined) {
            return sliceArr.slice(sliceN, sliceN + slicePos);
          }
          return sliceN >= 0 ? sliceArr.slice(0, sliceN) : sliceArr.slice(sliceN);
        case "$concatArrays":
          return operands.reduce((result, operand) => {
            const arr = this.resolveOperand(doc, operand);
            return result.concat(Array.isArray(arr) ? arr : []);
          }, []);
        case "$in":
          const inValue = this.resolveOperand(doc, operands[0]);
          const inArray = this.resolveOperand(doc, operands[1]);
          return Array.isArray(inArray) && inArray.includes(inValue);
        case "$filter":
          const filterInput = this.resolveOperand(doc, operands.input);
          const filterAs = operands.as || "this";
          const filterCond = operands.cond;
          if (!Array.isArray(filterInput)) return [];
          return filterInput.filter(item => {
            const tempDoc = { ...doc, [filterAs]: item };
            return this.evaluateExpression(tempDoc, filterCond);
          });
        case "$map":
          const mapInput = this.resolveOperand(doc, operands.input);
          const mapAs = operands.as || "this";
          const mapIn = operands.in;
          if (!Array.isArray(mapInput)) return [];
          return mapInput.map(item => {
            const tempDoc = { ...doc, [mapAs]: item };
            return this.evaluateExpression(tempDoc, mapIn);
          });
        case "$reduce":
          const reduceInput = this.resolveOperand(doc, operands.input);
          const reduceInitial = this.resolveOperand(doc, operands.initialValue);
          const reduceIn = operands.in;
          if (!Array.isArray(reduceInput)) return reduceInitial;
          return reduceInput.reduce((acc, item) => {
            const tempDoc = { ...doc, value: acc, this: item };
            return this.evaluateExpression(tempDoc, reduceIn);
          }, reduceInitial);
        case "$reverseArray":
          const revArr = this.resolveOperand(doc, operands);
          return Array.isArray(revArr) ? [...revArr].reverse() : [];
        case "$first":
          const firstArr = this.resolveOperand(doc, operands);
          return Array.isArray(firstArr) && firstArr.length > 0 ? firstArr[0] : null;
        case "$last":
          const lastArr = this.resolveOperand(doc, operands);
          return Array.isArray(lastArr) && lastArr.length > 0 ? lastArr[lastArr.length - 1] : null;

        // ===== COMPARISON OPERATORS =====
        case "$eq":
          return this.resolveOperand(doc, operands[0]) === this.resolveOperand(doc, operands[1]);
        case "$ne":
          return this.resolveOperand(doc, operands[0]) !== this.resolveOperand(doc, operands[1]);
        case "$gt":
          return this.resolveOperand(doc, operands[0]) > this.resolveOperand(doc, operands[1]);
        case "$gte":
          return this.resolveOperand(doc, operands[0]) >= this.resolveOperand(doc, operands[1]);
        case "$lt":
          return this.resolveOperand(doc, operands[0]) < this.resolveOperand(doc, operands[1]);
        case "$lte":
          return this.resolveOperand(doc, operands[0]) <= this.resolveOperand(doc, operands[1]);
        case "$cmp":
          const cmpVal1 = this.resolveOperand(doc, operands[0]);
          const cmpVal2 = this.resolveOperand(doc, operands[1]);
          return cmpVal1 < cmpVal2 ? -1 : cmpVal1 > cmpVal2 ? 1 : 0;

        // ===== LOGICAL OPERATORS =====
        case "$and":
          return operands.every(operand => this.evaluateExpression(doc, operand));
        case "$or":
          return operands.some(operand => this.evaluateExpression(doc, operand));
        case "$not":
          return !this.evaluateExpression(doc, operands);

        // ===== CONDITIONAL OPERATORS =====
        case "$cond":
          const condition = Array.isArray(operands)
            ? this.evaluateExpression(doc, operands[0])
            : this.evaluateExpression(doc, operands.if);
          const thenValue = Array.isArray(operands) ? operands[1] : operands.then;
          const elseValue = Array.isArray(operands) ? operands[2] : operands.else;
          return condition
            ? this.resolveOperand(doc, thenValue)
            : this.resolveOperand(doc, elseValue);
        case "$ifNull":
          const ifNullValue = this.resolveOperand(doc, operands[0]);
          return ifNullValue !== null && ifNullValue !== undefined
            ? ifNullValue
            : this.resolveOperand(doc, operands[1]);
        case "$switch":
          const branches = operands.branches || [];
          for (const branch of branches) {
            if (this.evaluateExpression(doc, branch.case)) {
              return this.resolveOperand(doc, branch.then);
            }
          }
          return operands.default !== undefined ? this.resolveOperand(doc, operands.default) : null;

        // ===== TYPE CONVERSION OPERATORS =====
        case "$toString":
          const toStrVal = this.resolveOperand(doc, operands);
          return toStrVal !== null && toStrVal !== undefined ? String(toStrVal) : null;
        case "$toInt":
          return parseInt(this.resolveOperand(doc, operands)) || 0;
        case "$toLong":
          return parseInt(this.resolveOperand(doc, operands)) || 0;
        case "$toDouble":
          return parseFloat(this.resolveOperand(doc, operands)) || 0;
        case "$toDecimal":
          return parseFloat(this.resolveOperand(doc, operands)) || 0;
        case "$toBool":
          return Boolean(this.resolveOperand(doc, operands));
        case "$toDate":
          const dateVal = this.resolveOperand(doc, operands);
          return dateVal ? new Date(dateVal) : null;
        case "$convert":
          const convertInput = this.resolveOperand(doc, operands.input);
          const convertTo = operands.to;
          const onError = operands.onError;
          const onNull = operands.onNull;
          if (convertInput === null || convertInput === undefined) {
            return onNull !== undefined ? this.resolveOperand(doc, onNull) : null;
          }
          try {
            switch (convertTo) {
              case "string": return String(convertInput);
              case "int": return parseInt(convertInput);
              case "long": return parseInt(convertInput);
              case "double": return parseFloat(convertInput);
              case "decimal": return parseFloat(convertInput);
              case "bool": return Boolean(convertInput);
              case "date": return new Date(convertInput);
              default: return convertInput;
            }
          } catch (e) {
            return onError !== undefined ? this.resolveOperand(doc, onError) : null;
          }

        // ===== DATE OPERATORS =====
        case "$year":
          const yearDate = new Date(this.resolveOperand(doc, operands));
          return yearDate.getFullYear();
        case "$month":
          const monthDate = new Date(this.resolveOperand(doc, operands));
          return monthDate.getMonth() + 1;
        case "$dayOfMonth":
          const dayDate = new Date(this.resolveOperand(doc, operands));
          return dayDate.getDate();
        case "$dayOfWeek":
          const dowDate = new Date(this.resolveOperand(doc, operands));
          return dowDate.getDay() + 1;
        case "$dayOfYear":
          const doyDate = new Date(this.resolveOperand(doc, operands));
          const start = new Date(doyDate.getFullYear(), 0, 0);
          const diff = doyDate - start;
          const oneDay = 1000 * 60 * 60 * 24;
          return Math.floor(diff / oneDay);
        case "$hour":
          const hourDate = new Date(this.resolveOperand(doc, operands));
          return hourDate.getHours();
        case "$minute":
          const minDate = new Date(this.resolveOperand(doc, operands));
          return minDate.getMinutes();
        case "$second":
          const secDate = new Date(this.resolveOperand(doc, operands));
          return secDate.getSeconds();
        case "$millisecond":
          const msDate = new Date(this.resolveOperand(doc, operands));
          return msDate.getMilliseconds();
        case "$dateToString":
          const dateToStr = new Date(this.resolveOperand(doc, operands.date));
          const format = operands.format || "%Y-%m-%d";
          // Simplified format conversion
          return dateToStr.toISOString();
        case "$dateFromString":
          const dateStr = this.resolveOperand(doc, operands.dateString);
          return new Date(dateStr);

        // ===== TYPE CHECKING OPERATORS =====
        case "$type":
          const typeVal = this.resolveOperand(doc, operands);
          if (typeVal === null) return "null";
          if (Array.isArray(typeVal)) return "array";
          if (typeVal instanceof Date) return "date";
          return typeof typeVal;
        case "$isArray":
          return Array.isArray(this.resolveOperand(doc, operands));

        // ===== OBJECT OPERATORS =====
        case "$objectToArray":
          const obj = this.resolveOperand(doc, operands);
          if (typeof obj !== "object" || obj === null) return [];
          return Object.entries(obj).map(([k, v]) => ({ k, v }));
        case "$arrayToObject":
          const arrToObj = this.resolveOperand(doc, operands);
          if (!Array.isArray(arrToObj)) return {};
          return arrToObj.reduce((result, item) => {
            if (item.k !== undefined && item.v !== undefined) {
              result[item.k] = item.v;
            } else if (Array.isArray(item) && item.length === 2) {
              result[item[0]] = item[1];
            }
            return result;
          }, {});
        case "$mergeObjects":
          return operands.reduce((merged, operand) => {
            const obj = this.resolveOperand(doc, operand);
            return { ...merged, ...(typeof obj === "object" ? obj : {}) };
          }, {});

        // ===== LITERAL OPERATOR =====
        case "$literal":
          return operands;

        default:
          throw new Error(`Expression operator '${operator}' is not supported`);
      }
    }

    if (typeof expression === "string" && expression.startsWith("$")) {
      return this.getNestedValue(doc, expression.substring(1));
    }

    return expression;
  }

  // Helper method to resolve operands (field references or expressions)
  resolveOperand(doc, operand) {
    if (typeof operand === "string" && operand.startsWith("$")) {
      return this.getNestedValue(doc, operand.substring(1));
    } else if (typeof operand === "object" && operand !== null) {
      return this.evaluateExpression(doc, operand);
    }
    return operand;
  }

  evaluateCondition(doc, condition) {
    if (typeof condition === "object" && condition !== null) {
      return this.evaluateExpression(doc, condition);
    }
    if (typeof condition === "string" && condition.startsWith("$")) {
      return Boolean(this.getNestedValue(doc, condition.substring(1)));
    }
    return Boolean(condition);
  }

  handleChainedOperations(result, operations) {
    // Handle .sort(), .limit(), .projection() etc.
    const sortMatch = operations.match(/\.sort\(([^)]+)\)/);
    if (sortMatch) {
      const sortObj = eval(`(${sortMatch[1]})`);
      result = this.applySort(result, sortObj);
    }

    const limitMatch = operations.match(/\.limit\((\d+)\)/);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1]);
      result = result.slice(0, limit);
    }

    const skipMatch = operations.match(/\.skip\((\d+)\)/);
    if (skipMatch) {
      const skip = parseInt(skipMatch[1]);
      result = result.slice(skip);
    }

    return result;
  }

  parseQuery(queryStr) {
    if (!queryStr || queryStr.trim() === "") {
      return {};
    }

    try {
      return eval(`(${queryStr})`);
    } catch (error) {
      throw new Error(`Error parsing query: ${error.message}`);
    }
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  setNestedValue(obj, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }
}

export default MongoExecutor;
