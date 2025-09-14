// Python Code Executor using Pyodide for Interview Nerd
// This library provides real Python execution in the browser

class PythonExecutor {
  constructor() {
    this.pyodide = null;
    this.isLoading = false;
    this.isReady = false;
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      this.initializePyodide();
    }
  }

  async initializePyodide() {
    if (this.isLoading || this.isReady) return;
    
    this.isLoading = true;
    try {
      // Load Pyodide from CDN
      if (typeof window !== 'undefined' && !window.loadPyodide) {
        await this.loadPyodideScript();
      }
      
      if (typeof window !== 'undefined' && window.loadPyodide) {
        this.pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        this.isReady = true;
      }
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
    }
    this.isLoading = false;
  }

  async loadPyodideScript() {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Pyodide requires browser environment'));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async execute(code) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'Python execution is only available in the browser',
          output: ''
        };
      }

      // Wait for Pyodide to be ready
      if (!this.isReady) {
        if (!this.isLoading) {
          await this.initializePyodide();
        }
        
        // Wait for initialization to complete
        let attempts = 0;
        while (!this.isReady && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        
        if (!this.isReady) {
          return {
            success: false,
            error: 'Python runtime failed to initialize. Please refresh the page.',
            output: ''
          };
        }
      }

      // Capture stdout
      this.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // Execute the user's Python code
      try {
        this.pyodide.runPython(code);
        
        // Get the output
        const output = this.pyodide.runPython('sys.stdout.getvalue()');
        
        // Reset stdout
        this.pyodide.runPython('sys.stdout = sys.__stdout__');
        
        return {
          success: true,
          output: output || 'Code executed successfully (no output)',
          variables: {},
          functions: []
        };
      } catch (pythonError) {
        // Reset stdout on error
        this.pyodide.runPython('sys.stdout = sys.__stdout__');
        
        return {
          success: false,
          error: pythonError.message,
          output: ''
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: ''
      };
    }
  }

}

// Export the executor
export default PythonExecutor;
