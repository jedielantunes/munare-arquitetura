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
- `SITE_URL`: URL pública final, usada para resolver imagens de Open Graph. Em desenvolvimento pode permanecer `http://localhost:3000`.

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
