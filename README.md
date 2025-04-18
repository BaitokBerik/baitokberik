# baitokberik-site

This is the MVP for the personal resume site of Berik Baitukov.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root with:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Deploy to Vercel:
   - Connect your GitHub repository in Vercel.
   - Set the environment variable `OPENAI_API_KEY` in Vercel dashboard.
   - (Optional) Add custom domain `baitokberik.kz` in Vercel settings.

## Project Structure

- `pages/index.js` — main page with resume sections and chat widget.
- `pages/api/chat.js` — Next.js API route for OpenAI chat.
- `styles/globals.css` — global styles.
- `public/.gitkeep` — placeholder to keep public folder in Git.
