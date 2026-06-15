import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { PARTNER_PHOTOS_BY_NAME, PARTNER_PHOTO_URLS } from "@/lib/partnerPhotos";

export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];

export { PARTNER_PHOTO_URLS, PARTNER_PHOTOS_BY_NAME };

const INVALID_PHOTO_PATTERNS = [
  /lovable\.app/i,
  /lovableproject\.com/i,
  /r2\.dev.*preview/i,
  /blob:/,
  /localhost/i,
  /127\.0\.0\.1/,
];

export const isValidTeamPhotoUrl = (url: string | null | undefined): url is string => {
  if (!url?.trim()) return false;
  if (INVALID_PHOTO_PATTERNS.some((pattern) => pattern.test(url))) return false;
  if (url.startsWith("/assets/")) return true;
  if (url.startsWith("http") && url.includes("/storage/v1/object/public/team-photos/")) return true;
  if (url.startsWith("http") && !url.includes("placeholder")) return true;
  return false;
};

export const resolveTeamPhoto = (
  name: string,
  photoUrl: string | null | undefined,
  _roleCategory?: string
): string | null => {
  if (isValidTeamPhotoUrl(photoUrl)) return photoUrl;
  if (PARTNER_PHOTOS_BY_NAME[name]) return PARTNER_PHOTOS_BY_NAME[name];
  return null;
};

const normalizeName = (name: string) => name.trim().toLowerCase();

const enrichMember = (member: TeamMember): TeamMember => ({
  ...member,
  bio: member.bio ?? [],
  photo_url: resolveTeamPhoto(member.name, member.photo_url, member.role_category),
});

/** Full firm roster — works on deployment even without Supabase env vars */
export const STATIC_TEAM_ROSTER: TeamMember[] = [
  {
    id: "315d98eb-ad92-4699-99bc-cce80577853a",
    name: "Dr. Ahmed Abdallah",
    title: "Managing Partner – Head of Dispute Resolution",
    role_category: "Partner",
    focus: "Dispute Resolution & Arbitration",
    photo_url: PARTNER_PHOTO_URLS.ahmedAbdallah,
    linkedin_url: null,
    email: "info@asalegaladvisors.com",
    experience: "28+ Years",
    display_order: 1,
    bio: [
      "Dr. Ahmed Abdallah is a distinguished legal professional with a prominent standing within the Egyptian Legal community. He established Abdallah & Abu El Naga Legal Advisors in 2022, drawing upon a wealth of expertise garnered throughout his illustrious career in both professional and academic spheres.",
      "His proficiency encompasses Labor Law, Tax Law, Telecommunication Regulations, Commercial Law, Corporate Law, Capital Markets, Civil Law, and Investments Law in both the Egyptian and Gulf regions.",
      "As the Head of the Dispute Resolution Department, Dr. Abdallah's seasoned insight positions him as a trailblazer in navigating complex legal challenges and delivering effective solutions for clients across diverse industries and jurisdictions.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "38d631f0-6b4b-4584-95d9-92faade270de",
    name: "Mr. Mohamed Abu El Naga",
    title: "Partner & Head of Corporate, M&A and Capital Markets",
    role_category: "Partner",
    focus: "Corporate, M&A & Capital Markets",
    photo_url: PARTNER_PHOTO_URLS.mohamedAbuElNaga,
    linkedin_url: null,
    email: "info@asalegaladvisors.com",
    experience: "12+ Years",
    display_order: 2,
    bio: [
      "Mr. Mohamed Abu El Naga, as a Co-founder and Partner, brings extensive expertise in Corporate Law, Capital Markets, and Merger and Acquisitions to the firm. With a career spanning over fourteen years across reputable law firms and multinational corporations, his skill set encompasses a wide array of legal domains.",
      "His advisory role involves providing counsel on public and private company acquisitions, initial public offerings (IPOs), and navigating complex regulatory financial issues.",
      "Among his notable achievements, Mr. Abu El Naga notably represented EM Group in the acquisition of 33 companies totaling EGP 5 billion in value.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "4e84b51e-5818-42fd-a817-0c9799a732b2",
    name: "Zeyad Mohamed",
    title: "Senior Associate",
    role_category: "Senior Associate",
    focus: "Litigation & Legal Research",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 3,
    bio: [
      "Mr. Zeyad Mohamed serves as a Senior Associate at Abdallah & Abu El Naga Legal Advisors. His responsibilities include attending hearings, drafting legal documents, reviewing contracts, preparing legal briefs, conducting legal research, and analyzing complex legal issues.",
      "Having acquired his Bachelor of Law degree from Cairo University in 2018, Mr. Zeyad has a foundational understanding of legal principles and practices.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "657d97aa-ef5e-4e8d-9079-d22ca08739fe",
    name: "Sayed Abdo",
    title: "Senior Associate",
    role_category: "Senior Associate",
    focus: "Litigation & Labor Disputes",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 4,
    bio: [
      "Mr. Sayed's role within the litigation department involves preparing and drafting memorandums, conducting research on civil cases, overseeing misdemeanors, and handling labor disputes. He manages the progression of cases and attends hearings in different courts.",
      "His educational background includes a Bachelor of Law Degree from the Faculty of Law at Cairo University in 2018.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "377c94ea-c3c2-4976-a342-f6d7f9bfebe2",
    name: "Mohamed Hashem",
    title: "Senior Associate",
    role_category: "Senior Associate",
    focus: "Dispute Resolution",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 5,
    bio: [
      "Mr. Mohamed Hashem serves as a Senior Associate supporting the firm's dispute resolution practice with case preparation, legal research, and client advisory work.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "63c71f7e-13ee-495a-a8e7-6c4d3c262318",
    name: "Mariam Al Biltagy",
    title: "Associate",
    role_category: "Associate",
    focus: "Dispute Resolution & Arbitration",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 6,
    bio: [
      "Mariam is an Associate in the Dispute Resolution Department. She graduated from the Faculty of Law, Ain Shams University, English Section, in 2023 and is pursuing an LL.M. in Private Law and International Investment Law.",
      "Her responsibilities include conducting thorough legal research, drafting memos and notices, and providing legal opinions in litigation and arbitration cases.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "27d5aca6-390d-469e-9445-8f66f4f3a171",
    name: "Salma Afifi",
    title: "Associate",
    role_category: "Associate",
    focus: "Litigation & Dispute Resolution",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 7,
    bio: [
      "Ms. Salma Afifi joined Abdallah & Abu El Naga Legal Advisors as an Associate. A recent Law graduate from the English Section of Cairo University, class of 2023.",
      "Her expertise encompasses legal writing, legal translation, and research, with experience in litigation and dispute resolution. She is multilingual in both Arabic and English.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "43044228-3551-4c07-85ab-954e9c19e9e7",
    name: "Rahma Tarek",
    title: "Associate",
    role_category: "Associate",
    focus: "Corporate Governance & Procedures",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 8,
    bio: [
      "Ms. Rahma Tarek works in the procedures and corporate governance team, managing administrative and corporate procedural matters related to various companies.",
      "Her responsibilities encompass ratifying minutes of meetings, overseeing the issuance of licenses, and ensuring regulatory compliance for clients.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "eaca188a-3852-4181-b932-d96d8bb5e02a",
    name: "Aya Saad",
    title: "Associate",
    role_category: "Associate",
    focus: "Legal Advisory",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 9,
    bio: [
      "Ms. Aya Saad serves as an Associate at Abdallah & Abu El Naga Legal Advisors, contributing to the firm's legal advisory and client service operations.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "deedb7e1-64c2-4c22-9340-c9c9a2bf6773",
    name: "Abdallah Magdy",
    title: "Associate",
    role_category: "Associate",
    focus: "Litigation",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 10,
    bio: [
      "Mr. Abdallah Magdy serves as an Associate at Abdallah & Abu El Naga Legal Advisors. His role involves attending court hearings and drafting legal documents such as memos, warnings, and notices.",
      "He holds a Bachelor of Law Degree from Cairo University's Faculty of Law in 2022.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "1af1045d-8f1f-46f7-a0e3-314a8be3a2af",
    name: "Mustafa Ahmed",
    title: "Junior Associate",
    role_category: "Junior Associate",
    focus: "Legal Support",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 11,
    bio: [
      "Mustafa Ahmed is a Junior Associate supporting the firm's legal teams with research, drafting, and case preparation.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "251e83c0-0a1e-422c-ae31-756be0ab5637",
    name: "Ahmed Saber",
    title: "Junior Associate",
    role_category: "Junior Associate",
    focus: "Corporate & Arbitration",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 12,
    bio: [
      "Ahmed Saber is a Junior Associate in the Corporate Team. He graduated from the Faculty of Shari'a and Law at Al-Azhar University in 2024.",
      "Ahmed brings valuable mooting experience from the SCCA and Shalakany Litigation Moot competitions, with strong skills in legal drafting, research, and advocacy.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "6bd7746e-7165-47d7-880d-59f505ec6dc8",
    name: "Mohamed Tarek",
    title: "Junior Associate",
    role_category: "Junior Associate",
    focus: "Legal Support",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 13,
    bio: [
      "Mohamed Tarek is a Junior Associate contributing to the firm's litigation and advisory practice.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "0735140f-7925-44a7-8eca-b9df432f662e",
    name: "Mayssa Amr",
    title: "Counsel",
    role_category: "Counsel",
    focus: "Legal Advisory",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 14,
    bio: [
      "Mayssa Amr serves as Counsel at Abdallah & Abu El Naga Legal Advisors, providing senior advisory support across the firm's practice areas.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "619440e1-06fc-45e5-8f5f-eaebc1743bce",
    name: "Hamdy Omar",
    title: "Counsel of Dispute Resolution Department",
    role_category: "Counsel",
    focus: "Litigation & Arbitration",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: "30+ Years",
    display_order: 15,
    bio: [
      "Hamdy Omar is a Counsel at Abdallah & Abu El Naga Legal Advisors — a seasoned legal professional with extensive experience in litigation, arbitration, and legal advisory services spanning over three decades.",
      "He holds a Master of Laws (LL.M.) from Cairo University and has practiced in commercial, civil, administrative, and intellectual property lawsuits since 1993.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "650c0cf6-4694-4755-a7c4-009c2630a7dd",
    name: "Basma Abdallah",
    title: "Chief Financial Officer",
    role_category: "Corporate",
    focus: "Finance & Operations",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 16,
    bio: [
      "Basma Abdallah serves as Chief Financial Officer, overseeing the firm's financial operations and administrative excellence.",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: "c5f469e6-bc09-4b0c-8ef4-c38ff795993f",
    name: "Mohamed Samir",
    title: "Accountant",
    role_category: "Corporate",
    focus: "Accounting & Finance",
    photo_url: null,
    linkedin_url: null,
    email: null,
    experience: null,
    display_order: 17,
    bio: [
      "Mohamed Samir serves as Accountant, supporting the firm's financial management and reporting.",
    ],
    created_at: "",
    updated_at: "",
  },
].map(enrichMember);

const mergeWithRemote = (remote: TeamMember[]): TeamMember[] => {
  const remoteById = new Map(remote.map((m) => [m.id, m]));
  const remoteByName = new Map(remote.map((m) => [normalizeName(m.name), m]));

  const merged = STATIC_TEAM_ROSTER.map((staticMember) => {
    const live =
      remoteById.get(staticMember.id) ??
      remoteByName.get(normalizeName(staticMember.name));

    if (!live) return staticMember;

    return enrichMember({
      ...staticMember,
      ...live,
      bio: live.bio?.length ? live.bio : staticMember.bio,
      focus: live.focus || staticMember.focus,
      experience: live.experience || staticMember.experience,
      email: live.email || staticMember.email,
      linkedin_url: live.linkedin_url || staticMember.linkedin_url,
      title: live.title || staticMember.title,
      role_category: live.role_category || staticMember.role_category,
      display_order: live.display_order ?? staticMember.display_order,
      photo_url:
        isValidTeamPhotoUrl(live.photo_url)
          ? live.photo_url
          : staticMember.photo_url ?? PARTNER_PHOTOS_BY_NAME[live.name] ?? null,
    });
  });

  remote.forEach((member) => {
    const exists = merged.some(
      (m) => m.id === member.id || normalizeName(m.name) === normalizeName(member.name)
    );
    if (!exists) merged.push(enrichMember(member));
  });

  return merged.sort((a, b) => a.display_order - b.display_order);
};

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured) {
    return STATIC_TEAM_ROSTER;
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data?.length) {
      return STATIC_TEAM_ROSTER;
    }

    return mergeWithRemote(data);
  } catch {
    return STATIC_TEAM_ROSTER;
  }
}

export async function fetchTeamMemberById(id: string): Promise<TeamMember | null> {
  const staticMember = STATIC_TEAM_ROSTER.find((m) => m.id === id);
  if (!isSupabaseConfigured) {
    return staticMember ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return staticMember ?? null;
    }

    const merged = mergeWithRemote([data]);
    return merged.find((m) => m.id === id) ?? merged[0] ?? null;
  } catch {
    return staticMember ?? null;
  }
}

export async function fetchHomepageLeaders(limit = 4): Promise<TeamMember[]> {
  const members = await fetchTeamMembers();
  const partners = members.filter((m) => m.role_category === "Partner");
  const others = members.filter((m) => m.role_category !== "Partner");
  return [...partners, ...others].slice(0, limit);
}

export const getMemberInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
