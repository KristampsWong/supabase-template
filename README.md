# Supabase Auth Template

A Next.js template with Supabase Google OAuth authentication pre-configured.

## Quick Start

```bash
npx create-next-app@latest my-new-project --example https://github.com/KristampsWong/supabase-template
```

## Features

- Next.js 16 with App Router
- Supabase Authentication (Google OAuth)
- Protected routes with middleware
- TypeScript
- Tailwind CSS

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 3. Configure Supabase

In your Supabase Dashboard:

1. Go to **Authentication > Providers > Google**
2. Enable Google provider
3. Add your Google OAuth credentials (from Google Cloud Console)
4. Set redirect URL: `https://your-supabase-url/auth/v1/callback`

For self-hosted Supabase, add to your Docker `.env`:

```bash
GOTRUE_EXTERNAL_GOOGLE_ENABLED=true
GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID=your-google-client-id
GOTRUE_EXTERNAL_GOOGLE_SECRET=your-google-client-secret
GOTRUE_EXTERNAL_GOOGLE_REDIRECT_URI=https://your-supabase-url/auth/v1/callback
SITE_URL=http://localhost:3000
ADDITIONAL_REDIRECT_URLS=http://localhost:3000/auth/callback
```

### 4. Configure Google Cloud Console

1. Create OAuth 2.0 credentials
2. Add authorized redirect URI: `https://your-supabase-url/auth/v1/callback`

### 5. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000/sign-in` to test authentication.

## Project Structure

```
app/
├── (auth)/sign-in/        # Sign-in page
├── (dashboard)/dashboard/ # Protected dashboard
├── auth/callback/         # OAuth callback handler
lib/
└── supabase/
    ├── client.ts          # Browser client
    ├── server.ts          # Server client
    └── middleware.ts      # Session handling
middleware.ts              # Route protection
```

## Routes

| Route | Description |
|-------|-------------|
| `/sign-in` | Google OAuth sign-in |
| `/dashboard` | Protected page (requires auth) |
| `/auth/callback` | OAuth callback handler |
