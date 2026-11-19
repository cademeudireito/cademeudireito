# 05 — Orientadores interativos

## 1. Objetivo

Guiar a pessoa por perguntas simples, uma por vez, para localizar conteúdo educativo relevante e apontar caminhos gerais.

Não é chatbot, consulta jurídica nem sistema de diagnóstico definitivo.

## 2. Requisitos de experiência

- Uma pergunta por tela.
- Linguagem cotidiana.
- Opções grandes e fáceis de tocar.
- Indicador de progresso quando a extensão do fluxo for conhecida.
- Botões Voltar, Continuar e Reiniciar.
- Respostas anteriores preservadas ao voltar.
- Não exigir login nem dados pessoais.
- Explicar por que uma pergunta é feita quando não for óbvio.
- Mostrar resultado com ressalvas e links para artigos publicados.
- Nunca apresentar resultado sem saída válida.
- Não pedir CPF, endereço, dados bancários, documentos médicos ou dados sensíveis.

## 3. Guias iniciais obrigatórios

1. Compra pela internet: quero desistir/cancelar.
2. Produto com defeito.
3. Cobrança que não reconheço.

## 4. Regras do motor

O motor de decisão deve ser independente da interface. Deve receber:
- Identificador do guia.
- Identificador da pergunta.
- Opção selecionada.

E retornar:
- Próxima pergunta; ou
- Resultado final.

Validações:
- Todo ID de pergunta deve ser único.
- Toda opção deve apontar para pergunta ou resultado existente.
- Não pode haver referência quebrada.
- Não pode haver ciclo infinito sem opção de saída.
- Todos os caminhos devem chegar a um resultado.
- Resultado deve apontar apenas para artigos `published`.
- Deve existir ação de reinício.
- O sistema deve tolerar conteúdo incompleto em rascunho sem quebrar a página pública.

## 5. Guia 1 — Compra pela internet e desistência

Perguntas a considerar:
1. A compra foi feita pela internet, telefone, catálogo ou fora do estabelecimento comercial?
2. Você está dentro do período legal contado conforme a hipótese aplicável?
3. É compra de produto ou contratação de serviço?
4. Você já recebeu/começou a utilizar o produto ou serviço?

O fluxo não deve calcular automaticamente o prazo sem dados suficientes. Deve explicar que o CDC prevê direito de arrependimento em determinadas contratações fora do estabelecimento e que a aplicação depende do enquadramento e das circunstâncias. Referência inicial: CDC, art. 49, e Decreto 7.962/2013, art. 5º, a conferir em fonte oficial.

Resultados possíveis:
- Pode haver direito de arrependimento: ler o artigo e comunicar formalmente o fornecedor.
- Prazo aparentemente ultrapassado: verificar defeito, descumprimento da oferta, cláusula abusiva ou outra base possível.
- Situação não coberta claramente pelo fluxo: orientar a conferir o contrato e procurar Procon/Defensoria conforme necessidade.

Não prometer devolução em todos os casos nem fixar prazo sem revisão jurídica.

## 6. Guia 2 — Produto com defeito

Perguntas a considerar:
1. É produto ou serviço?
2. O defeito impede o uso ou reduz o valor/qualidade?
3. Quando o defeito foi percebido?
4. O produto é durável ou não durável?
5. O fornecedor já foi comunicado?

O fluxo deve considerar CDC, especialmente arts. 18 a 26, e não simplificar o prazo sem distinguir produto durável/não durável, vício aparente/oculto e demais circunstâncias.

Resultados:
- Possível aplicação das regras de vício do produto.
- Necessidade de identificar a natureza do defeito e o marco temporal.
- Orientação para registrar reclamação e guardar nota fiscal, protocolos, fotos e comunicações.
- Se houver risco à segurança, orientar a interromper o uso e procurar canal competente.

Não afirmar que todo defeito dá direito imediato a dinheiro de volta.

## 7. Guia 3 — Cobrança não reconhecida

Perguntas:
1. A cobrança veio de banco/cartão, loja, serviço recorrente ou outro fornecedor?
2. Você reconhece a contratação?
3. A cobrança foi paga?
4. Houve negativação?
5. Você já contestou formalmente?

Resultados:
- Possível cobrança indevida em relação de consumo.
- Orientação para contestar no fornecedor e guardar protocolo.
- Encaminhamento ao canal regulatório apropriado quando envolver instituição financeira ou setor regulado.
- Artigo explicativo sobre cobrança e negativação, conforme o caso.

Não afirmar automaticamente que existe direito à devolução em dobro. Explicar que a regra possui requisitos e interpretação jurídica própria.

## 8. Modelo de resultado

Cada resultado deve apresentar:
1. Título simples.
2. “O que suas respostas indicam” com linguagem não conclusiva.
3. Possível direito/regra aplicável.
4. Próximos passos gerais.
5. Documentos/comprovantes que vale guardar.
6. Link para artigo completo publicado.
7. Fontes oficiais.
8. Aviso de que respostas não substituem análise individual.

## 9. Segurança de linguagem

Preferir:
- “Suas respostas indicam que pode valer a pena verificar…”
- “A regra geral pode ser…”
- “Há detalhes que podem mudar a resposta…”

Evitar:
- “Você ganhou.”
- “A empresa é obrigada a pagar.”
- “Você tem direito garantido.”
- “Não precisa procurar ajuda.”

## 10. Testes dos fluxos

Testar cada combinação de resposta relevante, incluindo:
- Caminho normal.
- Voltar e mudar resposta.
- Reiniciar.
- Resposta inválida.
- Resultado não encontrado.
- Artigo ainda não publicado.
- Janela mobile e teclado.
- Leitor de tela.
