## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket).
2. Import the project into Vercel.
3. Vercel will automatically detect the Vite settings.
4. (Optional) Configure Environment Variables if you want to use real Firebase:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_USE_MOCK_FIREBASE` | Set to `false` to use real Firebase. | `true` (Mock Mode) |
| `VITE_FIREBASE_API_KEY` | Firebase API Key | - |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | - |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | - |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | - |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | - |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | - |
| `GEMINI_API_KEY` | Your Gemini API Key (if used) | - |

## Features

- **High Score System**: The leaderboard stores the best score for each unique player name. If you play again and get a higher score, your entry on the leaderboard is updated.
