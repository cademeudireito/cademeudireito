# Registro de decisões e pendências de aprovação

Conforme `docs/00-visao-geral-e-regras.md` §6 e `docs/10-plano-de-execucao-e-prompt-para-ia.md` §5.

## Decisões tomadas na implementação (revisar)

1. **Sem Vite.** O ambiente de construção não tinha acesso ao npm, então não foi possível instalar nem testar o Vite. O site usa HTML/CSS/JS (módulos ES) e JSON, com scripts Node próprios e **zero dependências** (`scripts/build.mjs`, `dev.mjs`). A estrutura de pastas segue `docs/06`. Migrar para Vite depois é simples, mas é mudança de stack e exige aprovação.
2. **Execução sem plano prévio.** A doc pede um plano antes de codar; o responsável pediu para seguir direto e entregar em partes. Decisões abaixo ficam registradas aqui.
3. **Publicação bloqueada por padrão.** Os 30 assuntos e os 3 guias estão como `draft`/`pending_review`. O build público (`npm run build`) **não contém nenhum rascunho**, então a enciclopédia e o orientador aparecem vazios com mensagem de "em revisão". `npm run build:preview` e `npm run dev` incluem rascunhos com faixa vermelha, `noindex` e etiqueta de situação, só para revisão interna.
4. **Gate de publicação no validador.** Um item só pode virar `published` se `reviewStatus = approved`, houver `lastReviewed`, todas as referências estiverem `verified` com URL oficial e `checkedAt`, e (para guias) os artigos ligados estiverem publicados.
5. **Textos dos rascunhos.** Redigidos de forma cautelosa a partir do roteiro de `docs/03`. Sem prazos numéricos, sem afirmações absolutas. Dispositivos marcados "a conferir" não foram verificados. Só as URLs que constam na documentação (CDC e Decreto 7.962/2013) foram registradas; as demais ficam sem link específico, com remissão ao portal do Planalto.
6. **Repositório `ctresb/leis` não foi consultado** (acervo auxiliar). Nada foi importado dele.
7. **Fontes e ícones.** Nunito Sans/Atkinson não estavam disponíveis localmente; o CSS usa a pilha de fontes do sistema como fallback (sem Google Fonts). Os ícones são traços SVG próprios, não Lucide.
8. **Roteamento.** History API com um `index.html` pré-gerado por rota e `404.html`, funcionando em qualquer hospedagem estática. Hospedagem assume a raiz do domínio.
9. **CSP via meta tag** e `public/_headers` (formato Cloudflare Pages).

## Precisam de aprovação / dados do responsável

- Licença do código (nenhum `LICENSE` foi adicionado; docs/10 §5).
- Hospedagem definitiva e `siteUrl` em `src/data/site.json` (necessário para sitemap e canonical).
- E-mail real de contato (acessibilidade e correções) e URL pública do repositório (rodapé).
- Autorização de fontes locais (Nunito Sans, Atkinson Hyperlegible) com licença.
- Validação jurídica humana de cada assunto antes de qualquer `published`.
- Teste de compreensão com público de 65–70 anos e auditoria com leitor de tela (docs/09 §4 e §6) ainda não realizados.
