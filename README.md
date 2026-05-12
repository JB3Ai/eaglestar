# Eagle Star Security Website

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set your Supabase environment variables in `.env.local`:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
3. Run the app:
   `npm run dev`

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run the following SQL in the Supabase SQL Editor:

```sql
-- Signups table
CREATE TABLE signups (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact requests table
CREATE TABLE contact_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form submissions)
CREATE POLICY "Allow public inserts into signups"
  ON signups FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts into contact_requests"
  ON contact_requests FOR INSERT WITH CHECK (true);

-- Deny all reads from anonymous (protect data)
CREATE POLICY "Deny public reads on signups"
  ON signups FOR SELECT USING (false);

CREATE POLICY "Deny public reads on contact_requests"
  ON contact_requests FOR SELECT USING (false);
```

3. Copy your Supabase project URL and anon key from Settings > API
4. Add them to your `.env.local` file

## Deployment

The app builds to static files in `dist/` which can be deployed to any static host (cPanel, Netlify, Vercel, etc.). Form submissions are handled via Supabase serverless database.
