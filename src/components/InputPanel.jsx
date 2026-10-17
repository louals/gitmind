import React from 'react';
import { Terminal, RefreshCw, Sparkles } from 'lucide-react';

export default function InputPanel({
  inputCode,
  onInputChange,
  onClear,
  onGenerate,
  loading
}) {
  const isInputEmpty = !inputCode.trim();

  return (
    <div className="flex flex-col bg-[#0E1420] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl">
      {/* Editor Header */}
      <div className="bg-slate-900/60 px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium text-slate-300">Input Stream (Git Diff / Notes)</span>
        </div>
        <button 
          onClick={onClear} 
          disabled={!inputCode}
          className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          Clear Buffer
        </button>
      </div>

      {/* Editor Textarea */}
      <div className="flex-1 p-3 bg-slate-950/80 relative">
        <textarea
          className="w-full h-full min-h-[420px] bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
          placeholder={"// Paste your raw 'git diff' or dev summary here...\ndiff --git a/src/App.jsx b/src/App.jsx\nindex 83b2...12a4 100644\n--- a/src/App.jsx\n+++ b/src/App.jsx"}
          value={inputCode}
          onChange={(e) => onInputChange(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Action Bar */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-500">
          {inputCode.length.toLocaleString()} chars
        </span>
        <button
          onClick={onGenerate}
          disabled={loading || isInputEmpty}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium py-2 px-5 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/40 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Processing Diff...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Generation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
