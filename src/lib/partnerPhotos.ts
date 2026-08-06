import ahmedStudioPhoto from "@/assets/team-ahmed.png";
import mohamedStudioPhoto from "@/assets/team-mohamed.png";

/** Canonical executive studio partner portraits */
export const PARTNER_PHOTO_URLS = {
  ahmedAbdallah: ahmedStudioPhoto,
  mohamedAbuElNaga: mohamedStudioPhoto,
} as const;

export const PARTNER_PHOTOS_BY_NAME: Record<string, string> = {
  "Dr. Ahmed Abdallah": PARTNER_PHOTO_URLS.ahmedAbdallah,
  "Mr. Mohamed Abu El Naga": PARTNER_PHOTO_URLS.mohamedAbuElNaga,
};
