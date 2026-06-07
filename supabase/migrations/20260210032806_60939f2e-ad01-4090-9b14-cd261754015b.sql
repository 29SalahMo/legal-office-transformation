
-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  quote text NOT NULL,
  photo_url text,
  rating integer NOT NULL DEFAULT 5,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

-- Admin write
CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update timestamp
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default testimonials
INSERT INTO public.testimonials (name, title, quote, rating, display_order) VALUES
  ('John Anderson', 'CEO, Tech Corp', 'The material is really updated. An excellent team focused on the art of legal representation with uncompromising integrity. Highly recommended.', 5, 0),
  ('Sarah Williams', 'CFO, Investment Group', 'Very different from conventional agencies. This one is stable, easier to collaborate, and easy to leverage.', 5, 1),
  ('Michael Chen', 'Founder, StartupXYZ', 'Again, for a law firm like this, it''s really comfortable and genuinely via point of action.', 5, 2);
