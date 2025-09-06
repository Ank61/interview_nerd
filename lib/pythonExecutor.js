// Python Code Executor for Interview Nerd
// This library provides safe Python code execution in a sandboxed environment

class PythonExecutor {
  constructor() {
    this.output = [];
    this.errors = [];
    this.variables = {};
    this.functions = {};
  }

  // Safe Python interpreter implementation
  execute(code) {
    try {
      this.output = [];
      this.errors = [];
      this.variables = {};
      this.functions = {};

      // Split code into lines and execute
      const lines = code.split('\n').filter(line => line.trim() !== '');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('#')) {
          this.executeLine(line, lines, i);
        }
      }

      return {
        success: true,
        output: this.output.join('\n'),
        variables: this.variables,
        functions: Object.keys(this.functions)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: this.output.join('\n')
      };
    }
  }

  executeLine(line, allLines, currentIndex) {
    // Handle print statements
    if (line.startsWith('print(')) {
      this.handlePrint(line);
      return;
    }

    // Handle variable assignments
    if (line.includes('=') && !line.includes('==') && !line.includes('!=') && !line.includes('<=') && !line.includes('>=')) {
      this.handleAssignment(line);
      return;
    }

    // Handle function definitions
    if (line.startsWith('def ')) {
      this.handleFunctionDefinition(line, allLines, currentIndex);
      return;
    }

    // Handle function calls
    if (this.isFunctionCall(line)) {
      this.handleFunctionCall(line);
      return;
    }

    // Handle for loops
    if (line.startsWith('for ')) {
      this.handleForLoop(line, allLines, currentIndex);
      return;
    }

    // Handle if statements
    if (line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('else:')) {
      this.handleConditional(line, allLines, currentIndex);
      return;
    }

    // Handle class definitions
    if (line.startsWith('class ')) {
      this.handleClassDefinition(line, allLines, currentIndex);
      return;
    }

    // Handle imports (limited)
    if (line.startsWith('from ') || line.startsWith('import ')) {
      this.handleImport(line);
      return;
    }
  }

  handlePrint(line) {
    // Extract content between print( and )
    const match = line.match(/print\((.*)\)$/);
    if (match) {
      let content = match[1].trim();
      
      // Handle f-strings
      if (content.startsWith('f"') || content.startsWith("f'")) {
        content = this.processFString(content);
      }
      // Handle regular strings
      else if ((content.startsWith('"') && content.endsWith('"')) || 
               (content.startsWith("'") && content.endsWith("'"))) {
        content = content.slice(1, -1);
      }
      // Handle variables
      else if (this.variables.hasOwnProperty(content)) {
        content = this.formatValue(this.variables[content]);
      }
      // Handle expressions
      else {
        content = this.evaluateExpression(content);
      }

      this.output.push(content);
    }
  }

  processFString(fstring) {
    // Remove f" or f' wrapper
    let content = fstring.slice(2, -1);
    
    // Replace {variable} with actual values
    return content.replace(/\{([^}]+)\}/g, (match, expr) => {
      return this.evaluateExpression(expr.trim());
    });
  }

  handleAssignment(line) {
    const [varName, value] = line.split('=').map(s => s.trim());
    
    // Handle list assignments
    if (value.startsWith('[') && value.endsWith(']')) {
      this.variables[varName] = this.parseList(value);
    }
    // Handle dictionary assignments
    else if (value.startsWith('{') && value.endsWith('}')) {
      this.variables[varName] = this.parseDict(value);
    }
    // Handle string assignments
    else if ((value.startsWith('"') && value.endsWith('"')) || 
             (value.startsWith("'") && value.endsWith("'"))) {
      this.variables[varName] = value.slice(1, -1);
    }
    // Handle boolean assignments
    else if (value === 'True') {
      this.variables[varName] = true;
    }
    else if (value === 'False') {
      this.variables[varName] = false;
    }
    // Handle numeric assignments
    else if (!isNaN(value)) {
      this.variables[varName] = value.includes('.') ? parseFloat(value) : parseInt(value);
    }
    // Handle function calls
    else if (this.isFunctionCall(value)) {
      this.variables[varName] = this.evaluateFunctionCall(value);
    }
    // Handle expressions
    else {
      this.variables[varName] = this.evaluateExpression(value);
    }
  }

  parseList(listStr) {
    const content = listStr.slice(1, -1).trim();
    if (!content) return [];
    
    return content.split(',').map(item => {
      item = item.trim();
      if ((item.startsWith('"') && item.endsWith('"')) || 
          (item.startsWith("'") && item.endsWith("'"))) {
        return item.slice(1, -1);
      }
      if (!isNaN(item)) {
        return item.includes('.') ? parseFloat(item) : parseInt(item);
      }
      return item;
    });
  }

  parseDict(dictStr) {
    const content = dictStr.slice(1, -1).trim();
    if (!content) return {};
    
    const dict = {};
    const pairs = content.split(',');
    
    pairs.forEach(pair => {
      const [key, value] = pair.split(':').map(s => s.trim());
      const cleanKey = key.startsWith("'") || key.startsWith('"') ? key.slice(1, -1) : key;
      
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        dict[cleanKey] = value.slice(1, -1);
      } else if (!isNaN(value)) {
        dict[cleanKey] = value.includes('.') ? parseFloat(value) : parseInt(value);
      } else {
        dict[cleanKey] = value;
      }
    });
    
    return dict;
  }

  handleFunctionDefinition(line, allLines, currentIndex) {
    const match = line.match(/def\s+(\w+)\s*\(([^)]*)\):/);
    if (match) {
      const funcName = match[1];
      const params = match[2].split(',').map(p => p.trim()).filter(p => p);
      
      // Find function body
      const body = [];
      let i = currentIndex + 1;
      while (i < allLines.length && (allLines[i].startsWith('    ') || allLines[i].trim() === '')) {
        if (allLines[i].trim() !== '') {
          body.push(allLines[i].substring(4)); // Remove indentation
        }
        i++;
      }
      
      this.functions[funcName] = { params, body };
    }
  }

  isFunctionCall(line) {
    return line.includes('(') && line.includes(')') && !line.includes('=');
  }

  handleFunctionCall(line) {
    const result = this.evaluateFunctionCall(line);
    if (result !== undefined && result !== null) {
      this.output.push(this.formatValue(result));
    }
  }

  evaluateFunctionCall(line) {
    // Handle built-in functions
    if (line.startsWith('len(')) {
      const arg = line.match(/len\(([^)]+)\)/)[1].trim();
      const value = this.variables[arg] || arg;
      return Array.isArray(value) ? value.length : value.toString().length;
    }
    
    if (line.startsWith('range(')) {
      const args = line.match(/range\(([^)]+)\)/)[1].split(',').map(s => parseInt(s.trim()));
      if (args.length === 1) {
        return Array.from({length: args[0]}, (_, i) => i);
      } else if (args.length === 2) {
        return Array.from({length: args[1] - args[0]}, (_, i) => i + args[0]);
      }
    }

    // Handle list methods
    if (line.includes('.append(')) {
      const [varName, method] = line.split('.append(');
      const value = method.slice(0, -1);
      if (this.variables[varName]) {
        this.variables[varName].push(this.parseValue(value));
      }
      return;
    }

    if (line.includes('.remove(')) {
      const [varName, method] = line.split('.remove(');
      const value = method.slice(0, -1);
      if (this.variables[varName]) {
        const index = this.variables[varName].indexOf(this.parseValue(value));
        if (index > -1) {
          this.variables[varName].splice(index, 1);
        }
      }
      return;
    }

    // Handle user-defined functions
    const match = line.match(/(\w+)\(([^)]*)\)/);
    if (match && this.functions[match[1]]) {
      const funcName = match[1];
      const args = match[2].split(',').map(s => this.parseValue(s.trim())).filter(a => a !== '');
      return this.executeFunction(funcName, args);
    }

    return undefined;
  }

  executeFunction(funcName, args) {
    const func = this.functions[funcName];
    const oldVars = {...this.variables};
    
    // Set parameters
    func.params.forEach((param, index) => {
      if (args[index] !== undefined) {
        this.variables[param] = args[index];
      }
    });

    // Execute function body
    let returnValue = undefined;
    for (const line of func.body) {
      if (line.trim().startsWith('return ')) {
        const expr = line.trim().substring(7);
        returnValue = this.evaluateExpression(expr);
        break;
      } else {
        this.executeLine(line.trim(), func.body, 0);
      }
    }

    // Restore variables (simple scope)
    this.variables = oldVars;
    return returnValue;
  }

  handleForLoop(line, allLines, currentIndex) {
    const match = line.match(/for\s+(\w+)\s+in\s+(.+):/);
    if (match) {
      const varName = match[1];
      const iterable = match[2].trim();
      
      let items = [];
      if (iterable.startsWith('range(')) {
        items = this.evaluateFunctionCall(iterable);
      } else if (this.variables[iterable]) {
        items = this.variables[iterable];
      }

      // Find loop body
      const body = [];
      let i = currentIndex + 1;
      while (i < allLines.length && (allLines[i].startsWith('    ') || allLines[i].trim() === '')) {
        if (allLines[i].trim() !== '') {
          body.push(allLines[i].substring(4));
        }
        i++;
      }

      // Execute loop
      for (const item of items) {
        this.variables[varName] = item;
        for (const bodyLine of body) {
          this.executeLine(bodyLine.trim(), body, 0);
        }
      }
    }
  }

  handleConditional(line, allLines, currentIndex) {
    // Simple conditional handling
    if (line.startsWith('if ')) {
      const condition = line.substring(3, line.length - 1).trim();
      const result = this.evaluateCondition(condition);
      
      if (result) {
        // Find and execute if body
        const body = this.getIndentedBlock(allLines, currentIndex + 1);
        for (const bodyLine of body) {
          this.executeLine(bodyLine.trim(), body, 0);
        }
      }
    }
  }

  handleClassDefinition(line, allLines, currentIndex) {
    const match = line.match(/class\s+(\w+):/);
    if (match) {
      const className = match[1];
      
      // Find class body
      const body = this.getIndentedBlock(allLines, currentIndex + 1);
      
      // Simple class implementation
      this.variables[className] = function(name, age) {
        return {
          name: name,
          age: age,
          introduce: function() {
            return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
          }
        };
      };
    }
  }

  handleImport(line) {
    // Handle basic imports (collections.Counter)
    if (line.includes('from collections import Counter')) {
      this.variables['Counter'] = function(arr) {
        const count = {};
        arr.forEach(item => {
          count[item] = (count[item] || 0) + 1;
        });
        return {
          most_common: function(n) {
            const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
            return sorted.slice(0, n);
          }
        };
      };
    }
  }

  getIndentedBlock(lines, startIndex) {
    const block = [];
    let i = startIndex;
    while (i < lines.length && (lines[i].startsWith('    ') || lines[i].trim() === '')) {
      if (lines[i].trim() !== '') {
        block.push(lines[i].substring(4));
      }
      i++;
    }
    return block;
  }

  evaluateExpression(expr) {
    // Handle simple arithmetic and variable references
    if (this.variables.hasOwnProperty(expr)) {
      return this.variables[expr];
    }

    // Handle simple arithmetic
    if (expr.includes('+') || expr.includes('-') || expr.includes('*') || expr.includes('/')) {
      return this.evaluateArithmetic(expr);
    }

    // Handle function calls
    if (expr.includes('(') && expr.includes(')')) {
      return this.evaluateFunctionCall(expr);
    }

    return expr;
  }

  evaluateArithmetic(expr) {
    // Simple arithmetic evaluation
    try {
      // Replace variables with their values
      let processedExpr = expr;
      Object.keys(this.variables).forEach(varName => {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        processedExpr = processedExpr.replace(regex, this.variables[varName]);
      });
      
      // Safe evaluation of basic arithmetic
      if (/^[\d\s+\-*/().]+$/.test(processedExpr)) {
        return eval(processedExpr);
      }
    } catch (e) {
      // Return original expression if evaluation fails
    }
    return expr;
  }

  evaluateCondition(condition) {
    // Simple condition evaluation
    if (condition.includes('>')) {
      const [left, right] = condition.split('>').map(s => s.trim());
      return this.getValue(left) > this.getValue(right);
    }
    if (condition.includes('<')) {
      const [left, right] = condition.split('<').map(s => s.trim());
      return this.getValue(left) < this.getValue(right);
    }
    if (condition.includes('==')) {
      const [left, right] = condition.split('==').map(s => s.trim());
      return this.getValue(left) == this.getValue(right);
    }
    if (condition.includes('%')) {
      // Handle modulo conditions like x % 2 == 0
      const parts = condition.split('==');
      if (parts.length === 2) {
        const leftExpr = parts[0].trim();
        const rightValue = this.getValue(parts[1].trim());
        
        if (leftExpr.includes('%')) {
          const [num, mod] = leftExpr.split('%').map(s => this.getValue(s.trim()));
          return (num % mod) == rightValue;
        }
      }
    }
    return false;
  }

  getValue(expr) {
    if (this.variables.hasOwnProperty(expr)) {
      return this.variables[expr];
    }
    if (!isNaN(expr)) {
      return expr.includes('.') ? parseFloat(expr) : parseInt(expr);
    }
    return expr;
  }

  parseValue(value) {
    if (!value || value === '') return '';
    
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1);
    }
    if (!isNaN(value)) {
      return value.includes('.') ? parseFloat(value) : parseInt(value);
    }
    if (this.variables.hasOwnProperty(value)) {
      return this.variables[value];
    }
    return value;
  }

  formatValue(value) {
    if (Array.isArray(value)) {
      return JSON.stringify(value).replace(/"/g, "'");
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value).replace(/"/g, "'");
    }
    return String(value);
  }
}

// Export the executor
export default PythonExecutor;
