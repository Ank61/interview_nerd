import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// Timeout for code execution (in milliseconds)
const EXECUTION_TIMEOUT = 5000;

// Memory limit for code execution (in MB)
const MEMORY_LIMIT = 128;

// Simple JavaScript execution
const executeJavaScript = async (code, testCases, compilerMode = false) => {
  try {
    // Compiler mode - just execute the code and capture console output
    if (compilerMode || !testCases || testCases.length === 0) {
      let consoleOutput = [];
      
      // Create a custom console that captures output
      const customConsole = {
        log: (...args) => {
          consoleOutput.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '));
        },
        error: (...args) => {
          consoleOutput.push('ERROR: ' + args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '));
        }
      };
      
      try {
        // Execute the code with custom console
        const executeCode = new Function('console', `
          ${code}
        `);
        
        const startTime = Date.now();
        const result = executeCode(customConsole);
        const executionTime = Date.now() - startTime;
        
        // If there's a return value, add it to output
        if (result !== undefined) {
          consoleOutput.push(`Return value: ${typeof result === 'object' ? JSON.stringify(result) : result}`);
        }
        
        return {
          success: true,
          results: [],
          output: consoleOutput.length > 0 ? consoleOutput.join('\n') : 'Code executed successfully (no output)',
          executionTime
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          results: [],
          output: `Execution Error: ${error.message}`
        };
      }
    }
    
    // Question mode - run test cases
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      try {
        // Execute the code with the input
        const executeCode = new Function('input', `
          ${code}
          
          // Try to find and execute the main function
          const lines = \`${code}\`.split('\\n');
          const functionLine = lines.find(line => line.trim().startsWith('function '));
          
          if (functionLine) {
            const funcName = functionLine.match(/function\\s+(\\w+)/)[1];
            return eval(funcName + '(input)');
          }
          
          // Try arrow function assignment
          const arrowLine = lines.find(line => line.includes('=>'));
          if (arrowLine && arrowLine.includes('=')) {
            const varName = arrowLine.split('=')[0].trim().replace('const ', '').replace('let ', '').replace('var ', '');
            return eval(varName + '(input)');
          }
          
          // Fallback: return the last expression
          return eval(\`${code}\`);
        `);
        
        const startTime = Date.now();
        const result = executeCode(testCase.input);
        const executionTime = Date.now() - startTime;
        
        // Check if result matches expected output
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        results.push({
          id: i,
          input: testCase.input,
          expected: testCase.expected,
          actual: result,
          passed,
          executionTime,
          error: null
        });
      } catch (error) {
        results.push({
          id: i,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          passed: false,
          executionTime: 0,
          error: error.message
        });
      }
    }
    
    return {
      success: true,
      results,
      output: results.map(r => {
        if (r.error) {
          return `Test ${r.id + 1}: Error - ${r.error}`;
        }
        return `Test ${r.id + 1}: ${r.passed ? '✅ Correct' : '❌ Incorrect'} | Expected: ${JSON.stringify(r.expected)} | Got: ${JSON.stringify(r.actual)}`;
      }).join('\n')
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      results: [],
      output: `Execution Error: ${error.message}`
    };
  }
};


// Advanced Python execution with OOP support
const executePython = async (code, testCases, compilerMode = false) => {
  try {
    // Compiler mode - execute the code and capture console output
    if (compilerMode || !testCases || testCases.length === 0) {
      let consoleOutput = [];
      
      // Create a comprehensive Python-to-JavaScript transpiler
      const transpilePythonToJS = (pythonCode) => {
        let jsCode = pythonCode;
        
        // First pass: Handle basic Python syntax
        jsCode = jsCode.replace(/\bprint\s*\(/g, 'console.log(');
        jsCode = jsCode.replace(/\blen\s*\(([^)]+)\)/g, '($1.length || Object.keys($1).length || 0)');
        jsCode = jsCode.replace(/\brange\s*\(([^)]+)\)/g, 'Array.from({length: $1}, (_, i) => i)');
        jsCode = jsCode.replace(/\bisinstance\s*\(([^,]+),\s*([^)]+)\)/g, '($1 instanceof $2)');
        
        // Handle class definitions
        jsCode = jsCode.replace(/class\s+(\w+)(\([^)]*\))?:/g, (match, className, inheritance) => {
          if (inheritance) {
            const parentClass = inheritance.replace(/[()]/g, '');
            return `class ${className} extends ${parentClass} {`;
          }
          return `class ${className} {`;
        });
        
        // Handle method definitions
        jsCode = jsCode.replace(/(\s+)def\s+(__init__)\s*\(([^)]*)\):/g, '$1constructor($3) {');
        jsCode = jsCode.replace(/(\s+)def\s+(\w+)\s*\(([^)]*)\):/g, '$1$2($3) {');
        jsCode = jsCode.replace(/^def\s+(\w+)\s*\(([^)]*)\):/gm, 'function $1($2) {');
        
        // Handle self parameter
        jsCode = jsCode.replace(/\bself\./g, 'this.');
        jsCode = jsCode.replace(/\(self,\s*/g, '(');
        jsCode = jsCode.replace(/\(self\)/g, '()');
        jsCode = jsCode.replace(/\(,\s*/g, '(');
        
        // Handle magic methods
        jsCode = jsCode.replace(/def\s+__str__\s*\([^)]*\):/g, 'toString() {');
        jsCode = jsCode.replace(/def\s+__repr__\s*\([^)]*\):/g, 'toString() {');
        jsCode = jsCode.replace(/def\s+__len__\s*\([^)]*\):/g, 'get length() {');
        jsCode = jsCode.replace(/def\s+__add__\s*\([^)]*\):/g, 'valueOf() {');
        
        // Handle decorators
        jsCode = jsCode.replace(/@property/g, 'get');
        jsCode = jsCode.replace(/@staticmethod/g, 'static');
        jsCode = jsCode.replace(/@classmethod/g, 'static');
        
        // Handle list operations
        jsCode = jsCode.replace(/\.append\s*\(/g, '.push(');
        jsCode = jsCode.replace(/\.join\s*\(/g, '.join(');
        
        // Handle colons and indentation
        jsCode = jsCode.replace(/:\s*$/gm, ' {');
        
        // Process line by line for proper indentation handling
        const lines = jsCode.split('\n');
        const processedLines = [];
        const indentStack = [0];
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmedLine = line.trim();
          
          if (trimmedLine === '') {
            processedLines.push('');
            continue;
          }
          
          const currentIndent = line.length - line.trimStart().length;
          const lastIndent = indentStack[indentStack.length - 1];
          
          // Handle indentation changes
          if (currentIndent > lastIndent) {
            indentStack.push(currentIndent);
          } else if (currentIndent < lastIndent) {
            while (indentStack.length > 1 && indentStack[indentStack.length - 1] > currentIndent) {
              indentStack.pop();
              processedLines.push('  '.repeat(indentStack.length - 1) + '}');
            }
          }
          
          processedLines.push('  '.repeat(indentStack.length - 1) + trimmedLine);
        }
        
        // Close remaining blocks
        while (indentStack.length > 1) {
          indentStack.pop();
          processedLines.push('  '.repeat(indentStack.length - 1) + '}');
        }
        
        return processedLines.join('\n');
      };
      
      try {
        const jsCode = transpilePythonToJS(code);
        
        // Create execution environment with Python-like built-ins
        const executionEnv = {
          console: {
            log: (...args) => {
              consoleOutput.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
              ).join(' '));
            }
          },
          len: (obj) => {
            if (Array.isArray(obj) || typeof obj === 'string') return obj.length;
            if (obj && typeof obj === 'object') return Object.keys(obj).length;
            return 0;
          },
          range: (start, stop, step = 1) => {
            if (stop === undefined) {
              stop = start;
              start = 0;
            }
            const result = [];
            for (let i = start; i < stop; i += step) {
              result.push(i);
            }
            return result;
          },
          isinstance: (obj, type) => {
            if (typeof type === 'function') {
              return obj instanceof type;
            }
            return typeof obj === type;
          }
        };
        
        // Execute the converted code
        const executeCode = new Function(...Object.keys(executionEnv), jsCode);
        
        const startTime = Date.now();
        const result = executeCode(...Object.values(executionEnv));
        const executionTime = Date.now() - startTime;
        
        // If there's a return value, add it to output
        if (result !== undefined) {
          consoleOutput.push(`Return value: ${typeof result === 'object' ? JSON.stringify(result) : result}`);
        }
        
        return {
          success: true,
          results: [],
          output: consoleOutput.length > 0 ? consoleOutput.join('\n') : 'Code executed successfully (no output)',
          executionTime
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          results: [],
          output: `Python Execution Error: ${error.message}\n\nNote: This is a JavaScript-based Python interpreter with limited functionality. Complex Python features may not be fully supported.`
        };
      }
    }
    
    // Question mode - run test cases
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      try {
        // For test cases, we'll use a simpler approach
        // This is mainly for algorithm problems, not full OOP demos
        let jsCode = code
          .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'function $1(input) {')
          .replace(/^\s*return\s+/gm, 'return ')
          .replace(/print\s*\(/g, 'console.log(')
          .replace(/len\s*\(/g, '(')
          .replace(/\.append\s*\(/g, '.push(')
          .replace(/range\s*\(([^)]+)\)/g, 'Array.from({length: $1}, (_, i) => i)')
          .replace(/:\s*$/gm, ' {')
          .replace(/^\s{4}/gm, '  ');
        
        // Add closing braces
        const lines = jsCode.split('\n');
        let braceCount = 0;
        const processedLines = [];
        
        for (const line of lines) {
          processedLines.push(line);
          if (line.includes('{')) braceCount++;
          if (line.includes('}')) braceCount--;
        }
        
        while (braceCount > 0) {
          processedLines.push('}');
          braceCount--;
        }
        
        jsCode = processedLines.join('\n');
        
        const executeCode = new Function('input', `
          ${jsCode}
          
          const lines = \`${jsCode}\`.split('\\n');
          const functionLine = lines.find(line => line.trim().startsWith('function '));
          
          if (functionLine) {
            const funcName = functionLine.match(/function\\s+(\\w+)/)[1];
            return eval(funcName + '(input)');
          }
          
          return eval(\`${jsCode}\`);
        `);
        
        const startTime = Date.now();
        const result = executeCode(testCase.input);
        const executionTime = Date.now() - startTime;
        
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        results.push({
          id: i,
          input: testCase.input,
          expected: testCase.expected,
          actual: result,
          passed,
          executionTime,
          error: null
        });
      } catch (error) {
        results.push({
          id: i,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          passed: false,
          executionTime: 0,
          error: error.message
        });
      }
    }
    
    return {
      success: true,
      results,
      output: results.map(r => {
        if (r.error) {
          return `Test ${r.id + 1}: Error - ${r.error}`;
        }
        return `Test ${r.id + 1}: ${r.passed ? '✅ Correct' : '❌ Incorrect'} | Expected: ${JSON.stringify(r.expected)} | Got: ${JSON.stringify(r.actual)}`;
      }).join('\n')
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      results: [],
      output: `Python Execution Error: ${error.message}`
    };
  }
};

// Simple TypeScript execution (transpile to JS)
const executeTypeScript = async (code, testCases, compilerMode = false) => {
  try {
    // Simple TypeScript to JavaScript conversion (remove type annotations)
    const jsCode = code
      .replace(/:\s*\w+(\[\])?/g, '') // Remove type annotations
      .replace(/interface\s+\w+\s*{[^}]*}/g, '') // Remove interfaces
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, '') // Remove type aliases
      .replace(/<\w+>/g, ''); // Remove generic types
    
    return await executeJavaScript(jsCode, testCases, compilerMode);
  } catch (error) {
    return {
      success: false,
      error: error.message,
      results: [],
      output: `TypeScript Execution Error: ${error.message}`
    };
  }
};

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map();

// Check rate limit
const checkRateLimit = (userId) => {
  const now = Date.now();
  const userRequests = rateLimitStore.get(userId) || [];
  
  // Remove requests older than 1 minute
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  // Allow max 10 requests per minute
  if (recentRequests.length >= 10) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(userId, recentRequests);
  return true;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get session for rate limiting (optional for public access)
    const session = await getServerSession(req, res, authOptions);
    
    // Check rate limit only if user is authenticated
    if (session?.user?.id && !checkRateLimit(session.user.id)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please wait before executing more code.' 
      });
    }

    const { code, language, testCases } = req.body;

    // Validate input
    if (!code || !language || !testCases) {
      return res.status(400).json({ 
        error: 'Missing required fields: code, language, testCases' 
      });
    }

    if (code.length > 10000) {
      return res.status(400).json({ 
        error: 'Code too long. Maximum 10,000 characters allowed.' 
      });
    }

    if (testCases.length > 10) {
      return res.status(400).json({ 
        error: 'Too many test cases. Maximum 10 test cases allowed.' 
      });
    }

    // Security checks
    const dangerousPatterns = [
      /require\s*\(/,
      /import\s+.*\s+from/,
      /process\./,
      /global\./,
      /window\./,
      /document\./,
      /fetch\(/,
      /XMLHttpRequest/,
      /eval\s*\(/,
      /Function\s*\(/,
      /setTimeout/,
      /setInterval/,
      /while\s*\(\s*true/,
      /for\s*\(\s*;\s*;\s*\)/
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return res.status(400).json({ 
          error: 'Code contains potentially dangerous operations' 
        });
      }
    }

    let result;
    
    // Check if compiler mode is enabled
    const compilerMode = req.body.compilerMode || false;
    
    // Execute code based on language
    switch (language.toLowerCase()) {
      case 'javascript':
        result = await executeJavaScript(code, testCases, compilerMode);
        break;
      case 'typescript':
        result = await executeTypeScript(code, testCases, compilerMode);
        break;
      case 'python':
        result = await executePython(code, testCases, compilerMode);
        break;
      default:
        result = {
          success: false,
          error: `Unsupported language: ${language}`,
          results: [],
          output: `Language ${language} is not supported`
        };
        break;
    }

    // Calculate performance metrics
    const totalTests = result.results.length;
    const passedTests = result.results.filter(r => r.passed).length;
    const averageTime = result.results.reduce((sum, r) => sum + r.executionTime, 0) / totalTests;
    
    const response = {
      ...result,
      metrics: {
        totalTests,
        passedTests,
        successRate: totalTests > 0 ? (passedTests / totalTests) * 100 : 0,
        averageExecutionTime: averageTime,
        language
      },
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({ 
      error: 'Internal server error during code execution',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
