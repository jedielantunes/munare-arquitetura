import { Brand } from "../Brand";
import { SocialLinks } from "../SocialLinks";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href="#inicio" aria-label="Munare Arquitetura — início">
              <Brand />
            </a>
            <p className="eyebrow">Arquitetura · Interiores · Conceito</p>
          </div>
          <div className="footer-contact">
            <a href="mailto:Munareconceito@gmail.com">
              Munareconceito@gmail.com ↗
            </a>
            <SocialLinks compact />
          </div>
          <p className="footer-phrase">
            Espaços pensados em harmonia com quem vive neles.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Munare Arquitetura</span>
        </div>
      </div>
    </footer>
  );
}
