-- Add missing columns to member_registrations table
ALTER TABLE member_registrations 
ADD COLUMN IF NOT EXISTS event_updates BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending';

-- Update existing records to have default values
UPDATE member_registrations 
SET 
  event_updates = false,
  payment_method = 'direct',
  payment_status = 'completed'
WHERE event_updates IS NULL;
