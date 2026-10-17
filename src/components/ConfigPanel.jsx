import React from 'react';

export default function ConfigPanel({
  style,
  onStyleChange,
  temperature,
  onTemperatureChange,
  customPrompt,
  onCustomPromptChange
}) {
  return (
    <div className="border-b border-slate-800 bg-[#0E1420]/95 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top duration-200">
      <div>
        <label className="text-xs font-medium text-slate-300 block mb-1.5">Preset Format</label>
        <select 
          value={style} 
          onChange={(e) => onStyleChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
        >
          <option value="conventional">Conventional Commits (feat, fix, refactor)</option>
          <option value="emoji">Gitmoji Standard (✨ feat, 🐛 fix)</option>
          <option value="detailed">Enterprise Detailed (Audit style)</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-medium text-slate-300">Temperature (Determinism)</label>
          <span className="text-xs font-mono text-cyan-400">{temperature}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={temperature} 
          onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
          className="w-full accent-cyan-500 bg-slate-950 rounded-lg cursor-pointer h-1.5"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-300 block mb-1.5">Custom Rules Override</label>
        <input 
          type="text" 
          placeholder="e.g. Include JIRA key PROJ-123 in commit header..."
          value={customPrompt}
          onChange={(e) => onCustomPromptChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>
    </div>
  );
}
