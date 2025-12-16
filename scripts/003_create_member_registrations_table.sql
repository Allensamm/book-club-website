-- Create member_registrations table to store membership sign-ups
CREATE TABLE IF NOT EXISTS member_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  membership_tier TEXT NOT NULL CHECK (membership_tier IN ('explorer', 'discoverer', 'curator')),
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  favorite_genres TEXT[],
  reading_frequency TEXT,
  newsletter_updates BOOLEAN DEFAULT false,
  newsletter_recommendations BOOLEAN DEFAULT false,
  newsletter_events BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_member_registrations_email ON member_registrations(email);

-- Create index for membership tier filtering
CREATE INDEX IF NOT EXISTS idx_member_registrations_tier ON member_registrations(membership_tier);

-- Enable Row Level Security
ALTER TABLE member_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (register)
CREATE POLICY "Anyone can register as a member"
  ON member_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to view registrations (for admin dashboard)
CREATE POLICY "Anyone can view member registrations"
  ON member_registrations
  FOR SELECT
  TO anon, authenticated
  USING (true);
