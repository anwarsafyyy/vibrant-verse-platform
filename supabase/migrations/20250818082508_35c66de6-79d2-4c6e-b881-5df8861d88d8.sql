-- Add icon and target fields to footer_links table
ALTER TABLE footer_links 
ADD COLUMN IF NOT EXISTS icon text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS target text DEFAULT '_self';

-- Update existing records to have proper targets
UPDATE footer_links SET target = '_self' WHERE target IS NULL;

-- Insert default category links if they don't exist
INSERT INTO footer_links (name_ar, name_en, link, category, is_active, order_index, icon, target)
SELECT * FROM (VALUES
  ('سياسة الخصوصية', 'Privacy Policy', '/privacy-policy', 'Privacy Policy', true, 1, 'shield', '_self'),
  ('شروط الاستخدام', 'Terms of Use', '/terms-of-use', 'Terms of Use', true, 1, 'file-text', '_self'),
  ('سياسة الإلغاء', 'Cancellation Policy', '/cancellation-policy', 'Cancellation Policy', true, 1, 'x-circle', '_self'),
  ('عن الشركة', 'About the Company', '/about', 'About the Company', true, 1, 'building', '_self'),
  ('المدونة', 'Blog', '/blog', 'Blog', true, 1, 'book-open', '_self')
) AS new_links(name_ar, name_en, link, category, is_active, order_index, icon, target)
WHERE NOT EXISTS (
  SELECT 1 FROM footer_links WHERE category = new_links.category
);