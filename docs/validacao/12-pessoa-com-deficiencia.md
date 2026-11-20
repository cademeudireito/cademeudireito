# Validação — Categoria Pessoa com deficiência

Roteiro de conferência dos 4 assuntos (PCD-001 a PCD-004) e do orientador **Direitos da pessoa com deficiência: por onde começar?** (GUI-013). Este documento **não altera nenhum conteúdo do site**. Serve de referência para as correções futuras.

Data da conferência: 2026-11-20.
Conteúdo conferido: `src/data/articles/PCD-*.json` e `src/data/guides/GUI-013.json`.
Acervo consultado: `ctresb/leis` (auxiliar; a conferência final deve ser feita contra o texto vigente no Planalto).

Regra da casa: linguagem simples é prioridade. O fundamento legal precisa estar certo, mas não precisa repetir o texto da lei.

---

## Alertas antes de publicar

**1. Cota de empregos depende do tamanho da empresa (PCD-002).** O art. 93 da Lei 8.213 obriga empresas com **100 ou mais empregados** a preencher de 2% a 5% dos cargos, em faixas: até 200 empregados, 2%; a porcentagem sobe conforme o número de empregados. O rascunho diz "de 2% a 5%", o que está certo, mas precisa explicar as faixas. Os valores de cada faixa (inciso II a IV) não foram lidos.

**2. Passe livre e BPC têm critério de renda (PCD-003 e PCD-004).** O passe livre interestadual é para pessoas com deficiência **comprovadamente carentes** (Lei 8.899, art. 1º). O BPC exige renda familiar por pessoa de **até 1/4 do salário mínimo** (LOAS, art. 20, §3º). O rascunho PCD-004 não traz esse número.

**3. Definição de deficiência de longo prazo (PCD-004).** A LOAS, art. 20, §10, exige impedimento de **pelo menos 2 anos**. Essa regra decide quem pode receber o BPC e não aparece no rascunho.

---

## Legenda

- 🟢 **Base conferida:** o dispositivo existe no acervo e corresponde ao tema.
- 🟡 **Ajustar:** a base está certa, mas falta número, faixa, prazo ou há uma afirmação que precisa de correção.
- 🔴 **Pendente:** a base está errada, ou falta dispositivo confirmado.

---

## Resumo

| ID | Assunto | Status | Principal pendência |
|---|---|---|---|
| PCD-001 | Acessibilidade | 🟡 | Citar LBI art. 3º, IV (conceito de barreira); Lei 10.098 como norma geral; conferir normas técnicas |
| PCD-002 | Cota de empregos | 🟡 | Citar Lei 8.213, art. 93, com as faixas de 2% a 5% (incisos I a IV) |
| PCD-003 | Passe livre interestadual | 🟡 | Citar Lei 8.899, art. 1º; **conferir o regulamento** do procedimento de concessão |
| PCD-004 | BPC | 🟡 | **Incluir limite de 1/4 do salário mínimo** (LOAS art. 20, §3º) e impedimento de 2 anos (§10) |
| GUI-013 | Pessoa com deficiência (orientador) | 🟡 | Revisar relações (`r_acess`, `r_emp`); confirmar `r_esc` |

Nenhum item está 🟢 nesta categoria.

---

## Artigos, um a um

### PCD-001 — O que a lei diz sobre acessibilidade? · 🟡

- **Base confirmada:** Lei 13.146/2015 (LBI), art. 3º, IV — barreira é qualquer entrave, obstáculo, atitude ou comportamento que limite ou impeça a participação social da pessoa e o exercício de seus direitos. A lista de tipos de barreira (urbanísticas, arquitetônicas, de transportes, de comunicações e atitudinais) está no mesmo inciso, a confirmar na redação completa.
- **Base confirmada:** Lei 10.098/2000 (acessibilidade), arts. 1º e 2º — normas gerais e critérios para promover a acessibilidade e definições legais.
- **A conferir:** normas técnicas de acessibilidade (ABNT NBR 9050, citada de forma genérica no rascunho). Não está no acervo; não citar número sem conferir.
- **Ajuste:** o rascunho diz "há normas técnicas que detalham as medidas". Correto. Acrescentar a base da LBI e a Lei 10.098.
- **Como dizer de forma simples:** "Barreira é tudo que impede a pessoa com deficiência de participar: degrau sem rampa, site sem leitor de tela, ônibus sem elevador, ou atitude de quem não aceita. A lei exige acessibilidade em prédios, transporte e serviços. Registre a barreira com fotos, avise o responsável por escrito e, se não resolver, procure a ouvidoria ou o Ministério Público."

### PCD-002 — Empresas precisam contratar pessoas com deficiência? · 🟡

- **Base confirmada:** Lei 8.213/1991, art. 93 — a empresa com **100 ou mais empregados** é obrigada a preencher de 2% a 5% dos cargos com beneficiários reabilitados ou pessoas com deficiência habilitadas, na proporção do número de empregados.
- **Base confirmada:** art. 93, I — até 200 empregados: **2%**. Os incisos II a IV (faixas mais altas) não foram lidos; conferir os percentuais antes de publicar.
- **Ajuste:** o rascunho diz "na proporção que a lei define". Trocar por "2% para empresas de até 200 empregados, e percentuais maiores para empresas maiores (até 5%)".
- **Ajuste:** o rascunho diz "conferir como a deficiência deve ser comprovada". A comprovação está em regulamento, que não está no acervo. Manter a ressalva.
- **Como dizer de forma simples:** "Empresas com 100 ou mais funcionários devem ter uma parte das vagas ocupadas por pessoas com deficiência ou reabilitados pelo INSS. A porcentagem vai de 2% até 5%, conforme o tamanho da empresa. Se você foi recusado por causa da deficiência, registre a situação e procure o Ministério Público do Trabalho ou a Defensoria Pública."

### PCD-003 — Tenho direito a passe livre em viagens interestaduais? · 🟡

- **Base confirmada:** Lei 8.899/1994, art. 1º — é concedido passe livre às pessoas com deficiência, comprovadamente carentes, no sistema de transporte coletivo interestadual.
- **A conferir:** regulamento de concessão (o procedimento, a comprovação de carência e a emissão do documento). Não está no acervo.
- **Ajuste:** o rascunho diz "o direito depende de comprovação de deficiência e de condição de carência". Correto. Acrescentar que a carência é requisito legal.
- **Ajuste:** o rascunho diz "reúna documento de identidade e laudos exigidos". Os documentos exigidos estão no regulamento; manter a ressalva.
- **Como dizer de forma simples:** "Pessoas com deficiência de baixa renda têm direito a viajar de graça no transporte coletivo entre estados. É preciso comprovar a deficiência e a situação de baixa renda. Confira no órgão de transporte o procedimento atual, leve documento de identidade e laudos, e guarde o protocolo do pedido."

### PCD-004 — Pessoa com deficiência pode receber o BPC? · 🟡

- **Base confirmada:** LOAS (Lei 8.742/1993), art. 20, caput — garantia de um salário mínimo mensal à pessoa com deficiência que comprove não possuir meios de prover a própria manutenção nem de tê-la provida pela família.
- **Base confirmada:** art. 20, §2º — conceito de pessoa com deficiência: impedimento de longo prazo, de natureza física, mental, intelectual ou sensorial, que, em interação com barreiras, pode obstruir a participação plena e efetiva.
- **Base confirmada:** art. 20, §10 — impedimento de longo prazo é o que produz efeitos por **pelo menos 2 anos**.
- **Base confirmada:** art. 20, §3º — renda familiar mensal per capita de até **1/4 do salário mínimo**.
- **Base confirmada:** art. 20, §2º-A e §6º — concessão sujeita à avaliação da deficiência e do grau de impedimento, por perícia médica e avaliação social do INSS.
- **A conferir:** Cadastro Único (citado no rascunho) é exigência regulamentar, não está no acervo.
- **Ajuste obrigatório:** incluir o limite de 1/4 do salário mínimo (§3º) e o impedimento de 2 anos (§10).
- **Como dizer de forma simples:** "O BPC é um salário mínimo por mês para pessoa com deficiência de longo prazo (pelo menos 2 anos) ou idosa de 65 anos ou mais, quando a renda por pessoa da família é de até 1/4 do salário mínimo. Não precisa ter contribuído ao INSS. Passa por avaliação médica e social. Atualize o Cadastro Único e reúna laudos e exames."

---

## Orientador da categoria

### GUI-013 — Direitos da pessoa com deficiência: por onde começar? · 🟡

- A estrutura está correta. Cada resultado aponta para um artigo da categoria.
- **Ajuste:** o resultado `r_acess` (acessibilidade) relaciona PCD-003 (passe livre). Relação fraca. Sugerir PCD-002 ou nenhum relacionado.
- **Ajuste:** o resultado `r_emp` (cota de empregos) relaciona PCD-004 (BPC). Relação fraca. Sugerir PCD-001 ou nenhum relacionado.
- **Conferir:** o resultado `r_esc` (educação inclusiva) aponta para EDU-005 e relaciona EDU-002 e PCD-001. Adequado, pois a matrícula com recusa por deficiência é crime (ver EDU-005).
- **Conferir:** o resultado `r_bpc` relaciona PRE-003 (BPC para idosos e PCD). Adequado.

---

## Vocabulário para simplificar

| Termo técnico | Como dizer |
|---|---|
| barreira | qualquer obstáculo, físico ou de atitude |
| acessibilidade | facilidade de uso de espaços, serviços e informações |
| impedimento de longo prazo | deficiência que dura pelo menos 2 anos |
| per capita | renda por pessoa da família |
| cota | parte das vagas reservada por lei |
| passe livre | viagem gratuita |
| avaliação social | análise da situação de vida da pessoa, feita pelo INSS |
| reabilitado | pessoa que voltou ao trabalho pelo INSS, após afastamento |

---

## Pendências da categoria (para correção futura)

1. **Incluir o limite de 1/4 do salário mínimo e o impedimento de 2 anos** em PCD-004 (LOAS art. 20, §§3º e 10). Prioridade.
2. **Explicar as faixas de cota** em PCD-002 e conferir os incisos II a IV do art. 93 da Lei 8.213. Prioridade.
3. **Conferir o regulamento** do passe livre interestadual em PCD-003.
4. **Citar a LBI, art. 3º, IV** em PCD-001 e a Lei 10.098 como norma geral.
5. **Conferir as normas técnicas** de acessibilidade (ABNT) em PCD-001, sem citar número sem conferir.
6. **Ajustar o orientador** (GUI-013): relações de `r_acess` e `r_emp`.

---

## O que não foi verificado nesta conferência

- Texto vigente no Planalto: a conferência foi feita contra o acervo `ctresb/leis`, que é auxiliar.
- Lei 8.213, art. 93, incisos II a IV (faixas de cota): não lidos.
- Lei 13.146 (LBI), art. 3º, IV (lista completa de barreiras): lida no caput e na definição geral; conferir a redação completa.
- Regulamento do passe livre interestadual e da cota: não está no acervo.
- Cadastro Único e regulamento do BPC (Decreto 6.214/2007 e atualizações): não consultados.
- Jurisprudência (STF e STJ) sobre BPC e avaliação da deficiência: nenhuma decisão foi lida. O STF já tratou do conceito de deficiência para o BPC; o texto precisa ser revisado com essas decisões.
