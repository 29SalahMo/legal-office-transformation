
-- Create articles table
CREATE TABLE public.articles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  author text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  content text[] NOT NULL DEFAULT '{}',
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Anyone can view published articles"
  ON public.articles FOR SELECT
  USING (published = true OR has_role(auth.uid(), 'admin'::app_role));

-- Admin CRUD
CREATE POLICY "Admins can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update articles"
  ON public.articles FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Timestamp trigger
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial articles
INSERT INTO public.articles (slug, title, author, category, description, content, published) VALUES
(
  'navigating-commercial-disputes',
  'Navigating Commercial Disputes in Egypt''s Evolving Legal Landscape',
  'Dr. Ahmed Abdallah',
  'Dispute Resolution',
  'An in-depth analysis of recent developments in Egyptian commercial law and their implications for businesses operating in the region.',
  ARRAY[
    'Egypt''s commercial legal landscape has undergone significant transformation in recent years, driven by legislative reforms and a growing emphasis on aligning with international standards. For businesses operating in the region, understanding these developments is not just advantageous — it''s essential.',
    'The Egyptian Commercial Code, alongside recent amendments to the Investment Law and the Companies Law, has introduced new frameworks for dispute resolution that offer both opportunities and challenges. These changes reflect a broader shift toward creating a more investor-friendly environment while maintaining robust protections for all parties involved.',
    'One of the most notable developments has been the expansion of arbitration as a preferred method of resolving commercial disputes. The Cairo Regional Centre for International Commercial Arbitration (CRCICA) has seen a steady increase in caseloads, reflecting growing confidence in alternative dispute resolution mechanisms.',
    'For multinational corporations and foreign investors, navigating this evolving landscape requires not only legal expertise but also a deep understanding of the cultural and regulatory nuances that shape commercial relationships in Egypt. Our experience has shown that a proactive approach to dispute prevention — combined with strategic planning for potential conflicts — yields the best outcomes for our clients.',
    'At A&A Legal Advisors, we continue to monitor these developments closely and advise our clients on the most effective strategies for protecting their interests in Egypt''s dynamic commercial environment.'
  ],
  true
),
(
  'key-considerations-ma-transactions',
  'Key Considerations for M&A Transactions in Egypt',
  'Mr. Mohamed Abu El Naga',
  'Corporate & M&A',
  'Essential legal frameworks and regulatory requirements for successful mergers and acquisitions in the Egyptian market.',
  ARRAY[
    'Mergers and acquisitions in Egypt present unique opportunities for growth and expansion, but they also require careful navigation of a complex regulatory framework. Understanding the key legal considerations is critical to ensuring a successful transaction.',
    'The Egyptian Competition Authority (ECA) plays a central role in M&A oversight, requiring pre-merger notifications for transactions that exceed certain thresholds. Recent updates to these thresholds have broadened the scope of transactions subject to regulatory review.',
    'Due diligence in Egyptian M&A transactions must account for a range of factors, including labor law compliance, tax obligations, intellectual property rights, and environmental regulations. Each of these areas presents specific challenges that can significantly impact deal valuation and structure.',
    'Our team at A&A Legal Advisors brings extensive experience in structuring and executing M&A transactions across various sectors, ensuring that our clients'' interests are protected at every stage of the process.',
    'We recommend early engagement with legal counsel to identify potential obstacles and develop strategies that align with both regulatory requirements and business objectives.'
  ],
  true
),
(
  'understanding-egypts-new-investment-regulations',
  'Understanding Egypt''s New Investment Regulations',
  'A&A Legal Team',
  'Investment Law',
  'A comprehensive guide to the latest investment laws and their impact on foreign investors seeking opportunities in Egypt.',
  ARRAY[
    'Egypt''s investment climate has been reshaped by a series of legislative reforms aimed at attracting foreign capital and streamlining the regulatory process. The Investment Law No. 72 of 2017 and its subsequent amendments have introduced significant incentives and protections for investors.',
    'Key provisions include tax incentives for investments in targeted sectors and regions, guarantees against nationalization and expropriation, and streamlined procedures for establishing businesses through the General Authority for Investment and Free Zones (GAFI).',
    'The Golden License, introduced as a fast-track approval mechanism for strategic projects, has been particularly noteworthy. This single approval encompasses all necessary permits and licenses, significantly reducing the time and complexity involved in launching major investment projects.',
    'Foreign investors should also be aware of the dispute resolution mechanisms available under Egyptian law, including access to international arbitration under bilateral investment treaties and the ICSID Convention.',
    'At A&A Legal Advisors, we guide our clients through every aspect of the investment process, from initial feasibility assessments to regulatory compliance and ongoing operational support.'
  ],
  true
);
