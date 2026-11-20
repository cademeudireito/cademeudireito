# Cadê Meu Direito?

> Seus direitos, sem juridiquês.

Site estático e gratuito que explica direitos brasileiros do dia a dia em linguagem simples, com referências a fontes oficiais, busca local e orientadores interativos. Especificação completa em [`docs/`](docs/LEIAME-especificacao.md).

## Estado atual

- 13 categorias, **93 assuntos em rascunho** e **3 guias em rascunho**.
- **Nenhum conteúdo jurídico foi validado.** Por decisão do responsável, o site exibe os rascunhos com faixa e etiqueta de "em revisão" e `noindex`. Para exibir só o que for validado, use `draftVisibility: "hide"` em `src/data/site.json` ou `npm run build:strict`. Veja [`docs/CHANGELOG-DECISOES.md`](docs/CHANGELOG-DECISOES.md).

## Requisitos

Node.js 20+ (sem dependências npm).

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor local em `localhost:5173`, conforme `draftVisibility`. `-- --strict` mostra só validados. |
| `npm run validate` | Valida JSON, IDs, slugs, categorias, referências e guias. |
| `npm test` | Testes do motor de guias, busca e regras de publicação. |
| `npm run build` | Build em `dist/` conforme `draftVisibility`. |
| `npm run build:strict` | Build em `dist-strict/` somente com conteúdo `published`. |
| `npm run preview` | Serve `dist/` em `localhost:4173` (`-- --strict` para o estrito). |
| `LEIS_DIR=... node scripts/pesquisa-leis.mjs` | Confere artigos citados no acervo [ctresb/leis](https://github.com/ctresb/leis) e gera `research/dossie/`. `--check` só confere. |
| `npm run report` | Gera relatórios em `docs/relatorios/`. |

## Estrutura

```
src/
  index.html, main.js          shell e roteador
  components/                  Header, Footer, SearchBar, cards, Breadcrumbs, QuickAnswer, LegalReference…
  pages/                       Home, Encyclopedia, Category, Article, GuideIndex, Guide, StaticPage
  services/                    content.js (regras e validação), search.js, guideEngine.js, router.js, contentLoader.js
  data/                        categories.json, site.json, articles/, guides/, pages/
  styles/                      tokens, global, layout, components, responsive
scripts/                       build, dev, validate, report, pesquisa-leis
research/                      normas.json (registro) e dossie/ (artigos citados, extraídos do acervo)
tests/                         node:test
public/                        favicon, robots, _headers
```

## Como publicar um conteúdo

1. Pesquise e confira a norma em fonte oficial (docs/04); o dossiê em `research/dossie/` ajuda, mas não valida.
2. Preencha as referências: `officialUrl`, `status: "verified"`, `checkedAt`.
3. Registre `lastReviewed`, `reviewStatus: "approved"` e mude `status` para `published`.
4. `npm run validate` precisa passar; guias só podem ser publicados depois dos artigos que referenciam.

## Deploy (Cloudflare Pages ou equivalente)

- Build command: `npm run build` · Output directory: `dist` · Node 20+.
- Defina `siteUrl` em `src/data/site.json` para gerar `sitemap.xml` e `canonical`.
- O build gera um `index.html` por rota e `404.html`; `public/_headers` traz cabeçalhos de segurança.
- Antes de publicar, siga o checklist de `docs/09-testes-aceite-e-implantacao.md` §9.

## Privacidade e segurança

Sem cookies, analytics, formulários, backend ou IA. Conteúdo JSON é sempre renderizado como texto (nunca HTML). CSP restritiva em `index.html`.
