-- Create table for site settings (meta title, description, logo, etc.)
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  key text NOT NULL UNIQUE,
  value_ar text,
  value_en text,
  meta_data jsonb DEFAULT '{}'::jsonb
);

-- Create table for hero section content
CREATE TABLE public.hero_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  title_ar text NOT NULL,
  title_en text NOT NULL,
  subtitle_ar text NOT NULL,
  subtitle_en text NOT NULL,
  cta_text_ar text NOT NULL,
  cta_text_en text NOT NULL,
  cta_link text NOT NULL,
  background_image_url text,
  is_active boolean NOT NULL DEFAULT true
);

-- Create table for about section content
CREATE TABLE public.about_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  title_ar text NOT NULL,
  title_en text NOT NULL,
  subtitle_ar text NOT NULL,
  subtitle_en text NOT NULL,
  description_ar text NOT NULL,
  description_en text NOT NULL,
  innovation_text_ar text NOT NULL,
  innovation_text_en text NOT NULL,
  quality_text_ar text NOT NULL,
  quality_text_en text NOT NULL,
  partnership_text_ar text NOT NULL,
  partnership_text_en text NOT NULL,
  image_url text,
  cta_text_ar text NOT NULL,
  cta_text_en text NOT NULL,
  is_active boolean NOT NULL DEFAULT true
);

-- Create table for social media links
CREATE TABLE public.social_links (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  platform text NOT NULL,
  url text NOT NULL,
  icon text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0
);

-- Create table for footer content
CREATE TABLE public.footer_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  company_description_ar text NOT NULL,
  company_description_en text NOT NULL,
  address_ar text NOT NULL,
  address_en text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  working_hours_ar text NOT NULL,
  working_hours_en text NOT NULL,
  copyright_text_ar text NOT NULL,
  copyright_text_en text NOT NULL
);

-- Create table for CTA buttons
CREATE TABLE public.cta_buttons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  text_ar text NOT NULL,
  text_en text NOT NULL,
  link text NOT NULL,
  location text NOT NULL, -- where the button appears (hero, about, etc.)
  style text DEFAULT 'primary',
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0
);

-- Create table for page sections management
CREATE TABLE public.page_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  section_name text NOT NULL,
  title_ar text NOT NULL,
  title_en text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  meta_data jsonb DEFAULT '{}'::jsonb
);

-- Create table for analytics/simple stats
CREATE TABLE public.site_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  event_type text NOT NULL, -- page_view, button_click, contact_form_submit
  page_path text,
  user_agent text,
  ip_address inet,
  meta_data jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read on site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read on hero_content" ON public.hero_content FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on about_content" ON public.about_content FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on social_links" ON public.social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on footer_content" ON public.footer_content FOR SELECT USING (true);
CREATE POLICY "Allow public read on cta_buttons" ON public.cta_buttons FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on page_sections" ON public.page_sections FOR SELECT USING (is_active = true);

-- Create policies for authenticated admin access
CREATE POLICY "Allow authenticated users to manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage hero_content" ON public.hero_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage about_content" ON public.about_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage footer_content" ON public.footer_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage cta_buttons" ON public.cta_buttons FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage page_sections" ON public.page_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Analytics policies
CREATE POLICY "Allow anyone to insert analytics" ON public.site_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to view analytics" ON public.site_analytics FOR SELECT TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_footer_content_updated_at BEFORE UPDATE ON public.footer_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cta_buttons_updated_at BEFORE UPDATE ON public.cta_buttons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.site_settings (key, value_ar, value_en) VALUES
('site_title', 'علو - شركة تطوير المواقع والتطبيقات', 'Olu - Web Development & Applications'),
('site_description', 'نقدم حلول تقنية مبتكرة ومتطورة لتطوير المواقع والتطبيقات والتسويق الرقمي', 'We provide innovative and advanced technical solutions for web development, applications and digital marketing'),
('logo_url', '/alo.png', '/alo.png'),
('company_name', 'علو', 'Olu'),
('contact_email', 'info@olu-it.com', 'info@olu-it.com'),
('contact_phone', '+966 50 869 4899', '+966 50 869 4899');

INSERT INTO public.hero_content (title_ar, title_en, subtitle_ar, subtitle_en, cta_text_ar, cta_text_en, cta_link) VALUES
('نبني المستقبل الرقمي', 'Building Digital Future', 'نقدم حلول تقنية مبتكرة ومتطورة لتطوير المواقع والتطبيقات والتسويق الرقمي لمساعدة عملك على النمو والازدهار في العالم الرقمي', 'We provide innovative and advanced technical solutions for web development, applications and digital marketing to help your business grow and thrive in the digital world', 'تواصل معنا', 'Contact Us', '#contact');

INSERT INTO public.about_content (
  title_ar, title_en, 
  subtitle_ar, subtitle_en,
  description_ar, description_en,
  innovation_text_ar, innovation_text_en,
  quality_text_ar, quality_text_en,
  partnership_text_ar, partnership_text_en,
  cta_text_ar, cta_text_en
) VALUES (
  'من نحن', 'About Us',
  'نحن فريق من المطورين المحترفين', 'We are a team of professional developers',
  'شركة علو متخصصة في تطوير المواقع والتطبيقات والحلول التقنية المبتكرة. نعمل مع عملائنا لتحويل أفكارهم إلى حقيقة رقمية تساعدهم على تحقيق أهدافهم.',
  'Olu company specializes in web development, applications and innovative technical solutions. We work with our clients to turn their ideas into digital reality that helps them achieve their goals.',
  'الابتكار والإبداع في كل مشروع نعمل عليه',
  'Innovation and creativity in every project we work on',
  'جودة عالية في التصميم والتطوير',
  'High quality in design and development',
  'شراكة حقيقية مع عملائنا لضمان النجاح',
  'Real partnership with our clients to ensure success',
  'اسأل سؤال', 'Ask Question'
);

INSERT INTO public.social_links (platform, url, icon, order_index) VALUES
('twitter', 'https://twitter.com', 'twitter', 1),
('instagram', 'https://instagram.com', 'instagram', 2),
('linkedin', 'https://linkedin.com', 'linkedin', 3),
('whatsapp', 'https://wa.me/966508694899', 'phone', 4);

INSERT INTO public.footer_content (
  company_description_ar, company_description_en,
  address_ar, address_en,
  phone, email,
  working_hours_ar, working_hours_en,
  copyright_text_ar, copyright_text_en
) VALUES (
  'نبني مستقبلاً رقمياً أفضل من خلال حلول تقنية مبتكرة',
  'Building a better digital future through innovative tech solutions',
  'المملكة العربية السعودية، جازان',
  'Jazan, Saudi Arabia',
  '+966 50 869 4899',
  'info@olu-it.com',
  '09 صباحاً - 05 مساءً من السبت إلى الخميس',
  '09am - 05pm Sat-Thu',
  'جميع الحقوق محفوظة',
  'All rights reserved'
);

-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true);

-- Create storage policies
CREATE POLICY "Admin uploads are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'admin-uploads');
CREATE POLICY "Authenticated users can upload admin files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'admin-uploads');
CREATE POLICY "Authenticated users can update admin files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'admin-uploads');
CREATE POLICY "Authenticated users can delete admin files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'admin-uploads');