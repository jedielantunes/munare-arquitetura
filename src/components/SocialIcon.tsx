export function SocialIcon({
  name,
}: {
  name: "whatsapp" | "instagram" | "youtube";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      {name === "whatsapp" && (
        <>
          <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" />
          <path d="m8.1 7.4 1.5 2.5-1 1.1c1 1.9 2.1 3 4.1 3.8l1-1.2 2.6 1.3c.1 1.8-1.1 2.3-2.3 2.1-3.6-.7-6.6-3.5-7.4-6.9-.2-1.3.2-2.3 1.5-2.7Z" />
        </>
      )}
      {name === "instagram" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "youtube" && (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="m10 9 6 3-6 3V9Z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
