-- Create etsy_shops table to store shop credentials and settings
CREATE TABLE IF NOT EXISTS public.etsy_shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    shop_name TEXT,
    shop_id TEXT UNIQUE,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.etsy_shops ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own shops" ON public.etsy_shops
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own shops" ON public.etsy_shops
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own shops" ON public.etsy_shops
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shops" ON public.etsy_shops
    FOR DELETE USING (auth.uid() = user_id);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.etsy_shops
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
