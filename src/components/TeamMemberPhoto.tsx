import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveTeamPhoto, getMemberInitials } from "@/lib/teamData";

interface TeamMemberPhotoProps {
  name: string;
  photoUrl?: string | null;
  roleCategory?: string;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
}

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
        const partnerFallback = resolveTeamPhoto(name, null, roleCategory);
        if (partnerFallback && src !== partnerFallback) {
          setSrc(partnerFallback);
          return;
        }
        setFailed(true);
      }}
    />
  );
};

export default TeamMemberPhoto;
