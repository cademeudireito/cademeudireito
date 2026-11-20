# Validação — Categoria Saúde

Roteiro de conferência dos 9 assuntos (SAU-001 a SAU-009) e do orientador **Meu plano de saúde ou o SUS negou ou demorou um atendimento** (GUI-007). Este documento **não altera nenhum conteúdo do site**. Serve de referência para as correções futuras.

Data da conferência: 2026-11-20.
Conteúdo conferido: `src/data/articles/SAU-*.json` e `src/data/guides/GUI-007.json`.
Acervo consultado: `ctresb/leis` (auxiliar; a conferência final deve ser feita contra o texto vigente no Planalto e nas normas da ANS).

Regra da casa: linguagem simples é prioridade. O fundamento legal precisa estar certo, mas não precisa repetir o texto da lei.

---

## Alertas antes de publicar

**1. Lei 8.080, art. 19-J (acompanhante).** O texto atual vale para **toda mulher**, em **consultas, exames e procedimentos**, em serviços públicos **ou privados**. O rascunho SAU-006 restringe ao parto no SUS. Foi alterado pela Lei 14.737/2023. Precisa ser corrigido antes da publicação.

**2. Lei 13.787/2018 não dá direito de acesso ao prontuário.** A lei trata de digitalização e guarda do prontuário (guarda mínima de 20 anos, art. 6º). O rascunho SAU-003 usa essa lei como base do direito de acesso. O fundamento correto do pedido está na LGPD (art. 18, II, e art. 19) e nas normas do Conselho Federal de Medicina, estas últimas fora do acervo. **Não publicar SAU-003 antes dessa correção.**

**3. Rol da ANS e cobertura fora do rol (Lei 14.454/2022).** A cobertura de procedimentos fora do rol da ANS **não é automática**. A Lei 14.454 (art. 10, §§ 12 e 13 da Lei 9.656) exige comprovação de eficácia com base em evidências científicas e plano terapêutico, entre outros critérios. Esse ponto é central para SAU-001 e precisa aparecer na explicação.

**4. Art. 35-E da Lei 9.656 foi declarado inconstitucional pelo STF (ADI 1.931).** O art. 15 e o art. 35-C, parágrafo único, mencionam regras da ANS. **Não citar o art. 35-E como base** de nenhum conteúdo.

---

## Legenda

- 🟢 **Base conferida:** o dispositivo existe no acervo e corresponde ao tema.
- 🟡 **Ajustar:** a base está certa, mas falta prazo, número, exceção ou há uma afirmação que precisa de correção.
- 🔴 **Pendente:** a base está errada, ou falta dispositivo confirmado.

---

## Resumo

| ID | Assunto | Status | Principal pendência |
|---|---|---|---|
| SAU-001 | Plano negou procedimento | 🟡 | Explicar o rol da ANS e a cobertura fora do rol (Lei 9.656, art. 10, §§ 12 e 13, com a redação da Lei 14.454) |
| SAU-002 | Reclamar no SUS | 🟡 | Trocar Lei 8.142 por Lei 13.460/2017 (ouvidoria; prazo de 30 dias, art. 16) |
| SAU-003 | Acesso ao prontuário | 🔴 | **Trocar a base:** LGPD art. 18, II e art. 19; Lei 13.787 não dá o direito de acesso |
| SAU-004 | Informações antes de procedimento | 🟡 | Citar CDC art. 6º, III; a base de consentimento é outra (CFM e Código Civil) — conferir |
| SAU-005 | SUS não forneceu medicamento | 🟡 | Citar Lei 8.080, arts. 19-M a 19-R (assistência terapêutica e protocolos) |
| SAU-006 | Acompanhante | 🟡 | **Corrigir:** art. 19-J vale para consultas e exames, também em serviços privados |
| SAU-007 | Reajuste do plano | 🟡 | Citar Lei 9.656, art. 15; incluir o limite do Estatuto da Pessoa Idosa (art. 15, §3º) |
| SAU-008 | Plano cancelado ou não renovado | 🟡 | Citar Lei 9.656, art. 13, caput e parágrafo único (rescisão só em hipóteses definidas) |
| SAU-009 | Urgência negada pelo plano | 🟡 | Trocar "carência e limites" por carência máxima de 24 horas (art. 12, V, c) |
| GUI-007 | Plano ou SUS (orientador) | 🟡 | Revisar após os artigos; conferir o caminho de reajuste (relacionado a IDO-003) |

Nenhum item está 🟢 nesta categoria. O item mais grave é SAU-003, pela base legal errada.

---

## Artigos, um a um

### SAU-001 — Meu plano de saúde negou um procedimento · 🟡

- **Base confirmada:** Lei 9.656/1998, art. 10, §4º — a amplitude das coberturas segue o rol de procedimentos da ANS.
- **Base confirmada:** art. 10, §12 (com a redação da Lei 14.454/2022) — o rol é a referência básica para contratos a partir de 1999 e para contratos adaptados.
- **Base confirmada:** art. 10, §13 — tratamento prescrito que não esteja no rol deve ser autorizado pela operadora se houver comprovação de eficácia, baseada em evidências científicas, e plano terapêutico, entre outros critérios (incisos I e seguintes).
- **Base confirmada:** art. 35-C — cobertura obrigatória para emergência e urgência, com **declaração do médico assistente** sobre o risco. Ver SAU-009.
- **A conferir:** os critérios completos do §13 (incisos II e III) e a norma da ANS que regulamenta o tema (atualmente, a identificar; o rascunho diz "normas vigentes da ANS").
- **Ajuste:** o rascunho diz que a cobertura depende de "tipo de contrato, segmentação, data, procedimento e normas da ANS". Está correto, mas incompleto. Acrescentar: **"o plano não é obrigado a cobrir tudo o que o médico pede, mas pode ser obrigado a cobrir fora do rol se cumprir os critérios da lei"**.
- **Como dizer de forma simples:** "O plano de saúde cobre uma lista de procedimentos definida pela ANS. Se o que você precisa não está nessa lista, ainda pode ter direito, desde que o médico prove que o tratamento funciona com base em estudos científicos e tenha um plano de tratamento. Peça a negativa por escrito com o motivo."

### SAU-002 — Como reclamar de demora ou negativa no SUS · 🟡

- **Base confirmada:** Lei 13.460/2017 (defesa dos direitos do usuário de serviços públicos) — art. 9º (manifestação à administração), art. 10 (dirigida à ouvidoria), art. 11 (não pode ser recusada) e art. 16 (decisão final em **30 dias**, prorrogável uma vez por igual período).
- **Base confirmada:** Lei 8.080/1990, art. 2º (saúde como direito fundamental) e art. 7º (diretrizes do SUS).
- **Ajuste:** o rascunho cita a Lei 8.142/1990 (participação social). Ela trata dos conselhos e conferências de saúde, **não do direito de reclamar**. Trocar pela Lei 13.460/2017, que é o fundamento da ouvidoria.
- **Ajuste:** incluir o prazo de 30 dias da ouvidoria.
- **Como dizer de forma simples:** "Quando o SUS demora ou nega um atendimento, registre uma reclamação na ouvidoria da unidade ou da secretaria de saúde. A ouvidoria deve responder em até 30 dias. Anote data, local e nome de quem atendeu."

### SAU-003 — Tenho direito de acessar meu prontuário? · 🔴

- **Base incorreta no rascunho:** Lei 13.787/2018 **não cria** o direito de acesso. Ela trata da digitalização e da guarda do prontuário (art. 1º, art. 2º e art. 6º, que fixa 20 anos de guarda mínima).
- **Base correta a usar:** Lei 13.709/2018 (LGPD), art. 18, II — o titular tem direito ao acesso aos seus dados; art. 19 — o acesso é providenciado **imediatamente** em formato simplificado ou, em declaração completa, **em até 15 dias** do pedido.
- **A conferir (fora do acervo):** normas do Conselho Federal de Medicina sobre prontuário e o Código de Ética Médica. O rascunho cita "normas profissionais" de forma genérica. Confirmar a norma antes de citar.
- **Ajuste:** a redação do rascunho ("Como pedir, em que prazo e com quais limites precisa ser conferido") deixa a pessoa sem resposta. Trocar pelo prazo da LGPD (15 dias) como referência, com a ressalva de que a unidade pode ter regra própria.
- **Como dizer de forma simples:** "Você pode pedir uma cópia do seu prontuário e dos seus exames. Peça por escrito. Pela lei de proteção de dados, a unidade deve responder em até 15 dias, e pode dar uma resposta mais simples na hora. Guarde o protocolo do pedido."

### SAU-004 — Quais informações devo receber antes de um procedimento? · 🟡

- **Base confirmada:** Lei 8.078/1990 (CDC), art. 6º, III — direito à informação adequada e clara sobre os produtos e serviços e sobre os riscos que apresentem.
- **A conferir (fora do acervo):** a regra de consentimento informado está nas normas do CFM e no Código Civil, art. 15 (ninguém pode ser constrangido a se submeter, com risco de vida, a tratamento médico ou intervenção cirúrgica). Esse artigo do Código Civil está no registro do projeto, mas não foi conferido nesta etapa.
- **Ajuste:** o rascunho diz "Constituição, normas profissionais e, em alguns casos, o CDC". Citar o CDC, art. 6º, III, e o Código Civil, art. 15, depois de conferidos.
- **Como dizer de forma simples:** "Antes de um exame ou tratamento, você tem direito a saber para que serve, quais os riscos, quais as alternativas e quanto custa, quando for o caso. Em situação de emergência, a regra é outra. Faça perguntas, anote as respostas e peça cópia do termo antes de assinar."

### SAU-005 — O SUS não forneceu um medicamento ou exame · 🟡

- **Base confirmada:** Lei 8.080/1990, art. 19-M — assistência terapêutica integral, incluindo medicamentos e produtos de interesse para a saúde, nos termos de protocolos.
- **Base confirmada:** art. 19-O — protocolos clínicos e diretrizes terapêuticas definem os medicamentos em cada fase da doença.
- **Base confirmada:** art. 19-P — na falta de protocolo, há regra própria de dispensação.
- **Base confirmada:** art. 19-Q e art. 19-R — incorporação ou exclusão de medicamentos pelo SUS é feita por processo administrativo, concluído em **até 180 dias**.
- **Ajuste:** o rascunho cita só a Constituição e a Lei 8.080 de forma geral. Citar os arts. 19-M a 19-R torna a base concreta.
- **Ajuste:** o rascunho diz "o que o SUS fornece depende de listas e protocolos oficiais". Está correto. Acrescentar: **"se não houver protocolo, o médico pode justificar; o pedido deve ser registrado por escrito"** (art. 19-P, conferir a redação).
- **Como dizer de forma simples:** "O SUS deve fornecer o medicamento ou exame que segue os protocolos de tratamento. Se ele não estiver no protocolo, ainda assim pode ser pedido. Peça por escrito a negativa, com o motivo, e leve a receita e o laudo médico."

### SAU-006 — Posso ter acompanhante no parto ou na internação? · 🟡

- **Base corrigida:** Lei 8.080/1990, art. 19-J (texto atual, com a redação da Lei 14.737/2023) — **toda mulher** tem direito a um acompanhante maior de idade, durante todo o atendimento, em **consultas, exames e procedimentos**, em unidades públicas **ou privadas**, sem necessidade de aviso prévio.
- **Base confirmada:** Lei 11.108/2005 — origem do direito à presença de acompanhante no parto, trabalho de parto e pós-parto imediato no SUS (hoje o texto está no art. 19-J).
- **Base confirmada:** Lei 8.069/1990 (ECA), art. 12 — em internação de criança ou adolescente, **um dos pais ou responsável** pode permanecer em tempo integral.
- **Base confirmada:** Lei 10.741/2003 (Estatuto da Pessoa Idosa), art. 16 — à pessoa idosa internada ou em observação é assegurado acompanhante, segundo o critério médico.
- **Ajuste:** o rascunho diz "há leis que asseguram acompanhante à parturiente no SUS". Está incompleto. Trocar por "toda mulher tem direito a acompanhante em consultas, exames e procedimentos, em serviços públicos e privados, e na maternidade, durante o parto".
- **Atenção:** o rascunho diz "e a acompanhante de pessoas idosas e de crianças". A palavra "acompanhante" é usada para o próprio direito, mas o ECA fala em "um dos pais ou responsável". Ajustar a redação.
- **Como dizer de forma simples:** "Mulheres podem levar uma pessoa maior de idade como acompanhante em consultas, exames e no parto, em serviços públicos ou privados. Crianças e adolescentes internados podem ter um dos pais ou responsável por perto em tempo integral. Pessoas idosas internadas também têm direito a acompanhante, conforme o critério médico."

### SAU-007 — O plano de saúde reajustou a mensalidade: é permitido? · 🟡

- **Base confirmada:** Lei 9.656/1998, art. 15 — a variação por idade só pode ocorrer se o contrato inicial já previr as faixas etárias e os percentuais de reajuste, conforme normas da ANS.
- **Base confirmada:** Lei 10.741/2003 (Estatuto da Pessoa Idosa), art. 15, §3º — é vedada a discriminação da pessoa idosa nos planos de saúde pela cobrança de valores diferenciados em razão da idade.
- **A conferir (fora do acervo):** as normas da ANS sobre reajuste anual e por faixa etária, e a regra específica para pessoas com 60 anos ou mais. O STF e a ANS tratam desse tema e o texto precisa ser atualizado antes da publicação.
- **Ajuste:** o rascunho diz que "reajuste anual e reajuste por faixa etária são coisas diferentes". Correto, mas incompleto: explicar que **o reajuste por idade só vale se estiver no contrato**.
- **Ajuste:** não citar o art. 35-E da Lei 9.656 (inconstitucional, ver alerta 4).
- **Como dizer de forma simples:** "A mensalidade do plano pode aumentar todo ano, dentro dos índices permitidos pela ANS. Também pode aumentar por mudança de faixa de idade, mas só se essas faixas e os percentuais estiverem escritos no contrato. Peça o cálculo por escrito e guarde o comunicado."

### SAU-008 — A operadora cancelou ou não renovou meu plano · 🟡

- **Base confirmada:** Lei 9.656/1998, art. 13, caput — contratos têm renovação automática no fim do prazo inicial, **sem cobrança de taxas** no ato da renovação.
- **Base confirmada:** art. 13, parágrafo único — contratos individuais têm vigência mínima de um ano e é vedada a suspensão ou rescisão unilateral, **salvo por fraude ou não pagamento por mais de 60 dias** (consecutivos ou não) nos últimos 12 meses, com comunicação ao beneficiário com antecedência mínima de 50 dias.
- **Base confirmada:** art. 30 — quem perde o emprego sem justa causa pode manter o plano, pagando integralmente, pelo prazo da lei.
- **Base confirmada:** art. 31 — aposentado que contribuiu por pelo menos 10 anos pode manter o plano.
- **Ajuste:** o rascunho diz "as hipóteses em que a operadora pode rescindir dependem do tipo de contrato". Trocar pela regra acima: a operadora só pode cancelar em caso de fraude ou inadimplência de mais de 60 dias, com aviso prévio.
- **Ajuste:** incluir os arts. 30 e 31 para quem perdeu o emprego ou se aposentou.
- **Como dizer de forma simples:** "Um plano individual não pode ser cancelado pela operadora por qualquer motivo. Ela só pode cancelar em caso de fraude ou se você ficar mais de 60 dias sem pagar, e precisa avisar com antecedência. Se você perdeu o emprego ou se aposentou, pode manter o plano pagando o valor integral. Peça o motivo por escrito."

### SAU-009 — O plano negou atendimento de urgência ou emergência · 🟡

- **Base confirmada:** Lei 9.656/1998, art. 35-C, I e II — cobertura obrigatória de **emergência** (risco imediato de vida ou lesões irreparáveis, com declaração do médico assistente) e de **urgência** (acidentes pessoais ou complicações no processo gestacional).
- **Base confirmada:** art. 12, V, c — prazo máximo de **24 horas** para cobertura de urgência e emergência (carência).
- **Ajuste:** o rascunho diz "as condições, como carência e limites, precisam ser conferidas". Trocar por: "a carência para urgência e emergência é de no máximo 24 horas".
- **Ajuste:** incluir o art. 35-C, I (emergência com declaração do médico).
- **Como dizer de forma simples:** "Se você está em risco de vida, procure atendimento de emergência agora, sem esperar o plano. Em caso de urgência ou emergência, o plano não pode impor carência maior que 24 horas. Guarde laudos, receitas e recibos, e peça a negativa por escrito."

---

## Orientador da categoria

### GUI-007 — Meu plano de saúde ou o SUS negou ou demorou um atendimento · 🟡

- A estrutura está correta. Cada resultado aponta para um artigo da categoria.
- **Ajuste:** o resultado `r_reaj` (reajuste) relaciona IDO-003. Confirmar se o tema da idade é tratado lá e se a relação faz sentido.
- **Ajuste:** o resultado `r_acomp` (acompanhante) aponta para SAU-006 e relaciona SAU-002. Mais adequado relacionar a ouvidoria (SAU-002) apenas se houver recusa.
- **Ajuste:** o resultado `r_pront` (prontuário) aponta para SAU-003, que está 🔴. Não publicar o orientador antes de SAU-003 ser corrigido.
- **Conferir:** o resultado `r_urg` (urgência) deve incluir o aviso de "buscar atendimento imediato" antes de qualquer outra orientação. Hoje o texto diz isso, de forma adequada.

---

## Vocabulário para simplificar

| Termo técnico | Como dizer |
|---|---|
| rol da ANS | lista de procedimentos que o plano é obrigado a cobrir |
| cobertura fora do rol | tratamento que não está na lista, mas pode ser coberto |
| carência | tempo de espera antes de usar o plano |
| rescisão unilateral | cancelamento pela operadora sem acordo |
| inadimplência | atraso no pagamento da mensalidade |
| protocolo clínico | guia oficial de tratamento do SUS |
| dispensação | entrega do medicamento na farmácia |
| ouvidoria | canal oficial de reclamação |

---

## Pendências da categoria (para correção futura)

1. **Corrigir SAU-003:** trocar a base (LGPD art. 18, II e art. 19) e conferir as normas do CFM. Prioridade.
2. **Corrigir SAU-006:** usar o art. 19-J atual (consultas, exames e procedimentos, público e privado).
3. **Incluir no SAU-001** os critérios do art. 10, §13 da Lei 9.656 e a norma da ANS (identificar o número).
4. **Trocar a base do SAU-002:** Lei 13.460/2017 no lugar da Lei 8.142, e incluir o prazo de 30 dias.
5. **Citar no SAU-005** os arts. 19-M a 19-R da Lei 8.080 (protocolos e prazo de 180 dias).
6. **Corrigir SAU-007:** incluir a condição contratual do reajuste por idade (art. 15) e o art. 15, §3º do Estatuto. Conferir a regra da ANS para 60 anos ou mais.
7. **Corrigir SAU-008:** citar art. 13, parágrafo único (60 dias, 50 dias de aviso) e os arts. 30 e 31.
8. **Corrigir SAU-009:** carência máxima de 24 horas (art. 12, V, c).
9. **Conferir SAU-004** com o CFM e o Código Civil, art. 15.
10. **Identificar as normas da ANS** citadas como "a identificar" (rol, reajuste, reclamação).

---

## O que não foi verificado nesta conferência

- Texto vigente no Planalto e no site da ANS: a conferência foi feita contra o acervo `ctresb/leis`, que é auxiliar.
- Normas do CFM (prontuário e consentimento) e Código de Ética Médica: não estão no acervo.
- Normas da ANS (rol, reajuste, cancelamento e reclamação): não foram lidas. São as normas que definem os prazos finais.
- Protocolos e listas do SUS (Conitec e RENAME): não foram lidos.
- Jurisprudência (STF, STJ e TJs): nenhuma decisão foi lida. O STF já decidiu sobre reajuste por idade e sobre o rol; o texto precisa ser revisado com essas decisões.
- Lei 14.737/2023 (texto integral do art. 19-J): só o dispositivo foi conferido.
