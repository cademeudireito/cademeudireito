# 04 — Padrão editorial e validação jurídica

## 1. Voz e linguagem

Tom: acolhedor, direto, respeitoso e não paternalista.

Preferir:
- “Você pode…”
- “Em geral…”
- “Isso depende de…”
- “Guarde comprovantes…”
- “Veja onde confirmar…”

Evitar:
- “É causa ganha.”
- “A empresa é obrigada em qualquer hipótese.”
- “Você com certeza tem direito.”
- “Basta processar.”
- “A lei sempre diz…”

Frases curtas, voz ativa, exemplos simples e explicação de termos técnicos na primeira ocorrência.

## 2. Estrutura obrigatória de artigo

1. Título em linguagem cotidiana.
2. Resumo de uma ou duas frases.
3. Resposta rápida com ressalva quando necessária.
4. Explicação do direito.
5. Quando se aplica.
6. Quando pode não se aplicar / exceções.
7. O que fazer passo a passo.
8. O que guardar como prova/documento.
9. Se não resolver: canais e alternativas.
10. Base legal e links oficiais.
11. Data da última revisão.
12. Aviso educativo.

Não exigir que todos os campos sejam longos. Se um tópico não se aplicar, omitir ou explicar a razão; nunca preencher com conteúdo inventado.

## 3. Separação dos tipos de informação

Cada artigo deve distinguir:
- **Texto legal:** referência ao artigo e link para a norma oficial; não reproduzir grandes blocos sem necessidade.
- **Explicação:** tradução do significado em linguagem simples.
- **Aplicação prática:** passos gerais, sem afirmar que resolvem todo caso.
- **Exceções:** hipóteses em que a regra pode mudar.
- **Pontos que dependem do caso:** fatos que precisam ser avaliados individualmente.

## 4. Modelo de referência legal

Cada referência deve conter:
- Nome oficial da norma.
- Número e ano.
- Esfera (federal, estadual, distrital, municipal).
- Dispositivo específico (artigo, parágrafo, inciso).
- Órgão emissor, quando pertinente.
- URL oficial.
- Data de consulta.
- Situação verificada (vigente, alterada, revogada, parcialmente vigente ou pendente).
- Observação sobre redação/alterações relevantes.

Não usar link de pesquisa genérico como fonte final. Linkar a página oficial específica da norma ou do ato.

## 5. Processo de pesquisa e validação

Para cada assunto:
1. Formular a pergunta jurídica precisa.
2. Identificar o regime jurídico e os fatos que alteram a resposta.
3. Localizar a norma no repositório auxiliar, se útil.
4. Abrir a fonte oficial primária.
5. Conferir texto integral e dispositivo citado.
6. Conferir alterações, revogações, vetos, regulamentação e vigência.
7. Pesquisar jurisprudência vinculante/relevante quando a resposta depender dela.
8. Conferir órgãos e procedimentos atuais.
9. Escrever o rascunho em linguagem simples.
10. Fazer revisão de coerência: a explicação não pode ir além do que a fonte sustenta.
11. Registrar as pendências.
12. Só após aprovação, alterar status para `published`.

A IA de desenvolvimento não deve declarar uma matéria juridicamente validada por conta própria. A validação é uma etapa humana separada.

## 6. Status

Valores permitidos:
- `draft`
- `pending_review`
- `published`
- `outdated`
- `archived`

Somente `published` pode ser incluído no build público.

## 7. Checklist jurídico por artigo

- [ ] O assunto está dentro do escopo aprovado?
- [ ] A norma foi identificada corretamente?
- [ ] O artigo/parágrafo citado realmente diz o que o texto afirma?
- [ ] A fonte é oficial e o link abre?
- [ ] A redação está vigente na data da revisão?
- [ ] Foram verificadas alterações e revogações?
- [ ] Há regulamentação específica?
- [ ] Há diferença por estado/município?
- [ ] Há exceções ou requisitos omitidos?
- [ ] O prazo, se houver, tem marco inicial explicado?
- [ ] Jurisprudência relevante foi considerada quando necessária?
- [ ] Os passos sugeridos são realistas e seguros?
- [ ] O canal indicado é oficial e atual?
- [ ] O texto distingue regra geral de caso concreto?
- [ ] A data e o responsável pela revisão foram registrados?

## 8. Política de prazos

Nunca publicar prazo isolado sem:
- Fonte normativa.
- Evento que inicia a contagem.
- Unidade de contagem (dias corridos/úteis, meses etc.), se definida.
- Regra de início/fim e feriados, quando pertinente.
- Hipóteses de suspensão, interrupção ou exceção relevantes.
- Aviso quando a contagem depende dos fatos.

Se não for possível confirmar, não apresentar número como definitivo.

## 9. Aviso padrão

“Este conteúdo tem finalidade educativa e apresenta informações gerais. A aplicação das regras pode depender dos detalhes do caso, do contrato e da legislação vigente. O material não substitui orientação jurídica individual. Se houver risco de perda de prazo, prejuízo relevante ou necessidade de medida urgente, procure a Defensoria Pública, um advogado ou o órgão competente.”

## 10. Atualização

Cada conteúdo deve ter:
- `lastReviewed` (data ISO).
- `reviewStatus`.
- `reviewNotes` interno.
- `legalReferences`.
- `reviewTrigger` opcional (mudança normativa, decisão judicial, alteração de canal).

Criar uma rotina editorial documentada para revisar periodicamente e quando houver alteração legal conhecida. Não alegar monitoramento automático se ele não existir.

## 11. Correções

Disponibilizar instrução de como reportar erro somente quando houver um canal real de contato. Registrar a correção, a data, a versão anterior e o motivo. Não incluir formulário que envie dados sem infraestrutura e política de privacidade correspondentes.
