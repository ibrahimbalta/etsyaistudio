
-- Add SaaS related columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS credits INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active';

-- Ensure credits cannot be negative
ALTER TABLE public.profiles 
ADD CONSTRAINT credits_non_negative CHECK (credits >= 0);
