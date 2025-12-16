-- Insert sample events
INSERT INTO public.events (id, title, date, time, location, type, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Author Talk with Matt Haig', 'December 22, 2025', '6:00 PM - 7:00 PM', 'In-Person - Downtown Library', 'Author Event', 'Exclusive conversation with author Matt Haig about his writing process and The Midnight Library.'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Book Discussion: Tomorrow, and Tomorrow, and Tomorrow', 'December 28, 2025', '3:00 PM - 4:30 PM', 'Virtual - Zoom', 'Book Discussion', 'A deep dive into Gabrielle Zevin''s epic novel about friendship, creativity, and the world of gaming.'),
  ('550e8400-e29b-41d4-a716-446655440003', 'New Year Reading Challenge Kickoff', 'January 5, 2026', '7:00 PM - 8:30 PM', 'In-Person - Central Branch', 'Community Event', 'Join us as we launch our 2026 Reading Challenge with goal-setting, book recommendations, and prizes.'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Virtual Coffee Chat: Fiction Favorites', 'January 12, 2026', '10:00 AM - 11:00 AM', 'Virtual - Zoom', 'Social Event', 'A casual morning chat about our favorite fiction reads over coffee.');

-- Insert some initial registrations to show realistic numbers
INSERT INTO public.event_registrations (event_id, full_name, email, number_of_attendees) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', 'sarah.j@email.com', 2),
  ('550e8400-e29b-41d4-a716-446655440001', 'Michael Chen', 'mchen@email.com', 1),
  ('550e8400-e29b-41d4-a716-446655440002', 'Emily Rodriguez', 'emily.r@email.com', 1),
  ('550e8400-e29b-41d4-a716-446655440003', 'David Park', 'dpark@email.com', 3);
