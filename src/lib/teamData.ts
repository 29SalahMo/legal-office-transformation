import partnerMale from "@/assets/partner-male.jpg";
import partnerFemale from "@/assets/partner-female.jpg";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];

const PARTNER_PHOTOS: Record<string, string> = {
  "Dr. Ahmed Abdallah": partnerMale,
  "Mr. Mohamed Abu El Naga": partnerFemale,
};

export const resolveTeamPhoto = (name: string, photoUrl: string | null | undefined): string => {
  if (photoUrl && (photoUrl.startsWith("http") || photoUrl.startsWith("/"))) {
    return photoUrl;
  }
  return PARTNER_PHOTOS[name] ?? partnerMale;
};

const withResolvedPhotos = (members: TeamMember[]): TeamMember[] =>
  members.map((member) => ({
    ...member,
    photo_url: resolveTeamPhoto(member.name, member.photo_url),
  }));

export const FALLBACK_TEAM_MEMBERS: TeamMember[] = withResolvedPhotos([
  {
    id: "fallback-ahmed-abdallah",
    name: "Dr. Ahmed Abdallah",
    title: "Founding Partner",
    role_category: "Partner",
    focus: "Litigation & Arbitration",
    bio: [
      "Dr. Ahmed Abdallah is a founding partner with over 25 years of experience in complex commercial litigation and international arbitration.",
      "He has represented major corporations and financial institutions across Egypt and the broader MENA region.",
    ],
    photo_url: partnerMale,
    linkedin_url: null,
    email: "info@asalegaladvisors.com",
    experience: "25+",
    display_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-mohamed-abu-el-naga",
    name: "Mr. Mohamed Abu El Naga",
    title: "Founding Partner",
    role_category: "Partner",
    focus: "Corporate & M&A",
    bio: [
      "Mr. Mohamed Abu El Naga leads the firm's corporate practice, advising on mergers, acquisitions, and cross-border transactions.",
      "His pragmatic counsel helps clients navigate regulatory frameworks while protecting commercial interests.",
    ],
    photo_url: partnerFemale,
    linkedin_url: null,
    email: "info@asalegaladvisors.com",
    experience: "20+",
    display_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-senior-associate",
    name: "Senior Associate",
    title: "Senior Associate",
    role_category: "Senior Associate",
    focus: "Dispute Resolution",
    bio: [
      "Experienced litigator supporting complex disputes across commercial, banking, and construction matters.",
    ],
    photo_url: partnerMale,
    linkedin_url: null,
    email: null,
    experience: "10+",
    display_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-associate",
    name: "Associate Counsel",
    title: "Associate",
    role_category: "Associate",
    focus: "Corporate Advisory",
    bio: [
      "Provides strategic support on corporate governance, compliance, and transactional due diligence.",
    ],
    photo_url: partnerFemale,
    linkedin_url: null,
    email: null,
    experience: "5+",
    display_order: 4,
    created_at: "",
    updated_at: "",
  },
]);

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured) {
    return FALLBACK_TEAM_MEMBERS;
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data?.length) {
      return FALLBACK_TEAM_MEMBERS;
    }

    return withResolvedPhotos(data);
  } catch {
    return FALLBACK_TEAM_MEMBERS;
  }
}

export async function fetchTeamMemberById(id: string): Promise<TeamMember | null> {
  const fallback = FALLBACK_TEAM_MEMBERS.find((member) => member.id === id);
  if (!isSupabaseConfigured) {
    return fallback ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return fallback ?? null;
    }

    return withResolvedPhotos([data])[0];
  } catch {
    return fallback ?? null;
  }
}

export async function fetchHomepageLeaders(limit = 4): Promise<TeamMember[]> {
  const members = await fetchTeamMembers();
  return members.slice(0, limit);
}
