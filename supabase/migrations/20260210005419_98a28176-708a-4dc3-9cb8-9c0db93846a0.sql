
-- Create job_postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  type TEXT DEFAULT 'Full-time',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- Public can read postings
CREATE POLICY "Anyone can view job postings"
ON public.job_postings
FOR SELECT
USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert job postings"
ON public.job_postings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete job postings"
ON public.job_postings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update job postings"
ON public.job_postings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
