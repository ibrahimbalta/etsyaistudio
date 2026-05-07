
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TABLE public.trend_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  niche TEXT NOT NULL,
  results JSONB NOT NULL DEFAULT '[]'::jsonb,
  ai_summary TEXT,
  design_ideas JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trend_searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own trend select" ON public.trend_searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own trend insert" ON public.trend_searches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own trend delete" ON public.trend_searches FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE public.designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  niche TEXT,
  style TEXT,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own design select" ON public.designs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own design insert" ON public.designs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own design update" ON public.designs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own design delete" ON public.designs FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  design_id UUID REFERENCES public.designs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  pinterest_text TEXT,
  tiktok_script TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own listing select" ON public.listings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own listing insert" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own listing update" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own listing delete" ON public.listings FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
