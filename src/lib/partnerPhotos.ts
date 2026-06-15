/** Canonical public partner portraits — always use these, never stock placeholders */
export const PARTNER_PHOTO_URLS = {
  ahmedAbdallah:
    "https://ietujybcqapwytzyipuv.supabase.co/storage/v1/object/public/team-photos/315d98eb-ad92-4699-99bc-cce80577853a.jpeg",
  mohamedAbuElNaga:
    "https://ietujybcqapwytzyipuv.supabase.co/storage/v1/object/public/team-photos/38d631f0-6b4b-4584-95d9-92faade270de.jpg",
} as const;

export const PARTNER_PHOTOS_BY_NAME: Record<string, string> = {
  "Dr. Ahmed Abdallah": PARTNER_PHOTO_URLS.ahmedAbdallah,
  "Mr. Mohamed Abu El Naga": PARTNER_PHOTO_URLS.mohamedAbuElNaga,
};
