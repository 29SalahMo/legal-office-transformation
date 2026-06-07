
-- Create a table to store editable page content
CREATE TABLE public.page_content (
  id TEXT NOT NULL,
  page_id TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text',
  value TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (page_id, id)
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read page content
CREATE POLICY "Anyone can view page content"
ON public.page_content FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert page content"
ON public.page_content FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update page content"
ON public.page_content FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete page content"
ON public.page_content FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket for page images
INSERT INTO storage.buckets (id, name, public) VALUES ('page-images', 'page-images', true);

CREATE POLICY "Anyone can view page images"
ON storage.objects FOR SELECT
USING (bucket_id = 'page-images');

CREATE POLICY "Admins can upload page images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'page-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update page images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'page-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete page images"
ON storage.objects FOR DELETE
USING (bucket_id = 'page-images' AND has_role(auth.uid(), 'admin'::app_role));
