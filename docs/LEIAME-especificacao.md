# Cadê Meu Direito? — Documentação completa do projeto

**Slogan:** Seus direitos, sem juridiquês.  
**Objetivo:** orientar pessoas no entendimento de direitos brasileiros em situações cotidianas, com linguagem simples, referências rastreáveis e caminhos práticos.

Este pacote é a especificação de produto, conteúdo, experiência visual, arquitetura técnica, dados, qualidade e validação para a primeira versão do site.

## Como usar este pacote

1. Envie à IA de desenvolvimento o ZIP extraído (ou os arquivos Markdown) e o repositório de apoio: <https://github.com/ctresb/leis>.
2. Peça que leia **todos** os documentos antes de alterar ou criar arquivos.
3. A IA deve primeiro apresentar um plano de implementação e uma lista de dúvidas/inconsistências. Só depois deve implementar.
4. A IA deve criar os conteúdos jurídicos como **rascunhos pendentes de validação**, nunca como conteúdo jurídico aprovado.
5. Depois da implementação, revise o código e faça uma auditoria jurídica com as fontes oficiais antes de publicar.

## Índice

| Arquivo | Conteúdo |
|---|---|
| `docs/00-visao-geral-e-regras.md` | propósito, princípios, limites e regras obrigatórias |
| `docs/01-escopo-e-mapa-do-site.md` | páginas, navegação, categorias e funcionalidades |
| `docs/02-identidade-visual-e-ux.md` | direção de arte, cores, tipografia, componentes e layouts |
| `docs/03-inventario-editorial-e-juridico.md` | catálogo inicial de temas e matriz de pesquisa legal |
| `docs/04-padrao-de-conteudo-e-validacao-juridica.md` | modelo editorial, fontes, revisão e status |
| `docs/05-orientadores-interativos.md` | fluxos, regras, resultados e requisitos dos guias |
| `docs/06-arquitetura-tecnica-e-estrutura.md` | stack, pastas, build, hospedagem e padrões |
| `docs/07-modelos-de-dados-e-exemplos.md` | esquemas JSON e exemplos |
| `docs/08-acessibilidade-seguranca-e-privacidade.md` | acessibilidade, segurança e privacidade |
| `docs/09-testes-aceite-e-implantacao.md` | critérios de aceite, testes e deploy |
| `docs/10-plano-de-execucao-e-prompt-para-ia.md` | fases, entregáveis e instrução para a IA |

## Regra essencial sobre o acervo legislativo

O repositório `ctresb/leis` é um **índice/acervo auxiliar de pesquisa**, não um selo de validade jurídica. O README do próprio repositório informa que os textos são conversões automáticas e OCR, recomenda conferir a fonte indicada e ressalta que o acervo não substitui a publicação oficial. Também existem lacunas de cobertura e normas de diferentes esferas. Portanto, não importar tudo, não tratar OCR como infalível e não publicar conteúdo sem conferência em fonte oficial.

## Estado atual da documentação

Este pacote define o escopo e o plano editorial inicial. As referências legislativas indicadas são **pistas de pesquisa**, não parecer jurídico nem declaração de vigência. A equipe deverá confirmar texto vigente, alterações, regulamentação, jurisprudência relevante, abrangência territorial e data de revisão antes de publicar cada página.
