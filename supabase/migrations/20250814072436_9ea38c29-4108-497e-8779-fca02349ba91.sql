-- Create footer_links table for managing footer links
CREATE TABLE IF NOT EXISTS public.footer_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  link text NOT NULL,
  category text DEFAULT 'general'
);

-- Enable RLS
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

-- Create policies for footer_links
CREATE POLICY "Allow public read on footer_links" 
ON public.footer_links 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage footer_links" 
ON public.footer_links 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_footer_links_updated_at
BEFORE UPDATE ON public.footer_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default footer links
INSERT INTO public.footer_links (name_ar, name_en, link, category, order_index) VALUES
('سياسة الخصوصية', 'Privacy Policy', '#privacy', 'legal', 1),
('شروط الاستخدام', 'Terms of Service', '#terms', 'legal', 2),
('سياسة الإلغاء', 'Cancellation Policy', '#cancellation', 'legal', 3),
('عن الشركة', 'About Company', '#about', 'company', 4),
('المدونة', 'Blog', '#blog', 'content', 5);