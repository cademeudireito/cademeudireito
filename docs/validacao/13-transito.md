# Validação — Categoria Trânsito

Roteiro de conferência dos 4 assuntos (TRN-001 a TRN-004) e do orientador **Tenho um problema de trânsito** (GUI-010). Este documento **não altera nenhum conteúdo do site**. Serve de referência para as correções futuras.

Data da conferência: 2026-11-20.
Conteúdo conferido: `src/data/articles/TRN-*.json` e `src/data/guides/GUI-010.json`.
Acervo consultado: `ctresb/leis` (auxiliar; a conferência final deve ser feita contra o texto vigente no Planalto).

Regra da casa: linguagem simples é prioridade. O fundamento legal precisa estar certo, mas não precisa repetir o texto da lei.

---

## Alertas antes de publicar

**1. Prazo de defesa prévia é de no mínimo 30 dias (TRN-001).** O art. 281-A do CTB diz que a notificação de autuação deve informar o prazo de defesa prévia, que **não será inferior a 30 dias**. O rascunho diz apenas "prazos constam na notificação".

**2. Venda do veículo: prazo de 60 dias, e responsabilidade solidária (TRN-004).** O art. 134 do CTB dá ao antigo proprietário **60 dias** para comunicar a transferência ao órgão de trânsito. Se não o fizer, responde **solidariamente** pelas penalidades e reincidências. O rascunho não traz o número nem a consequência. **Precisa entrar.**

**3. Acidente sem vítima não é o art. 176 (GUI-010).** O art. 176 trata de sinistro **com vítima**. O resultado `r_acid` (acidente sem vítima) usa o mesmo texto do `r_vitima` e fala em "deixar de prestar socorro". Para acidente só com danos materiais, esse texto **não se aplica**. Precisa de texto próprio.

---

## Legenda

- 🟢 **Base conferida:** o dispositivo existe no acervo e corresponde ao tema.
- 🟡 **Ajustar:** a base está certa, mas falta prazo, número, penalidade ou há uma afirmação que precisa de correção.
- 🔴 **Pendente:** a base está errada, ou falta dispositivo confirmado.

---

## Resumo

| ID | Assunto | Status | Principal pendência |
|---|---|---|---|
| TRN-001 | Recurso de multa | 🟡 | **Incluir prazo mínimo de 30 dias para defesa prévia** (art. 281-A); citar arts. 282, 285 e JARI em 10 dias (§2º) |
| TRN-002 | Acidente de trânsito | 🟡 | Citar **art. 176** como infração gravíssima (multa de cinco vezes e suspensão); separar acidente sem vítima |
| TRN-003 | Pontos na CNH | 🟡 | Incluir pontos por gravidade (art. 259: 7, 5, 4, 3) e limites de suspensão (art. 261: 20, 30 ou 40 pontos em 12 meses) |
| TRN-004 | Venda de veículo | 🟡 | **Incluir prazo de 60 dias** e responsabilidade solidária (art. 134); conferir art. 123 |
| GUI-010 | Problema de trânsito (orientador) | 🟡 | **Corrigir `r_acid`** (texto de art. 176 não se aplica sem vítima) |

Nenhum item está 🟢 nesta categoria.

---

## Artigos, um a um

### TRN-001 — Recebi uma multa de trânsito: posso recorrer? · 🟡

- **Base confirmada:** Lei 9.503/1997 (CTB), art. 280 — ocorrendo infração, lavra-se o auto de infração, que deve conter os dados da infração e do infrator.
- **Base confirmada:** art. 281-A — a notificação de autuação deve informar o prazo de defesa prévia, que **não será inferior a 30 dias**.
- **Base confirmada:** art. 281 — a autoridade de trânsito julga a consistência do auto e aplica a penalidade cabível.
- **Base confirmada:** art. 282 — se a defesa prévia for indeferida ou não for apresentada no prazo, aplica-se a penalidade e expede-se notificação ao proprietário ou ao infrator.
- **Base confirmada:** art. 282, §1º — a notificação devolvida por desatualização do endereço do proprietário, ou por recusa em recebê-la, é válida para todos os efeitos.
- **Base confirmada:** art. 285 — o recurso contra a penalidade é apresentado à autoridade que aplicou a multa e tem efeito suspensivo.
- **Base confirmada:** art. 285, §2º — o recurso tempestivo é remetido à JARI no prazo de 10 dias.
- **A conferir:** o prazo do próprio recurso (art. 285 ou regulamento do Contran). Não lido nesta etapa; não publicar número sem conferir.
- **Ajuste obrigatório:** incluir o prazo mínimo de 30 dias para defesa prévia.
- **Ajuste:** incluir o alerta do §1º do art. 282. Muita gente não atualiza o endereço e perde o prazo sem saber.
- **Como dizer de forma simples:** "Você pode apresentar defesa contra a multa dentro do prazo que está na notificação. Esse prazo nunca é menor que 30 dias. Se a defesa for negada, ainda pode recorrer, e o recurso é analisado pela JARI. Se o endereço do seu cadastro estiver errado e você não receber a notificação, o prazo corre mesmo assim. Atualize seu endereço."

### TRN-002 — Me envolvi em um acidente de trânsito: o que fazer? · 🟡

- **Base confirmada:** CTB, art. 176 (redação da Lei 14.599/2023) — deixar o condutor envolvido em sinistro **com vítima** de: I — prestar ou providenciar socorro à vítima, podendo fazê-lo; II — adotar providências, podendo, para evitar perigo para o trânsito no local; III — preservar o local, de forma a facilitar os trabalhos da polícia e da perícia; IV — adotar providências para remover o veículo quando determinadas por agente de trânsito.
- **Classificação:** o art. 176 é **infração gravíssima**, com penalidade de **multa de cinco vezes** e **suspensão do direito de dirigir**. **Não é crime**, pelo texto lido.
- **A conferir:** a penalidade completa (valor da multa e prazo de suspensão), no próprio art. 176 e no art. 255 (valores). Não lido nesta etapa.
- **A conferir:** o seguro obrigatório de danos pessoais causados por veículos (DPVAT, hoje SPVAT). Não está no acervo.
- **Ajuste:** o rascunho diz "a lei trata como infração deixar de prestar socorro quando possível". Correto, mas é preciso dizer "gravíssima", com a penalidade.
- **Ajuste:** separar o acidente sem vítima (ver alerta 3).
- **Como dizer de forma simples:** "Se há uma pessoa ferida, a primeira obrigação é prestar socorro ou chamar quem possa ajudar, e não sair do local. Não mexa nos veículos sem necessidade, e preserve a cena para a polícia e a perícia. Quem deixa de fazer isso comete infração gravíssima, com multa alta e suspensão da CNH. Fotografe tudo e anote os dados das pessoas e testemunhas."

### TRN-003 — Como funcionam os pontos na CNH? · 🟡

- **Base confirmada:** CTB, art. 259 — cada infração gera pontos conforme a gravidade: **gravíssima: 7 pontos; grave: 5; média: 4; leve: 3**.
- **Base confirmada:** art. 261, I — a suspensão do direito de dirigir acontece quando o infrator atinge, em 12 meses, a seguinte contagem: **20 pontos**, se houver duas ou mais infrações gravíssimas; **30 pontos**, se houver uma infração gravíssima; **40 pontos**, se não houver nenhuma infração gravíssima.
- **Base confirmada:** art. 261, I (prazos de suspensão) — de 6 meses a 1 ano na primeira vez, e de 8 meses a 2 anos em caso de reincidência no período de 12 meses. Conferir a redação antes de publicar os prazos.
- **Atenção:** o art. 261 tem outras hipóteses de suspensão (inciso II, de 2 a 8 meses, para infrações específicas). Não lido por completo.
- **Ajuste:** o rascunho diz "a soma pode levar a penalidades como suspensão". Trocar pelos números de pontos e pelo limite de 20, 30 ou 40 pontos.
- **Como dizer de forma simples:** "Cada multa dá pontos na CNH, de 3 a 7, conforme a gravidade. Em 12 meses, se a soma chegar a 20, 30 ou 40 pontos (depende de haver infrações gravíssimas), sua habilitação pode ser suspensa. Consulte sua pontuação no órgão de trânsito. Se for notificado, confira o prazo para defesa."

### TRN-004 — Vendi (ou comprei) um veículo: como fazer a transferência? · 🟡

- **Base confirmada:** CTB, art. 134 — na transferência de propriedade, o antigo proprietário deve encaminhar ao órgão de trânsito, em **60 dias**, cópia do comprovante de transferência, assinado e datado. Se não o fizer, **responde solidariamente** pelas penalidades impostas e pelas reincidências.
- **Base confirmada:** art. 123 — obrigatoriedade de novo Certificado de Registro de Veículo em certos casos (incluindo transferência). O §1º, que trata do prazo para o novo proprietário, **não foi lido** nesta etapa.
- **Ajuste obrigatório:** incluir o prazo de 60 dias e a responsabilidade solidária do antigo proprietário.
- **Ajuste:** o rascunho diz "comunique a venda ao órgão de trânsito pelo canal oficial". Correto. Acrescentar "em até 60 dias".
- **Ajuste:** o rascunho diz "o comprador deve providenciar o novo certificado". Conferir o prazo no art. 123 antes de publicar.
- **Como dizer de forma simples:** "Quando vender um carro, guarde o comprovante de venda assinado e entregue uma cópia ao órgão de trânsito em até 60 dias. Se não fizer isso, você pode continuar respondendo pelas multas do carro vendido. O comprador deve fazer o novo registro no nome dele."

---

## Orientador da categoria

### GUI-010 — Tenho um problema de trânsito · 🟡

- A estrutura está correta: cinco resultados com a mesma lógica.
- **Ajuste obrigatório:** o resultado `r_acid` (acidente sem vítima) usa o mesmo texto de `r_vitima`, sobre o art. 176. Esse texto não se aplica a acidente só com danos materiais. Criar um texto próprio, com: registrar boletim se preciso, fotografar, trocar dados, avisar a seguradora.
- **Ajuste:** o resultado `r_vitima` deve mencionar a infração gravíssima e a penalidade do art. 176.
- **Ajuste:** o resultado `r_multa` relaciona TRN-003 (pontos). Adequado, porque a multa gera pontos. Manter.
- **Ajuste:** o resultado `r_venda` relaciona TRN-001 (multa). Adequado, porque o antigo dono responde por multas. Manter.
- **Conferir:** o resultado `r_pontos` diz "suspensão" sem número. Após a correção de TRN-003, citar os limites.

---

## Vocabulário para simplificar

| Termo técnico | Como dizer |
|---|---|
| auto de infração | documento da multa, feito no momento da infração |
| defesa prévia | primeira defesa contra a multa, antes da decisão |
| JARI | Junta Administrativa de Recursos de Infrações (segunda instância) |
| efeito suspensivo | a multa fica suspensa enquanto o recurso é analisado |
| sinistro | acidente de trânsito |
| infração gravíssima | a mais grave das infrações de trânsito |
| solidariamente | os dois respondem juntos pela dívida |
| certificado de registro | documento do veículo (CRV) |
| suspensão do direito de dirigir | proibição temporária de dirigir |

---

## Pendências da categoria (para correção futura)

1. **Incluir o prazo de 30 dias para defesa prévia** em TRN-001 (art. 281-A). Prioridade.
2. **Incluir o prazo de 60 dias e a responsabilidade solidária** em TRN-004 (art. 134). Prioridade.
3. **Corrigir `r_acid`** em GUI-010: texto próprio para acidente sem vítima. Prioridade.
4. **Incluir a classificação e a penalidade** do art. 176 em TRN-002 (gravíssima, multa de cinco vezes e suspensão).
5. **Incluir os números de pontos** (art. 259) e os limites de suspensão (art. 261) em TRN-003.
6. **Conferir o prazo do recurso** (art. 285 ou regulamento do Contran) em TRN-001.
7. **Conferir o art. 123 e o art. 255** (valores das multas) em TRN-002 e TRN-004.
8. **Conferir o SPVAT** (seguro obrigatório de danos pessoais) em TRN-002.

---

## O que não foi verificado nesta conferência

- Texto vigente no Planalto: a conferência foi feita contra o acervo `ctresb/leis`, que é auxiliar.
- Resoluções do Contran (prazos de recurso, procedimentos de transferência e tabelas): não estão no acervo.
- CTB, art. 123 (§1º) e art. 255: não lidos.
- Lei do seguro obrigatório (DPVAT/SPVAT): não está no acervo.
- Jurisprudência (STJ e STF) sobre pontuação e suspensão da CNH: nenhuma decisão foi lida.
- Órgãos de trânsito estaduais e municipais: não consultados, pois variam por estado.
