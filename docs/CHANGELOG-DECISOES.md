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
13. **Sem telefones de serviços:** os assuntos sobre violência e proteção não trazem números de telefone, para não publicar dado desatualizado. Indicam buscar polícia/emergência e a rede oficial local. *(Superada na parte de canais de ajuda pela decisão 26: os telefones aparecem na seção "Onde buscar ajuda", não no texto dos assuntos.)*
14. **Dispositivos "a conferir":** onde o artigo exato não foi confirmado, o texto indica "a conferir" e a pendência aparece em `docs/relatorios/referencias-pendentes.md`.

15. **Orientadores (2026-11-20):** de 3 para 13 guias, um por área (consumo, previdência ×2, trabalho, saúde, moradia, família, trânsito, mulheres, pessoa idosa, pessoa com deficiência). Os resultados reaproveitam passos, documentos e resposta rápida do assunto ligado, para manter consistência. Os guias aparecem agrupados por categoria e também nas páginas de categoria.
16. **Guia de violência contra a mulher:** começa perguntando sobre risco imediato, não traz telefones e tem botão "Sair rapidamente" (leva a um site neutro). Revisar com especialista em atendimento a mulheres antes de validar.

17. **Publicação (2026-11-22):** após a revisão dos roteiros `docs/validacao/01–13`, os 93 assuntos e 13 guias foram reescritos e marcados como `published`/`approved` (`lastReviewed` 2026-11-20). `draftVisibility` passou a `"hide"`; faixa e etiqueta de "em revisão" saíram da interface. Afirmações que não puderam ser confirmadas em fonte oficial foram retiradas do texto (por exemplo, itens da ANS, Banco Central, Anatel e jurisprudência).
18. **Normas recentes tratadas:** EC 141/2026 (jornada de 42 h em 2 meses e 40 h em 1 ano após a publicação; repouso de 2 dias) e Lei 15.371/2026 (licença-paternidade a partir de 2027) aparecem em TRA-003, TRA-008 e TRA-013. As datas em dezembro de 2026 e 2027 derivam da publicação de 16/10/2026.
19. **Divergências resolvidas pela lei:** EDU-005 cita a Lei 7.853/1989, art. 8º, I (não a LBI); TRA-010 mantém o inciso V do art. 3º da Lei 7.998; PRE-004 usa a EC 103, art. 23; MOR-006 segue os arts. 1.336–1.337 do Código Civil; CON-015 cita os arts. 104-A a 104-C do CDC.

20. **Hospedagem (2026-11-22):** o site é publicado no GitHub Pages, em https://plgluizguedes.github.io/cade-meu-direito/. Como é um site de projeto (subcaminho), o build escreve o prefixo `/cade-meu-direito` (`basePath` em `site.json`, ou a variável `BASE_PATH`) em todas as páginas e o frontend o aplica em links, rotas e carregamento de dados. O fluxo `.github/workflows/pages.yml` valida, testa, gera o build e publica a cada push em `main`. O e-mail de contato não é divulgado por ora (`contactEmail` fica nulo).

21. **Busca (2026-11-23):** a busca da enciclopédia passou a tolerar erros de digitação (troca, falta ou sobra de letra, e sons parecidos como s/z), aceitar palavra pela metade, achar variações da mesma palavra (pagou, pagar, pagamento) e entender expressões equivalentes ("mandaram embora" = demitido), a partir dos grupos em `src/data/search.json`. É determinística e roda no navegador, sem IA, sem servidor e sem enviar o que a pessoa digita a ninguém. Só mostra resultado quando a busca é bem coberta; assunto que o site não tem (ex.: "acúmulo de função") dá lista vazia.
22. **Sem botão "Sugerir tema" (2026-11-23):** avaliado e descartado. Sem servidor, o site não grava nada; o caminho possível (issue do GitHub) exigiria conta no GitHub de quem sugere, o que não faz sentido para o público. O site continua sem registrar buscas. Se no futuro houver registro das buscas sem resultado, será por um serviço próprio, só com o termo e a contagem, com aviso na página de Privacidade.

23. **Recursos de português avaliados para a busca (2026-11-23):** OpenWordNet-PT (CC BY 4.0), Unitex-PT-BR, PT-LexicalSemantics, LexicalResourcesPT e EticaAI/linguistic-datasets. Testado o OpenWordNet-PT como dicionário geral de sinônimos (reduzido às palavras do site): quase não melhorou os resultados e trouxe ruído (palavras com vários sentidos levavam a assuntos errados), então **não foi incluído**. O dicionário de equivalências próprio (`src/data/search.json`), escrito para os assuntos do site, rende mais. Os demais recursos (formas de palavras, embeddings) pesam megabytes ou têm licença menos clara, o que não compensa para um site estático para internet fraca. Pode ser reavaliado se surgir necessidade.
24. **Frases naturais (2026-11-23):** a busca aceita frases com uma palavra que o site não conhece (ex.: "fui despedido ontem") quando há um acerto exato e específico; palavras de enchimento (ontem, hoje, agora…) são ignoradas. Medido com 44 frases de exemplo: o assunto certo entre os 3 primeiros em 91% dos casos (era 70% sem essa regra).

25. **Novos grupos de expressões (2026-11-23):** incorporadas listas de três IAs (Gemini, ChatGPT, DeepSeek), após limpeza: 60 repetidas removidas, 5 descartadas (números de telefone do 180, "sem garantia", "pix que não reconheço" e "mandei dinheiro para pessoa errada", que são casos de outra natureza), e expressões duplicadas entre grupos mantidas só na primeira ocorrência. Resultado: 255 grupos. Em 20 frases novas de teste, o assunto certo passou de 12 para 16 vezes em 1º lugar.

26. **Contatos de órgãos oficiais (2026-11-23):** cada categoria traz, no campo `contatos` de `categories.json`, os canais nacionais ligados ao tema (telefone quando existe, horário, uso e link para o site do órgão). Aparecem na página da categoria e na página de cada assunto. Decisão do responsável: incluir os contatos **sem data de verificação**, com o link do site de cada órgão. Os dados vieram de páginas oficiais consultadas em 23/11/2026. Fora da lista ficam os órgãos locais (Procon, Detran, Defensoria, Ministério Público, Conselho Tutelar, delegacia da mulher), que dependem do estado ou do município e ainda não têm link oficial conferido, e o telefone 190 (sem página oficial nacional conferida). Moradia não tem canal nacional e não mostra a seção.

## Precisam de aprovação / dados do responsável

- Licença do código (nenhum `LICENSE` foi adicionado; docs/10 §5).
- Canal de contato público (acessibilidade e correções), quando o responsável decidir divulgar um.
- Autorização de fontes locais (Nunito Sans, Atkinson Hyperlegible) com licença.
- Revisão jurídica por profissional (advogado ou Defensoria) como checagem adicional, sobretudo EC 141/2026 (arts. 6º e 8º), Lei 15.371/2026 e PRE-004.
- Teste de compreensão com público de 65–70 anos e auditoria com leitor de tela (docs/09 §4 e §6) ainda não realizados.

27. **Aba "Números úteis" (2026-11-23):** página própria no menu, com os números nacionais de três dígitos (190, 191, 192, 193, 180, 100, 188, 135, 136). Excluídos 911 e 112 (a Anatel informa que valem só para celular e só para a polícia). Números estaduais e municipais ficam de fora. Os de 190 e 193 são atendidos pelos estados, por isso não têm site nacional. Os números 190, 191 e 193 ainda precisam de confirmação em página oficial nacional antes da validação final.

28. **Contatos sem telefone para órgãos com números que mudam (2026-11-24):** decisão do responsável. Em `categories.json`, ANS, Anatel, INSS e ANPD aparecem só com o link do site (`canal: "Site"`), sem telefone nem horário. Altera a decisão 26 nesses quatro órgãos. O telefone fica apenas nos números estáveis 180, 100, 188 e 136. Não alterados: a aba "Números úteis" (decisão 27), que segue com o 135 do INSS, e o SAMU 192 em Saúde, por ser serviço de emergência e não estar na lista de órgãos. Confirmar se o 192 entra na mesma regra.
29. **Órgãos locais (2026-11-24):** confirmada a decisão 26. Procon, Detran, Defensoria, Ministério Público, Conselho Tutelar e delegacia da mulher ficam de fora da seção de contatos, sem link por estado. Só entram órgãos nacionais.

30. **Consumidor: 21 rascunhos (2026-11-25).** Seleção de 22 assuntos aprovada pelo responsável, condicionada à conferência nas fontes oficiais. Gravados como `draft` (`reviewStatus: pending_review`), com IDs CON-021 a CON-042 na ordem aprovada (não na numeração das IAs). CON-036 (multa de fidelidade) não foi criado: sem base legal confirmada. Os rascunhos não aparecem no site público (`draftVisibility: "hide"`); o site segue com 93 assuntos publicados.
    - **Fontes:** acervo `ctresb/leis` (texto das leis) e páginas oficiais quando abertas. Em parte da sessão, Planalto, ANAC e acórdãos do STJ não puderam ser abertos. Por isso muitas referências estão `pending_verification` e sem `officialUrl`.
    - **Texto retirado sem fonte:** prazos que a IA deu e não foram confirmados (MED 80/7/96 h, prazos de bagagem, prazos de telefonia móvel, 5/10 dias úteis da ANEEL), jurisprudência não conferida (REsp 1.978.268, 2.164.130, 1.661.913; AREsp 3.226.209, 3.309.764), Res. BCB 518/2025, Res. Anatel 730/2020, multa de fidelidade e percentuais de multa.
    - **Pendências antes de publicar:**
      - CON-021: prazos do MED no Manual Operacional do DICT; Res. BCB 493/2025 lida só em cópia de terceiro.
      - CON-025: situação atual do Tema 1264 do STJ.
      - CON-027: REN ANEEL 1.000/2021 (PDF oficial não aberto).
      - CON-028: dia exato da vigência da Lei 15.040/2024 (10 ou 11/12/2025).
      - CON-029: Res. BCB 96/2021, art. 12, não localizada; Res. CMN 5.261/2025 não aberta.
      - CON-032: Decreto 5.903/2006, arts. 1º e 2º.
      - CON-033: Lei 13.455/2017 e Lei 10.962/2004, art. 5º-A, no Planalto.
      - CON-035: norma da Anatel sobre portabilidade móvel não identificada.
      - CON-037: conceito de "alteração relevante" e normas complementares do Ministério da Justiça (art. 23), não consultadas.
      - CON-038 a CON-040: páginas do Planalto (CDC, Lei 11.771, Lei 11.795).
      - CON-039: **não publicar** até conferir a Res. ANAC 400/2016, arts. 32 e 33.
      - CON-041: texto da Súmula 130 lido no acervo; a página do STJ não exibiu o texto.
      - CON-042: Planalto do CDC (art. 18, §1º e §2º lidos no acervo).
31. **Busca e testes (2026-11-25):** 21 grupos novos em `search.json` (expressões já existentes não foram repetidas). Dois testes de conteúdo foram ajustados para aceitar rascunhos (`draft`/`pending_review`) fora do modo público; o modo estrito continua mostrando só os publicados. Os 75 testes passam.
32. **Publicação dos assuntos de Consumidor (2026-11-25):** 20 dos 21 rascunhos conferidos nas páginas oficiais (Planalto, STJ, ANAC) e publicados (CON-021 a CON-034 e CON-037 a CON-042). Site passa de 93 para 113 artigos.
    - **Referências retiradas por não confirmadas:** Res. BCB 1/2020 e prazos do MED (CON-021); Tema 1264 do STJ (CON-025); REN ANEEL 1.000/2021 (CON-027); Res. BCB 96/2021 (CON-029).
    - **Continua rascunho:** CON-035 (portabilidade do número), até identificar a norma da Anatel em vigor.
    - **CON-036** não foi criado (assunto 16 foi coberto por CON-032 e CON-033 conforme a seleção).
    - Textos de CON-039 sem prazos numéricos (os prazos sugeridos pelas IAs foram descartados).
33. **Telefones mantidos (2026-11-26):** o SAMU 192 continua com telefone nos contatos de Saúde, e o 135 (INSS) continua na página "Números úteis". Nenhuma alteração no site.
34. **Trabalho: acúmulo de função (2026-11-26):** novo TRA-015 publicado a pedido do responsável (pesquisa, conferência e publicação na mesma etapa).
    - **Conferido:** CLT arts. 456 (parágrafo único), 460 e 468 no texto do Planalto (via acervo); Tema 128 do TST (IRR), tese: motorista de ônibus urbano que também cobra passagens não tem direito a acréscimo salarial (acórdão de 28/04/2025, lido no PDF do TRT3).
    - **Não afirmado por falta de fonte oficial:** requisitos gerais, valores ou percentuais do "plus salarial"; tese geral do TST para outras funções. Verificado que a CLT não usa a expressão "acúmulo de função".
    - Grupo de busca adicionado. Dois testes ajustados: "acúmulo de função" deixou de ser exemplo de assunto inexistente (trocado por "astronauta marciano") e a busca "salar" passou a aceitar TRA-001 entre os 5 primeiros.
