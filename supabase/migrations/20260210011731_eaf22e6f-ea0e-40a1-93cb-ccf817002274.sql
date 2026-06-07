
-- Create updated_at function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  role_category TEXT NOT NULL DEFAULT 'Associate',
  focus TEXT,
  bio TEXT[] DEFAULT '{}',
  photo_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  experience TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
ON public.team_members FOR SELECT USING (true);

CREATE POLICY "Admins can insert team members"
ON public.team_members FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update team members"
ON public.team_members FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete team members"
ON public.team_members FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for team photos
INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos', 'team-photos', true);

CREATE POLICY "Anyone can view team photos"
ON storage.objects FOR SELECT USING (bucket_id = 'team-photos');

CREATE POLICY "Admins can upload team photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'team-photos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update team photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'team-photos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete team photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'team-photos' AND has_role(auth.uid(), 'admin'::app_role));
