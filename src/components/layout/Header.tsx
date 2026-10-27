"use client";
import { useState } from "react";
import { Brand } from "../Brand";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#inicio" aria-label="Munare Arquitetura — início">
          <Brand />
        </a>
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-principal"
        >
          {open ? "Fechar −" : "Menu +"}
        </button>
        <nav
          id="menu-principal"
          aria-label="Navegação principal"
          className={open ? "navigation is-open" : "navigation"}
        >
          {[
            ["Projetos", "projetos"],
            ["Sobre", "sobre"],
            ["Serviços", "servicos"],
            ["Contato", "contato"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contato">
          Fale conosco <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
