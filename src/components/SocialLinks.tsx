import { site } from "@/config/site";
import { SocialIcon } from "./SocialIcon";
const channels = [
  {
    icon: "instagram",
    name: "Instagram",
    detail: "@munareprojetos",
    href: site.instagram,
  },
  {
    icon: "youtube",
    name: "YouTube",
    detail: "Munare Arquitetura",
    href: site.youtube,
  },
  {
    icon: "whatsapp",
    name: "WhatsApp",
    detail: "Fale conosco",
    href: site.whatsapp,
  },
] as const;
export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`social-links ${compact ? "compact" : ""}`}>
      {channels.map((channel) => (
        <a
          key={channel.icon}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${channel.name} — ${channel.icon === "whatsapp" ? site.phone : channel.detail} (abre em nova aba)`}
        >
          <SocialIcon name={channel.icon} />
          <span className="social-label">
            <span>{channel.name}</span>
            <small>
              {compact && channel.icon === "whatsapp"
                ? site.phone
                : channel.detail}
            </small>
          </span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
