import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { resolveTeamPhoto, getMemberInitials } from "@/lib/teamData";
import partnerMale from "@/assets/partner-male.jpg";
import partnerFemale from "@/assets/partner-female.jpg";
import { PARTNER_PHOTOS_BY_NAME } from "@/lib/partnerPhotos";

interface TeamMemberPhotoProps {
  name: string;
  photoUrl?: string | null;
  roleCategory?: string;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
}

const LAST_RESORT_PARTNER_FALLBACK: Record<string, string> = {
  "Dr. Ahmed Abdallah": partnerMale,
  "Mr. Mohamed Abu El Naga": partnerFemale,
};

const TeamMemberPhoto = ({
  name,
  photoUrl,
  roleCategory,
  alt,
  className,
  fallbackClassName,
}: TeamMemberPhotoProps) => {
  const resolved = resolveTeamPhoto(name, photoUrl, roleCategory);
  const [src, setSrc] = useState(resolved);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSrc(resolveTeamPhoto(name, photoUrl, roleCategory));
    setFailed(false);
  }, [name, photoUrl, roleCategory]);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-burgundy/10 text-burgundy font-serif font-bold",
          fallbackClassName ?? className
        )}
        aria-label={alt ?? name}
      >
        {getMemberInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? name}
      className={className}
      loading="lazy"
      onError={() => {
        const canonical = PARTNER_PHOTOS_BY_NAME[name];
        if (canonical && src !== canonical) {
          setSrc(canonical);
          return;
        }
        const lastResort = LAST_RESORT_PARTNER_FALLBACK[name];
        if (lastResort && src !== lastResort) {
          setSrc(lastResort);
          return;
        }
        setFailed(true);
      }}
    />
  );
};

export default TeamMemberPhoto;
