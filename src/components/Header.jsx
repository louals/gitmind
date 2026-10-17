import React from 'react';
import { GitCommit, Cpu, Settings2, ChevronDown } from 'lucide-react';

export default function Header({ showConfig, onToggleConfig }) {
  return (
    <header className="border-b border-slate-800/80 bg-[#0E1420]/80 backdrop-blur-md px-5 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Brand & Title */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 shadow-inner">
          <GitCommit className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-sm tracking-wide text-slate-100">GitMind AI Studio</h1>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 rounded-md">
              v0.1.1 Pro
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Automated Git Message & Pull Request Intelligence Engine</p>
        </div>
      </div>

      {/* Telemetry & Actions */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Engine:</span>
          <span className="text-slate-200">gemini-3.8-flash</span>
        </div>

        <button 
          onClick={onToggleConfig}
          aria-expanded={showConfig}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all text-xs cursor-pointer ${
            showConfig 
              ? 'bg-cyan-950 border-cyan-500 text-cyan-300' 
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Parameters</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showConfig ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </header>
  );
}
