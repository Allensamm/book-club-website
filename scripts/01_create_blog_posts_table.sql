-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access" ON public.blog_posts
  FOR SELECT USING (true);

-- Create index on slug for faster queries
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts(slug);
