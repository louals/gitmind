import React, { useState } from 'react';
import { generateCommitAndPR } from './services/gemini';
import { Header, ConfigPanel, InputPanel, OutputPanel } from './components';

export default function App() {
  // Diff editor & AI generation states
  const [inputCode, setInputCode] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'raw' | 'cli'
  const [showConfig, setShowConfig] = useState(false);

  // AI Configuration parameters
  const [style, setStyle] = useState('conventional');
  const [temperature, setTemperature] = useState(0.2);
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerate = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    setCopied(false);

    try {
      const res = await generateCommitAndPR(inputCode, {
        style,
        temperature,
        customInstructions: customPrompt,
      });
      setOutput(res);
    } catch (err) {
      setOutput({
        raw: `### ⚠️ API Error\n\`\`\`\n${err.message}\n\`\`\``,
        latency: 0,
        tokens: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract commit line for direct CLI copy
  const getCliCommand = () => {
    if (!output?.raw) return '';
    const match = output.raw.match(/feat\(.*?\):.*|fix\(.*?\):.*/i);
    const msg = match ? match[0] : 'feat: update source code';
    return `git commit -m "${msg.replace(/"/g, '\\"')}"`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Application Bar */}
      <Header 
        showConfig={showConfig} 
        onToggleConfig={() => setShowConfig((prev) => !prev)} 
      />

      {/* Model Parameter Configuration Panel */}
      {showConfig && (
        <ConfigPanel
          style={style}
          onStyleChange={setStyle}
          temperature={temperature}
          onTemperatureChange={setTemperature}
          customPrompt={customPrompt}
          onCustomPromptChange={setCustomPrompt}
        />
      )}

      {/* Main Studio Workspace Grid */}
      <main className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-[1700px] w-full mx-auto">
        <InputPanel
          inputCode={inputCode}
          onInputChange={setInputCode}
          onClear={() => setInputCode('')}
          onGenerate={handleGenerate}
          loading={loading}
        />

        <OutputPanel
          output={output}
          loading={loading}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCopy={handleCopy}
          copied={copied}
          cliCommand={getCliCommand()}
        />
      </main>
    </div>
  );
}