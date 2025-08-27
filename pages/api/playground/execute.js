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


// Simple Python execution (basic interpreter)
const executePython = async (code, testCases, compilerMode = false) => {
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
        // Convert Python code to JavaScript equivalent for simple execution
        let jsCode = code
          .replace(/print\s*\(/g, 'console.log(') // Convert print to console.log
          .replace(/len\s*\(/g, '(') // Remove len function (basic)
          .replace(/\.append\s*\(/g, '.push(') // Convert append to push
          .replace(/range\s*\(([^)]+)\)/g, 'Array.from({length: $1}, (_, i) => i)') // Convert range
          .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'function $1() {') // Convert simple function definitions
          .replace(/:\s*$/gm, ' {') // Convert colons to braces
          .replace(/^\s{4}/gm, '  '); // Convert 4-space indentation to 2-space
        
        // Add closing braces for blocks
        const lines = jsCode.split('\n');
        let braceCount = 0;
        const processedLines = [];
        
        for (const line of lines) {
          processedLines.push(line);
          if (line.includes('{')) braceCount++;
          if (line.includes('}')) braceCount--;
        }
        
        // Add missing closing braces
        while (braceCount > 0) {
          processedLines.push('}');
          braceCount--;
        }
        
        jsCode = processedLines.join('\n');
        
        // Execute the converted code with custom console
        const executeCode = new Function('console', `
          ${jsCode}
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
          output: `Python Execution Error: ${error.message}`
        };
      }
    }
    
    // Question mode - run test cases (existing logic)
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      try {
        // Convert Python code to JavaScript equivalent
        let jsCode = code
          .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'function $1(input) {') // Convert function definition
          .replace(/^\s*return\s+/gm, 'return ') // Fix return statements
          .replace(/print\s*\(/g, 'console.log(') // Convert print to console.log
          .replace(/len\s*\(/g, '(') // Remove len function
          .replace(/\.append\s*\(/g, '.push(') // Convert append to push
          .replace(/range\s*\(([^)]+)\)/g, 'Array.from({length: $1}, (_, i) => i)') // Convert range
          .replace(/:\s*$/gm, ' {') // Convert colons to braces
          .replace(/^\s{4}/gm, '  '); // Convert 4-space indentation to 2-space
        
        // Add closing braces for functions
        const lines = jsCode.split('\n');
        let braceCount = 0;
        const processedLines = [];
        
        for (const line of lines) {
          processedLines.push(line);
          if (line.includes('{')) braceCount++;
          if (line.includes('}')) braceCount--;
        }
        
        // Add missing closing braces
        while (braceCount > 0) {
          processedLines.push('}');
          braceCount--;
        }
        
        jsCode = processedLines.join('\n');
        
        // Execute the converted code
        const executeCode = new Function('input', `
          ${jsCode}
          
          // Find and execute the main function
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
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check rate limit
    if (!checkRateLimit(session.user.id)) {
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
        return await executeTypeScript(code, testCases, compilerMode);
      case 'python':
        return await executePython(code, testCases, compilerMode);
      default:
        return {
          success: false,
          error: `Unsupported language: ${language}`,
          results: [],
          output: `Language ${language} is not supported`
        };
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
