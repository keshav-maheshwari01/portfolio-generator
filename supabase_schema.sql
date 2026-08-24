-- ==========================================
-- AI PORTFOLIO GENERATOR - SUPABASE SCHEMA & RLS
-- ==========================================

-- 1. Create portfolios table
CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'My Portfolio',
    slug TEXT UNIQUE NOT NULL,
    template TEXT NOT NULL DEFAULT 'minimal',
    theme JSONB NOT NULL DEFAULT '{}'::jsonb,
    content JSONB NOT NULL DEFAULT '{
        "profile": {},
        "skills": [],
        "experience": [],
        "education": [],
        "projects": [],
        "media": {}
    }'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_portfolios_owner_id ON public.portfolios(owner_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON public.portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_portfolios_is_published ON public.portfolios(is_published);

-- 3. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_portfolios_updated_at ON public.portfolios;
CREATE TRIGGER set_portfolios_updated_at
BEFORE UPDATE ON public.portfolios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for portfolios table

-- Policy: Owners can perform all operations on their portfolios
DROP POLICY IF EXISTS "Users can manage own portfolios" ON public.portfolios;
CREATE POLICY "Users can manage own portfolios"
    ON public.portfolios
    FOR ALL
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- Policy: Anyone can view published portfolios
DROP POLICY IF EXISTS "Public can view published portfolios" ON public.portfolios;
CREATE POLICY "Public can view published portfolios"
    ON public.portfolios
    FOR SELECT
    USING (is_published = true);

-- ==========================================
-- STORAGE BUCKET CONFIGURATION & RLS
-- ==========================================

-- 6. Insert storage bucket for portfolio media
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 7. RLS Policies for storage.objects

-- Allow public read access to portfolio-media bucket
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'portfolio-media');

-- Allow authenticated users to upload files to portfolio-media bucket
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
CREATE POLICY "Authenticated Upload Access"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

-- Allow users to update their uploaded files
DROP POLICY IF EXISTS "Authenticated Update Access" ON storage.objects;
CREATE POLICY "Authenticated Update Access"
    ON storage.objects
    FOR UPDATE
    USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

-- Allow users to delete their uploaded files
DROP POLICY IF EXISTS "Authenticated Delete Access" ON storage.objects;
CREATE POLICY "Authenticated Delete Access"
    ON storage.objects
    FOR DELETE
    USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
