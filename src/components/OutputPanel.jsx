import React from 'react';
import Markdown from 'react-markdown';
import { Eye, FileText, Code2, Copy, CheckCircle2, Zap } from 'lucide-react';

const TABS = [
  { id: 'preview', label: 'Preview', icon: Eye },
  { id: 'raw', label: 'Raw Markdown', icon: FileText },
  { id: 'cli', label: 'CLI Shell', icon: Code2 },
];

export default function OutputPanel({
  output,
  loading,
  activeTab,
  onTabChange,
  onCopy,
  copied,
  cliCommand
}) {
  const currentCopyText = activeTab === 'cli' ? cliCommand : (output?.raw || '');

  return (
    <div className="flex flex-col bg-[#0E1420] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl">
      {/* Studio Tab Header */}
      <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {output && (
          <button
            onClick={() => onCopy(currentCopyText)}
            className="text-xs flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Copied' : 'Copy View'}</span>
          </button>
        )}
      </div>

      {/* Tab Views Content */}
      <div className="flex-1 p-5 bg-slate-950/90 overflow-y-auto max-h-[500px]">
        {!output && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2 min-h-[350px]">
            <Zap className="w-8 h-8 stroke-[1.5]" />
            <p className="text-xs font-mono">Awaiting execution run...</p>
          </div>
        )}

        {loading && (
          <div className="h-full flex flex-col items-center justify-center text-cyan-400 gap-3 min-h-[350px]">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-slate-400 animate-pulse">Running inference via Gemini Flash...</p>
          </div>
        )}

        {output && !loading && (
          <>
            {activeTab === 'preview' && (
              <div className="prose prose-invert prose-slate text-xs max-w-none prose-headings:text-cyan-400 prose-headings:font-semibold prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                <Markdown>{output.raw}</Markdown>
              </div>
            )}

            {activeTab === 'raw' && (
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
                {output.raw}
              </pre>
            )}

            {activeTab === 'cli' && (
              <div className="space-y-3 font-mono text-xs">
                <p className="text-slate-400 text-[11px]">// Direct terminal command to commit changes:</p>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 flex items-center justify-between">
                  <code>{cliCommand}</code>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Telemetry Footer */}
      <div className="bg-slate-900/60 px-4 py-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span>Status: <strong className="text-emerald-400 font-normal">Ready</strong></span>
          {output && <span>Tokens: <strong className="text-slate-300 font-normal">{output.tokens}</strong></span>}
        </div>
        {output && <span>Latency: <strong className="text-cyan-400 font-normal">{output.latency}ms</strong></span>}
      </div>
    </div>
  );
}
