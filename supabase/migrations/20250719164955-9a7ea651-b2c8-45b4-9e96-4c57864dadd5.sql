-- Insert hero section content
INSERT INTO site_settings (key, value_ar, value_en) VALUES 
('hero_title', 'نقود التحول الرقمي من خلال الابتكار', 'Driving Digital Transformation Through Innovation'),
('hero_description', 'شراكة حقيقية مع عملائنا لضمان النجاح', 'True partnership with our clients to ensure success'),
('hero_cta_primary', 'ابدأ رحلتك الرقمية', 'Start Your Digital Journey'),
('hero_cta_secondary', 'تعرف على خدماتنا', 'Explore Our Services'),
('hero_badge_text', 'نحو التميز الرقمي', 'Towards Digital Excellence')
ON CONFLICT (key) DO UPDATE SET 
value_ar = EXCLUDED.value_ar, 
value_en = EXCLUDED.value_en;

-- Clear existing stats and insert new ones
DELETE FROM stats;
INSERT INTO stats (name, value, icon, order_index) VALUES
('عملاء راضون', '200+', 'users', 1),
('مشاريع منجزة', '50+', 'briefcase', 2),
('سنوات من الخبرة', '4+', 'clock', 3),
('تقنيات مستخدمة', '25+', 'code', 4);