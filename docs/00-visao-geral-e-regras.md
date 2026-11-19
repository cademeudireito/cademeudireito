# 00 — Visão geral e regras obrigatórias

## 1. O que é

Cadê Meu Direito? é uma plataforma brasileira gratuita de educação em direitos. Traduz normas e procedimentos para linguagem cotidiana e ajuda a pessoa a identificar possíveis direitos e próximos passos.

**Promessa central:** “Você tem direitos. A gente te ajuda a entender.”

O produto não é escritório de advocacia, serviço de consulta jurídica, canal de denúncia, órgão público ou sistema de decisão automatizada.

## 2. Público

Pessoas no Brasil, de diferentes idades, escolaridades, regiões e níveis de familiaridade digital. Priorizar clareza para quem não conhece termos jurídicos e para quem usa celular como principal dispositivo.

## 3. Princípios inegociáveis

- Linguagem simples, respeitosa e sem juridiquês desnecessário.
- Informação prática, com explicação do direito e próximos passos.
- Referências rastreáveis a fontes oficiais.
- Transparência sobre incerteza, exceções e limites.
- Acessibilidade desde o início.
- Gratuidade e ausência de barreiras de cadastro.
- Neutralidade e independência editorial.
- Separação entre texto legal, interpretação explicativa e orientação prática.
- Conteúdo com data de revisão e status editorial.
- Nenhuma promessa de resultado jurídico.

## 4. O que a primeira versão inclui

1. Página inicial.
2. Enciclopédia organizada por categorias.
3. Busca textual local.
4. Página de categoria com listagem e filtros simples.
5. Página de artigo/situação.
6. Orientador interativo baseado em árvores de decisão predefinidas.
7. Páginas institucionais: Sobre, Como usamos fontes, Aviso educativo, Acessibilidade e Privacidade.
8. Links externos para órgãos e canais oficiais.
9. Layout responsivo e acessível.

## 5. O que fica fora do MVP

Não implementar sem aprovação expressa:
- Login, cadastro, perfis ou contas.
- Backend, banco de dados ou painel administrativo.
- Comentários, fórum, comunidade ou contribuição de usuários.
- Upload de documentos ou análise de casos individuais.
- Chatbot com IA ou geração de respostas jurídicas em tempo real.
- Pagamentos, anúncios, assinaturas ou afiliados.
- Favoritos sincronizados, histórico pessoal ou coleta de dados sensíveis.
- Envio automático de reclamações, petições ou mensagens a terceiros.
- Integrações pagas ou APIs com custo recorrente.

## 6. Papel da IA

IA pode auxiliar durante desenvolvimento, pesquisa preliminar, organização e redação de rascunhos. Não será dependência do site em produção. Não pode decidir o direito aplicável sem regras explícitas nem inventar leis, artigos, prazos ou órgãos.

Quando encontrar assunto relevante não previsto, deve registrar uma sugestão em `docs/CHANGELOG-DECISOES.md` (a criar pelo implementador) e aguardar aprovação; não ampliar o escopo silenciosamente.

## 7. Limites jurídicos

- O conteúdo é educativo e geral; não substitui análise individual por advogado ou Defensoria Pública.
- A aplicabilidade pode depender de estado, município, contrato, datas, fatos, categoria profissional e regulamentação.
- Não afirmar que um direito é absoluto quando houver requisitos, exceções ou controvérsias.
- Não apresentar prazo sem explicar o evento que inicia a contagem e a norma aplicável.
- Não transformar orientação administrativa em garantia de resultado.
- Quando faltarem dados, explicar o limite e indicar onde confirmar.

## 8. Política de publicação

Todo conteúdo criado no desenvolvimento começa como `draft` ou `pending_review`. Somente conteúdo com validação documentada pode ficar público como `published`. Conteúdo não validado deve permanecer fora do build público ou ser mostrado apenas em ambiente de prévia restrito ao desenvolvimento.

## 9. Regras para o repositório ctresb/leis

URL: <https://github.com/ctresb/leis>

Usar como ponto de partida para localizar textos e metadados, nunca como fonte final exclusiva. O repositório informa que contém normas federais, estaduais, distritais e municipais; textos convertidos para Markdown, inclusive por OCR; lacunas de cobertura; e recomendação para conferir a fonte indicada no cabeçalho.

Obrigatório:
1. Ler README, `PROGRESSO.md`, `COBERTURA.md`, `LICENSE` e metadados dos arquivos relevantes.
2. Não clonar/importar o acervo inteiro para o site. Selecionar apenas normas necessárias ao catálogo aprovado.
3. Para cada norma selecionada, registrar título, número, ano, esfera, órgão, artigos, situação indicada, versão consultada, URL de origem, data de consulta e limitações.
4. Conferir o texto em fonte oficial primária (Diário Oficial, Planalto, órgão regulador, assembleia/câmara competente).
5. Conferir alterações, revogações, regulamentação, vigência, decisões vinculantes e regras de transição.
6. Verificar se a regra é federal, estadual, distrital ou municipal.
7. Não copiar erros de OCR, cabeçalhos incompletos ou versões históricas como se fossem atuais.
8. Não assumir que uma norma listada no acervo esteja vigente.
9. Não automatizar a publicação de conteúdo extraído do repositório.
10. Registrar dúvidas como pendências, sem preencher lacunas por suposição.

A licença MIT se aplica aos scripts do repositório conforme o arquivo LICENSE; não presumir que ela seja a licença de todos os materiais de terceiros. Atos oficiais têm regime jurídico próprio. Preservar atribuição e proveniência e não copiar scripts sem manter os avisos exigidos.

## 10. Hierarquia de fontes

Priorizar:
- Constituição Federal e legislação no Portal da Legislação do Planalto.
- Diário Oficial da União e diários oficiais estaduais/municipais.
- Câmara dos Deputados e Senado Federal.
- Órgãos reguladores competentes (ex.: ANS, ANATEL, ANPD, Banco Central).
- Portais oficiais de governos estaduais, assembleias e câmaras municipais.
- Tribunais e bases oficiais para jurisprudência, quando necessária.

Fontes secundárias podem ajudar a entender o tema, mas não substituem a fonte primária.

## 11. Referências institucionais de partida

- Planalto: <https://www.planalto.gov.br/>
- Câmara: <https://www.camara.leg.br/>
- Senado: <https://www12.senado.leg.br/>
- Diário Oficial da União: <https://www.in.gov.br/>
- Consumidor.gov.br: <https://www.consumidor.gov.br/>
- Defensoria Pública da União: <https://www.dpu.def.br/>
- Ministério Público Federal: <https://www.mpf.mp.br/>
- ANPD: <https://www.gov.br/anpd/>
- ANS: <https://www.gov.br/ans/>
- Banco Central: <https://www.bcb.gov.br/>

## 12. Regra de precedência

Em caso de conflito, prevalecem:
1. Lei e documentação oficial vigente, após validação competente.
2. Este conjunto de especificações aprovado pelo responsável do projeto.
3. Decisões registradas pelo responsável do projeto.
4. Sugestões da IA, que não são autorização para alterar o escopo.
