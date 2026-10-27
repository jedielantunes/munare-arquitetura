# Munare Arquitetura

Primeira etapa: landing page institucional em Next.js App Router, TypeScript e Tailwind CSS. Sem banco, CMS ou páginas internas.

## Desenvolvimento

Requer Node.js 20.9 ou superior, compatível com a versão instalada do Next.js.

```sh
npm install
npm run dev
```

Abra http://localhost:3000. Para produção: `npm run build` e `npm start`. O formulário exige um servidor Next.js; não usar exportação estática.

## Formulário

`POST /api/contact` valida os dados no servidor e usa a API HTTP do [Resend](https://resend.com/docs/api-reference/emails/send-email) por `fetch`, sem SDK. O destinatário fixo é **Munareconceito@gmail.com**; o e-mail do visitante fica no `reply_to`.

Copie `.env.example` para `.env.local` e preencha:

- `RESEND_API_KEY`: chave privada com permissão de envio.
- `CONTACT_FROM`: nome e endereço de remetente autorizado em um domínio verificado no Resend, por exemplo `Munare Arquitetura <contato@seu-dominio.com.br>`. O Gmail de destino não precisa ser o remetente. O remetente de testes do Resend possui restrições e não substitui a verificação do domínio em produção.

Reinicie o servidor após alterar as variáveis. Na hospedagem, configure as mesmas variáveis privadas pelo painel do provedor. Nunca use prefixo `NEXT_PUBLIC_` para a chave. Sem chave/remetente a rota retorna **503**, e a interface oferece e-mail/WhatsApp. Só mostra sucesso após confirmação da API; aceitação pelo provedor não garante chegada na caixa de entrada.

Há validação de tamanho, campos e assunto, verificação de origem e campo invisível para reduzir spam automatizado. Não são armazenadas mensagens ou registrados seus conteúdos no projeto. O provedor de e-mail processa os dados para envio; ajuste a retenção na conta Resend conforme necessário. Em produção, recomenda-se limitar requisições no provedor de hospedagem/WAF; a rota não implementa rate limit distribuído.

## Conteúdo e identidade

- `src/data/projects.ts`: projetos explicitamente ilustrativos; substituir por trabalhos reais e descrições autorizadas.
- `src/data/services.ts`: serviços e textos curtos.
- `public/projects/`: fotografias temporárias locais e suas fontes em `README.md`.
- `public/brand/logomunare.png`: cópia fiel do arquivo fornecido. O enquadramento circular via CSS elimina apenas a margem branca ao exibir o símbolo; o arquivo e seu desenho não foram alterados.
- `src/components/home/`: um componente por grande seção.
- `src/components/layout/`: cabeçalho responsivo e rodapé.
- `src/app/globals.css`: paleta, tipografia, estilos editoriais e adaptações responsivas.

Cormorant Garamond e Manrope são carregadas por `next/font` e servidas pelo próprio Next.js. O build inicial precisa de acesso às fontes Google. SVGs inline das redes sociais dispensam biblioteca de ícones. `Ver projeto` é um elemento visual com indicação `Em breve`, sem navegação fictícia.

## Validações

```sh
npm run lint
npx tsc --noEmit
npm run build
node --test scripts/contact.test.mjs
```

Os testes do endpoint simulam a API de envio sem transmitir e-mails. A entrega real precisa ser verificada após configurar chave e remetente. A página usa CSS responsivo para smartphones, tablets e desktop; a validação visual manual em dispositivos continua recomendada antes da publicação.

## Refinamentos de interface e SEO

- O Header usa `position: sticky`, fundo sólido da paleta e alturas de 88px/76px. O deslocamento das âncoras acompanha essa altura com `scroll-padding-top`, sem listeners de scroll. O menu mobile fecha pelo link ou pela tecla Escape.
- Apenas o título do Hero utiliza a stack local `Yu Gothic`, `YuGothic`, `Meiryo`, sans-serif, peso 700. Nenhum arquivo dessa fonte é baixado; a aparência do fallback varia conforme o sistema.
- Instagram, YouTube e WhatsApp têm ícones SVG inline, identificação e áreas de toque nos componentes compartilhados. Os destinos oficiais estão em `src/config/site.ts`.
- O WhatsApp flutuante usa mensagem codificada, safe areas e botão de 56px. Um único `IntersectionObserver` recolhe o atalho quando os CTAs do Hero, contato, CTA final ou Footer estão visíveis; assim ele não cobre formulário nem ações principais. Não há popup, tracking ou listener de scroll.
- A URL canônica de produção está centralizada em `src/config/site.ts`; este arquivo substitui a antiga variável `SITE_URL`, inclusive se ela ainda existir na Vercel. Altere o valor central ao adotar um domínio próprio.
- A Metadata API define title, description, applicationName, publisher, category, robots, canonical, Open Graph, Twitter e os ícones existentes. Não foram atribuídos autores ou fundadores.
- `src/app/opengraph-image.tsx` gera uma composição de 1200 × 630 com a marca original via `next/og`, sem serviço externo. A imagem é compartilhada por Open Graph e Twitter.
- `robots.ts` permite rastreamento e referencia o sitemap. `sitemap.ts` lista apenas a Home. O JSON-LD usa `Organization`, apenas os dados confirmados e `sameAs` de Instagram/YouTube, sem endereço ou informações inventadas.

### Vercel

A documentação https://vercel.com/get-started.md foi consultada. Trata de onboarding de CLI, plugins e MCP; nenhuma instalação ou nova configuração de hospedagem é necessária para estes ajustes. Mantidos o build normal do Next.js e o Route Handler existente. Sem `output: "export"`, arquivo `vercel.json` ou novas variáveis obrigatórias. Publique as alterações pelo fluxo já existente do projeto; as credenciais do formulário permanecem as mesmas.

### Revisão responsiva

Revisão de regras e composição nas larguras 320, 375, 390, 430, 768, 1024 e 1440px: Hero com título fluido, menu com áreas de toque, formulário em coluna única no mobile e campos de 16px, projetos com títulos ajustáveis, processo vertical, redes empilhadas e proteção de safe areas. A inspeção visual e os cliques em dispositivos reais precisam de navegador disponível; verificações HTTP não substituem essa etapa.
