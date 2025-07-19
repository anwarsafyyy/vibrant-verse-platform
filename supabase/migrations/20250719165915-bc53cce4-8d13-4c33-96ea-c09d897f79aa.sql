INSERT INTO site_settings (key, value_ar, value_en) 
VALUES ('transformation_image_url', '/lovable-uploads/e49972b8-5188-44e0-8979-c45094f28d96.png', '/lovable-uploads/e49972b8-5188-44e0-8979-c45094f28d96.png')
ON CONFLICT (key) DO UPDATE SET 
value_ar = EXCLUDED.value_ar, 
value_en = EXCLUDED.value_en;