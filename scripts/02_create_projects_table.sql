-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  results TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  metrics JSONB NOT NULL,
  analytics_images TEXT[] NOT NULL,
  platforms TEXT[] NOT NULL,
  timeline TEXT NOT NULL,
  budget TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access" ON public.projects
  FOR SELECT USING (true);

-- Create index on slug for faster queries
CREATE INDEX IF NOT EXISTS projects_slug_idx ON public.projects(slug);
