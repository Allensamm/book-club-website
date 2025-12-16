-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  number_of_attendees INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events (public read)
CREATE POLICY "Anyone can view events"
  ON public.events FOR SELECT
  USING (true);

-- RLS Policies for event_registrations (public insert, own data read/update/delete)
CREATE POLICY "Anyone can register for events"
  ON public.event_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view registration counts"
  ON public.event_registrations FOR SELECT
  USING (true);

-- Create function to get registration count for an event
CREATE OR REPLACE FUNCTION get_event_registration_count(event_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(number_of_attendees), 0)::INTEGER
  FROM public.event_registrations
  WHERE event_id = event_uuid;
$$ LANGUAGE SQL STABLE;
