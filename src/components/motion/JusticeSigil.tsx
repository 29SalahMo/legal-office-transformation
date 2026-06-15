/** Lightweight CSS/SVG scale — replaces heavy WebGL on mobile & below-fold */
const JusticeSigil = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sigilGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7A1520" />
        <stop offset="100%" stopColor="#520B10" />
      </linearGradient>
    </defs>
    <rect x="54" y="95" width="12" height="38" rx="2" fill="url(#sigilGold)" opacity="0.9" />
    <ellipse cx="60" cy="92" rx="18" ry="5" fill="url(#sigilGold)" opacity="0.85" />
    <line x1="18" y1="42" x2="102" y2="42" stroke="url(#sigilGold)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="38" r="5" fill="url(#sigilGold)" />
    <line x1="18" y1="42" x2="18" y2="68" stroke="url(#sigilGold)" strokeWidth="1.5" opacity="0.7" />
    <line x1="102" y1="42" x2="102" y2="68" stroke="url(#sigilGold)" strokeWidth="1.5" opacity="0.7" />
    <path
      d="M8 72 Q18 58 28 72 L32 78 Q18 66 8 78 Z"
      fill="url(#sigilGold)"
      opacity="0.75"
    />
    <path
      d="M112 72 Q102 58 92 72 L88 78 Q102 66 112 78 Z"
      fill="url(#sigilGold)"
      opacity="0.75"
    />
    <ellipse cx="60" cy="128" rx="28" ry="4" fill="#520B10" opacity="0.12" />
  </svg>
);

export default JusticeSigil;
