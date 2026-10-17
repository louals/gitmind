
# GitMind   

AI-powered commit message generation for developers. GitMind analyzes your Git diffs and generates clean, professional Conventional Commit messages using Google's Gemini API.

## Features

- AI-powered commit message generation
- Terminal-native CLI
- Interactive web application
- Automatic lockfile filtering
- Conventional Commit formatting
- Bring Your Own Key (BYOK)

## Prerequisites

- Node.js 18+
- npm
- Git
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/louals/gitmind.git
cd gitmind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your Gemini API key

Add your API key to your shell configuration.

For Zsh:

```bash
echo 'export GEMINI_API_KEY="your_api_key_here"' >> ~/.zshrc
source ~/.zshrc
```

For Bash:

```bash
echo 'export GEMINI_API_KEY="your_api_key_here"' >> ~/.bashrc
source ~/.bashrc
```

Replace `your_api_key_here` with your actual Gemini API key.

**Security:** Never commit your API key to Git or expose it in public repositories.

### 4. Link the CLI

```bash
chmod +x cli.js
npm link
```

Make sure the `bin` field in `package.json` correctly maps the `gitmind` command to `cli.js`.

## 🚀 Usage

### Option 1: CLI

**Step 1:** Make changes to your project.

**Step 2:** Stage your changes.

```bash
git add .
```

**Step 3:** Run GitMind.

```bash
gitmind
```

GitMind will:

1. Read your staged Git diff.
2. Filter out configured lockfiles.
3. Send the relevant diff to Gemini.
4. Generate a Conventional Commit message.
5. Create a local commit if automatic committing is enabled.

Example output:

```text
feat: add commit generator studio
```

**Step 4:** Push your changes.

```bash
git push
```

Always review your changes and generated commit message before committing important work.

### Option 2: Web Studio

**Step 1:** Start the development server.

```bash
npm run dev
```

**Step 2:** Open the URL displayed in your terminal, usually:

```text
http://localhost:5173
```

**Step 3:** Generate a commit message.

1. Copy your Git diff.
2. Paste it into the input workspace.
3. Click **Generate Commit Message**.
4. Review and edit the result.
5. Copy the generated message.

## Conventional Commits

GitMind follows the Conventional Commits format:

```text
<type>: <description>
```

| Type | Purpose | Example |
|---|---|---|
| `feat` | New feature | `feat: add user authentication` |
| `fix` | Bug fix | `fix: resolve API error` |
| `docs` | Documentation | `docs: update README` |
| `refactor` | Code restructuring | `refactor: simplify diff parser` |
| `test` | Tests | `test: add CLI tests` |
| `chore` | Maintenance | `chore: update dependencies` |
| `perf` | Performance | `perf: optimize diff filtering` |

## 📂 Project Structure

```text
gitmind/
├── cli.js
├── src/
│   ├── services/
│   │   └── gemini.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

- `cli.js` — CLI entry point.
- `src/services/gemini.js` — Gemini API integration.
- `src/App.jsx` — Web Studio interface.
- `src/main.jsx` — Frontend entry point.
- `package.json` — Dependencies, scripts, and CLI configuration.
- `.env` — Local environment variables.

## Security

- Never commit API keys or secrets.
- Add `.env` to `.gitignore`.
- Avoid exposing API keys in browser-side code.
- Use a backend to protect credentials when deploying the web application publicly.
- Review diffs before sending source code to an external AI service.

**Important:** BYOK does not automatically guarantee that API keys remain private. Security depends on the actual implementation.

## Troubleshooting

### GitMind command not found

```bash
npm link
```

Check the `bin` field in `package.json` and verify that npm's global executable directory is in your `PATH`.

### Missing API key

```bash
echo "$GEMINI_API_KEY"
```

If no value appears, verify your shell configuration. Never share your actual API key.

### No changes to commit

```bash
git status
git diff --cached
```

Make sure your intended files are staged before running GitMind.

### Gemini API errors

Check your API key, model configuration, network connection, and API usage limits.


## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your implementation.
5. Submit a pull request.

Example:

```bash
git checkout -b feat/my-improvement
git add .
git commit -m "feat: describe my improvement"
git push origin feat/my-improvement
```

**Repository:** [github.com/louals/gitmind](https://github.com/louals/gitmind)
