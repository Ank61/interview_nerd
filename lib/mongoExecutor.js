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
    if (typeof groupId === "object" && groupId !== null) {
      // Handle nested group _id with date operators
      const result = {};
      for (const [key, value] of Object.entries(groupId)) {
        if (value && typeof value === 'object') {
          if ('$year' in value) {
            const dateField = value.$year.startsWith('$') 
              ? this.getNestedValue(doc, value.$year.substring(1)) 
              : value.$year;
            result[key] = new Date(dateField).getFullYear();
          } else if ('$month' in value) {
            const dateField = value.$month.startsWith('$') 
              ? this.getNestedValue(doc, value.$month.substring(1)) 
              : value.$month;
            result[key] = new Date(dateField).getMonth() + 1; // getMonth() is 0-indexed
          } else {
            result[key] = this.evaluateGroupId(doc, value);
          }
        } else {
          result[key] = value;
        }
      }
      return result;
    } else if (typeof groupId === "string" && groupId.startsWith("$")) {
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

      // Handle _id field exclusion first
      if (projection._id === 0) {
        // Exclude _id field
      } else if (projection._id === 1 || projection._id === undefined) {
        // Include _id field (default behavior)
        projected._id = doc._id;
      }

      // Handle other fields
      for (const [field, value] of Object.entries(projection)) {
        if (field === '_id') continue; // Already handled

        if (value === 1 || value === true) {
          // Include field as is
          projected[field] = this.getNestedValue(doc, field);
        } else if (typeof value === 'string' && value.startsWith('$')) {
          // Handle field renaming (e.g., userId: "$_id")
          const sourceField = value.substring(1);
          projected[field] = this.getNestedValue(doc, sourceField);
        } else if (typeof value === 'object' && value !== null) {
          // Handle operators like $dayOfWeek
          const operator = Object.keys(value)[0];
          const operand = value[operator];
          
          if (operator === '$dayOfWeek' && typeof operand === 'string' && operand.startsWith('$')) {
            const dateField = operand.substring(1);
            const dateValue = this.getNestedValue(doc, dateField);
            if (dateValue instanceof Date) {
              // getDay() returns 0 (Sunday) to 6 (Saturday), MongoDB's $dayOfWeek returns 1 (Sunday) to 7 (Saturday)
              projected[field] = dateValue.getDay() + 1;
              if (projected[field] === 0) projected[field] = 7; // Convert Sunday from 0 to 7
            }
          } else {
            // For other operators, try to evaluate the expression
            projected[field] = this.evaluateExpression(doc, value);
          }
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
        case "$add":
          return operands.reduce((sum, operand) => {
            const value =
              typeof operand === "string" && operand.startsWith("$")
                ? this.getNestedValue(doc, operand.substring(1))
                : operand;
            return sum + (typeof value === "number" ? value : 0);
          }, 0);
        case "$multiply":
          return operands.reduce((product, operand) => {
            const value =
              typeof operand === "string" && operand.startsWith("$")
                ? this.getNestedValue(doc, operand.substring(1))
                : operand;
            return product * (typeof value === "number" ? value : 1);
          }, 1);
        case "$divide":
          const dividend =
            typeof operands[0] === "string" && operands[0].startsWith("$")
              ? this.getNestedValue(doc, operands[0].substring(1))
              : operands[0];
          const divisor =
            typeof operands[1] === "string" && operands[1].startsWith("$")
              ? this.getNestedValue(doc, operands[1].substring(1))
              : operands[1];
          return divisor !== 0 ? dividend / divisor : 0;
        case "$cond":
          const condition = this.evaluateCondition(doc, operands[0]);
          return condition ? operands[1] : operands[2];
        default:
          throw new Error(`Expression operator '${operator}' is not supported`);
      }
    }

    if (typeof expression === "string" && expression.startsWith("$")) {
      return this.getNestedValue(doc, expression.substring(1));
    }

    return expression;
  }

  evaluateCondition(doc, condition) {
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
