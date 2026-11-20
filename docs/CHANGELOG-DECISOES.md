# Registro de decisões e pendências de aprovação

Conforme `docs/00-visao-geral-e-regras.md` §6 e `docs/10-plano-de-execucao-e-prompt-para-ia.md` §5.

## Decisões tomadas na implementação (revisar)

1. **Sem Vite.** O ambiente de construção não tinha acesso ao npm, então não foi possível instalar nem testar o Vite. O site usa HTML/CSS/JS (módulos ES) e JSON, com scripts Node próprios e **zero dependências** (`scripts/build.mjs`, `dev.mjs`). A estrutura de pastas segue `docs/06`. Migrar para Vite depois é simples, mas é mudança de stack e exige aprovação.
2. **Execução sem plano prévio.** A doc pede um plano antes de codar; o responsável pediu para seguir direto e entregar em partes. Decisões abaixo ficam registradas aqui.
3. **Rascunhos visíveis no site (decisão do responsável, 2026-11-19).** Alterou a regra original de `docs/00` §6, que só permitia exibir conteúdo validado. Com `draftVisibility: "show"` em `src/data/site.json`, o site exibe itens `draft`, `pending_review` e `outdated`, sempre com faixa global, etiqueta "Em revisão · ainda não validado" e aviso na página. Páginas não validadas saem com `noindex` e fora do sitemap. `archived` nunca é exibido. Para voltar ao modo restrito: `"hide"` no site.json ou `npm run build:strict`. Risco: texto jurídico não validado fica acessível ao público até a validação por partes.
4. **Gate de publicação no validador.** Um item só pode virar `published` se `reviewStatus = approved`, houver `lastReviewed`, todas as referências estiverem `verified` com URL oficial e `checkedAt`, e (para guias) os artigos ligados estiverem publicados.
5. **Textos dos rascunhos.** Redigidos de forma cautelosa a partir do roteiro de `docs/03`. Sem prazos numéricos, sem afirmações absolutas. Dispositivos marcados "a conferir" não foram verificados. Só as URLs que constam na documentação (CDC e Decreto 7.962/2013) foram registradas; as demais ficam sem link específico, com remissão ao portal do Planalto.
6. **Repositório `ctresb/leis` não foi consultado** (acervo auxiliar). Nada foi importado dele.
7. **Fontes e ícones.** Nunito Sans/Atkinson não estavam disponíveis localmente; o CSS usa a pilha de fontes do sistema como fallback (sem Google Fonts). Os ícones são traços SVG próprios, não Lucide.
8. **Roteamento.** History API com um `index.html` pré-gerado por rota e `404.html`, funcionando em qualquer hospedagem estática. Hospedagem assume a raiz do domínio.
9. **CSP via meta tag** e `public/_headers` (formato Cloudflare Pages).

## Expansão com o acervo `ctresb/leis` (2026-11-20)

10. **Escopo ampliado:** de 30 para 93 assuntos e de 7 para 13 categorias (novas: Previdência e benefícios, Família, Trânsito, Mulheres e proteção contra violência, Pessoa idosa, Pessoa com deficiência). Todos em rascunho. Os temas e as normas foram escolhidos pela equipe de desenvolvimento; revise a relevância e a ordem.
11. **Pesquisa assistida:** `scripts/pesquisa-leis.mjs` (com `LEIS_DIR` apontando para um clone do acervo) confere se cada artigo citado existe na norma, grava dossiês em `research/dossie/` (texto dos artigos citados, versão do texto, se consta como revogada) e preenche `officialUrl` com o link `normas.leg.br` do cabeçalho do acervo. Essas URLs continuam `pending_verification`: o acervo é auxiliar e não valida vigência.
12. **Normas recentes:** o acervo indica alterações recentes (por exemplo, a CLT art. 392 remete à Lei 15.371/2026 e a Constituição cita a EC 141/2026 sobre jornada). Os textos dos rascunhos foram escritos de forma cautelosa e **precisam ser revisados** contra essas mudanças.
13. **Sem telefones de serviços:** os assuntos sobre violência e proteção não trazem números de telefone, para não publicar dado desatualizado. Indicam buscar polícia/emergência e a rede oficial local.
14. **Dispositivos "a conferir":** onde o artigo exato não foi confirmado, o texto indica "a conferir" e a pendência aparece em `docs/relatorios/referencias-pendentes.md`.

## Precisam de aprovação / dados do responsável

- Licença do código (nenhum `LICENSE` foi adicionado; docs/10 §5).
- Hospedagem definitiva e `siteUrl` em `src/data/site.json` (necessário para sitemap e canonical).
- E-mail real de contato (acessibilidade e correções) e URL pública do repositório (rodapé).
- Autorização de fontes locais (Nunito Sans, Atkinson Hyperlegible) com licença.
- Validação jurídica humana de cada assunto antes de qualquer `published`.
- Teste de compreensão com público de 65–70 anos e auditoria com leitor de tela (docs/09 §4 e §6) ainda não realizados.
