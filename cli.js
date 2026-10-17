#!/usr/bin/env node
import { execSync } from 'child_process';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY environment variable is missing.");
  process.exit(1);
}

try {
  console.log("🔍 Reading clean git diff...");
  
  // 1. Automatically grab the diff while excluding noisy lockfiles and package files natively
  const gitDiff = execSync(
    "git diff HEAD -- . ':(exclude)package-lock.json' ':(exclude)pnpm-lock.yaml' ':(exclude)yarn.lock'",
    { encoding: 'utf-8' }
  );

  if (!gitDiff.trim()) {
    console.log("⚠️ No uncommitted changes detected in this repository.");
    process.exit(0);
  }

  console.log("⚡ Generating AI Commit via Gemini...");

  const prompt = `
  You are an expert DevOps AI. Generate a concise Conventional Commit message based on this git diff.
  Output ONLY the raw commit message (e.g., feat(auth): add login validation), nothing else.

  GIT DIFF:
  ${gitDiff}
  `;

  // 2. Query Gemini API directly via fetch
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await response.json();
  const commitMessage = data.candidates[0].content.parts[0].text.trim();

  console.log("\n✨ Proposed Commit Message:");
  console.log(`\x1b[32m"${commitMessage}"\x1b[0m\n`);

  // 3. Automatically run git commit for the user
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
  console.log("✅ Successfully committed changes!");

} catch (err) {
  console.error("❌ An error occurred:", err.message);
}