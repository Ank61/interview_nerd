import React, { useState, useRef, useEffect } from 'react';
import { Copy, Download, Maximize2, Minimize2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeEditor = ({ 
  code, 
  onChange, 
  language = 'javascript',
  onRun,
  className = '' 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef(null);
  const [lineNumbers, setLineNumbers] = useState(['1']);

  // Update line numbers when code changes
  useEffect(() => {
    const lines = code?.split('\n');
    const numbers = lines?.map((_, index) => (index + 1).toString());
    setLineNumbers(numbers);
  }, [code]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onRun?.();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = () => {
    const extension = language === 'python' ? 'py' : language === 'typescript' ? 'ts' : 'js';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Map language names to syntax highlighter language codes
  const getSyntaxLanguage = (lang) => {
    switch (lang.toLowerCase()) {
      case 'javascript': return 'javascript';
      case 'typescript': return 'typescript';
      case 'python': return 'python';
      default: return 'javascript';
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-surface' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Copy code"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={downloadCode}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Download code"
          >
            <Download size={16} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative bg-surface">
        {/* Syntax highlighted overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <SyntaxHighlighter
            language={getSyntaxLanguage(language)}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: '16px 16px 16px 60px',
              background: 'transparent',
              fontSize: '14px',
              lineHeight: '24px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              minHeight: isFullscreen ? 'calc(100vh - 60px)' : '400px',
            }}
            showLineNumbers={false}
            wrapLines={true}
          >
            {code || ' '}
          </SyntaxHighlighter>
        </div>

        {/* Line numbers */}
        <div className="absolute left-0 top-0 bg-gray-50 px-3 py-4 text-right text-sm text-gray-500 font-mono select-none border-r z-10">
          {lineNumbers?.map((num, index) => (
            <div key={index} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Visible textarea for input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="relative z-20 w-full h-full p-4 pl-16 font-mono text-sm leading-6 resize-none border-none outline-none bg-surface text-gray-800"
          style={{ 
            minHeight: isFullscreen ? 'calc(100vh - 60px)' : '400px',
            tabSize: 2,
            color: '#ededef',
            backgroundColor: 'rgba(17, 17, 19, 0.9)'
          }}
          placeholder={`Write your ${language} code here...`}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
