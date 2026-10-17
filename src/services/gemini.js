export async function generateCommitAndPR(gitDiffText, options = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key missing! Please verify VITE_GEMINI_API_KEY in your .env file.");
  }

  const {
    style = 'conventional', // 'conventional', 'emoji', 'detailed'
    temperature = 0.2,
    customInstructions = ''
  } = options;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  const prompt = `
You are an elite AI DevOps engineer inside an enterprise development environment.
Style Preference: ${style.toUpperCase()}${customInstructions ? `Custom System Rules: ${customInstructions}` : ''}

Analyze the following Git Diff / Notes and generate:
1. Conventional Commit Message
2. Full Pull Request Description (## Summary, ## Key Changes, ## Test Strategy)

GIT INPUT:
${gitDiffText}
  `;

  const startTime = performance.now();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: parseFloat(temperature),
      }
    })
  });

  const endTime = performance.now();
  const latency = Math.round(endTime - startTime);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "Gemini API Request failed.");
  }

  const generatedText = data.candidates[0].content.parts[0].text;
  const tokenUsage = data.usageMetadata || { totalTokenCount: '~' };

  return {
    raw: generatedText,
    latency,
    tokens: tokenUsage.totalTokenCount
  };
}