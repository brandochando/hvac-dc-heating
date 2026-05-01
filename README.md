<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b227e7a1-2269-4f46-ad56-976d8974ebf3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy (Vercel)

This site is linked to the Vercel project **`hvac`** (see `.vercel/project.json` after you run `npx vercel link`). Production: `npm run vercel:prod` from this directory.

Vercel MCP: set `VERCEL_TOKEN` in `~/.cursor/vercel-mcp.env` from [Vercel → Account Settings → Tokens](https://vercel.com/account/tokens), then restart Cursor MCP.
