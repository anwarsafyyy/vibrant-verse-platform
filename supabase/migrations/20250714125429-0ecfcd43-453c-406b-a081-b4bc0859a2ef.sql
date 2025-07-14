-- Create FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  question_ar TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read on faqs" 
ON public.faqs 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage faqs" 
ON public.faqs 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for timestamps
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add site_logo to site_settings if not exists
INSERT INTO public.site_settings (key, value_ar, value_en) 
VALUES 
  ('site_name', 'اسم الموقع', 'Site Name'),
  ('favicon_url', '/favicon.ico', '/favicon.ico')
ON CONFLICT (key) DO NOTHING;