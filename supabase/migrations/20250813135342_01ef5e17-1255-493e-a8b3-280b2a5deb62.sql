-- Create contact_settings table for managing contact information
CREATE TABLE public.contact_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  address_ar TEXT NOT NULL,
  address_en TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  map_embed_url TEXT
);

-- Enable RLS
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read on contact_settings" 
ON public.contact_settings 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage contact_settings" 
ON public.contact_settings 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_settings_updated_at
BEFORE UPDATE ON public.contact_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();