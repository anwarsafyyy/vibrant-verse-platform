-- Create storage bucket for admin uploads if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('admin-uploads', 'Admin Uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for admin uploads
CREATE POLICY "Public can view admin uploads" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'admin-uploads');

CREATE POLICY "Authenticated users can upload admin files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'admin-uploads');

CREATE POLICY "Authenticated users can update admin files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'admin-uploads');

CREATE POLICY "Authenticated users can delete admin files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'admin-uploads');