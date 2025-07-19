INSERT INTO site_settings (key, value_ar, value_en) 
VALUES ('favicon_url', 'https://firebasestorage.googleapis.com/v0/b/yaqid-224fa.firebasestorage.app/o/c-removebg-preview.png?alt=media&token=90a5be5e-3e32-49b6-a924-f298b97dc492', 'https://firebasestorage.googleapis.com/v0/b/yaqid-224fa.firebasestorage.app/o/c-removebg-preview.png?alt=media&token=90a5be5e-3e32-49b6-a924-f298b97dc492')
ON CONFLICT (key) DO UPDATE SET 
value_ar = EXCLUDED.value_ar, 
value_en = EXCLUDED.value_en;