-- Spotlight Feature: AI-Powered Book Discussions
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Bot Personas (500 pre-seeded)
-- =============================================
CREATE TABLE IF NOT EXISTS spotlight_bots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar_seed TEXT NOT NULL,
  personality_type TEXT NOT NULL CHECK (personality_type IN (
    'critic', 'enthusiast', 'casual', 'academic', 'emotional', 'contrarian', 'supportive'
  )),
  reading_preferences TEXT[] DEFAULT '{}',
  communication_style TEXT NOT NULL CHECK (communication_style IN (
    'verbose', 'concise', 'poetic', 'blunt', 'questioning'
  )),
  backstory TEXT NOT NULL,
  quirks TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Books uploaded by authors
-- =============================================
CREATE TABLE IF NOT EXISTS spotlight_books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cover_url TEXT,
  file_url TEXT,
  file_type TEXT CHECK (file_type IN ('pdf', 'epub')),
  analysis JSONB DEFAULT '{}',
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'ready', 'error')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Discussion rooms (one per book)
-- =============================================
CREATE TABLE IF NOT EXISTS spotlight_discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES spotlight_books(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Messages in discussions
-- =============================================
CREATE TABLE IF NOT EXISTS spotlight_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID REFERENCES spotlight_discussions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('bot', 'user')),
  sender_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  sender_avatar TEXT,
  content TEXT NOT NULL,
  reply_to UUID REFERENCES spotlight_messages(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Active bots per discussion
-- =============================================
CREATE TABLE IF NOT EXISTS spotlight_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID REFERENCES spotlight_discussions(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES spotlight_bots(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  last_message_at TIMESTAMPTZ,
  message_count INT DEFAULT 0,
  UNIQUE(discussion_id, bot_id)
);

-- =============================================
-- Indexes for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_messages_discussion ON spotlight_messages(discussion_id, created_at);
CREATE INDEX IF NOT EXISTS idx_discussions_book ON spotlight_discussions(book_id);
CREATE INDEX IF NOT EXISTS idx_books_author ON spotlight_books(author_id);
CREATE INDEX IF NOT EXISTS idx_participants_discussion ON spotlight_participants(discussion_id);

-- =============================================
-- Enable Realtime on messages table
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE spotlight_messages;

-- =============================================
-- Row Level Security
-- =============================================
ALTER TABLE spotlight_bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlight_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlight_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlight_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlight_participants ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can read
CREATE POLICY "Authenticated read bots" ON spotlight_bots
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read books" ON spotlight_books
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read discussions" ON spotlight_discussions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read messages" ON spotlight_messages
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read participants" ON spotlight_participants
  FOR SELECT TO authenticated USING (true);

-- Users can insert their own messages
CREATE POLICY "Users insert own messages" ON spotlight_messages
  FOR INSERT TO authenticated
  WITH CHECK (sender_type = 'user' AND sender_id = auth.uid());

-- Authors can insert their own books
CREATE POLICY "Authors insert own books" ON spotlight_books
  FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid());

-- Authors can update their own books
CREATE POLICY "Authors update own books" ON spotlight_books
  FOR UPDATE TO authenticated
  USING (author_id = auth.uid());
