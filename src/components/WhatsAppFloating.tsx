"use client";
import { useEffect, useState } from "react";
import { whatsappConversationUrl } from "@/config/site";
import { SocialIcon } from "./SocialIcon";

export default function WhatsAppFloating() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    // Recolher o atalho para preservar os CTAs e os canais da seção de contato.
    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleTargets.add(entry.target);
        else visibleTargets.delete(entry.target);
      }
      setHidden(visibleTargets.size > 0);
    });
    document
      .querySelectorAll(".hero-actions, #contato, .final-cta, .footer")
      .forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return (
    <a
      className="whatsapp-floating"
      data-hidden={hidden}
      href={whatsappConversationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar sobre um projeto com a Munare pelo WhatsApp (abre em nova aba)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <SocialIcon name="whatsapp" />
    </a>
  );
}
