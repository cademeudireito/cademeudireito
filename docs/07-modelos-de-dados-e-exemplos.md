# 07 — Modelos de dados e exemplos

## 1. Categorias

Exemplo `categories.json`:

```json
[
  {
    "id": "consumidor",
    "slug": "consumidor",
    "title": "Direitos do consumidor",
    "description": "Entenda seus direitos ao comprar produtos e contratar serviços.",
    "icon": "shopping-bag",
    "order": 1
  }
]
```

Ícones devem vir de conjunto consistente e conhecido. Não aceitar nomes arbitrários sem fallback.

## 2. Artigos

Estrutura sugerida:

```json
{
  "id": "CON-001",
  "slug": "desistir-compra-internet",
  "title": "Comprei pela internet e quero desistir da compra",
  "category": "consumidor",
  "summary": "Entenda quando pode existir direito de arrependimento e como comunicar a decisão.",
  "keywords": ["compra online", "cancelar compra", "arrependimento", "devolução"],
  "quickAnswer": "Em determinadas contratações feitas fora do estabelecimento comercial, o Código de Defesa do Consumidor prevê direito de arrependimento. A aplicação depende da situação concreta.",
  "sections": {
    "explanation": "Texto explicativo em linguagem simples.",
    "whenApplies": ["Condição a verificar."],
    "exceptions": ["Limites e situações que exigem análise específica."],
    "steps": [
      "Localize o pedido e os dados da contratação.",
      "Comunique formalmente o fornecedor por canal que permita guardar comprovante.",
      "Guarde protocolo, mensagens e comprovantes."
    ],
    "documentsToKeep": ["Comprovante de compra", "Número do pedido", "Protocolos e mensagens"],
    "ifDenied": ["Procure o canal de atendimento adequado e, se necessário, o Procon competente."]
  },
  "legalReferences": [
    {
      "name": "Lei nº 8.078/1990 — Código de Defesa do Consumidor",
      "sphere": "federal",
      "provisions": ["art. 49"],
      "officialUrl": "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm",
      "status": "pending_verification",
      "checkedAt": null,
      "notes": "Conferir redação vigente, hipótese de incidência, marco de contagem e exceções antes de publicar."
    },
    {
      "name": "Decreto nº 7.962/2013",
      "sphere": "federal",
      "provisions": ["art. 5º"],
      "officialUrl": "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm",
      "status": "pending_verification",
      "checkedAt": null,
      "notes": "Conferir texto vigente e aplicação ao caso."
    }
  ],
  "relatedArticles": ["CON-006", "CON-007"],
  "lastReviewed": null,
  "reviewStatus": "pending_review",
  "reviewNotes": "Rascunho ilustrativo. Não publicar até validação.",
  "status": "draft"
}
```

**Importante:** o exemplo é um modelo de dados e rascunho editorial, não conteúdo aprovado para publicação. O carregador público deve excluir `draft` e `pending_review`.

## 3. Campos obrigatórios

- `id`: único e estável.
- `slug`: único e legível.
- `title`.
- `category`.
- `summary`.
- `keywords`.
- `status`.
- `reviewStatus`.
- `legalReferences` (pode ser lista vazia somente quando a natureza do conteúdo justificar; caso contrário, não publicar).
- `lastReviewed`.

## 4. Status de artigo

- `draft`
- `pending_review`
- `published`
- `outdated`
- `archived`

Status de referência legal:
- `pending_verification`
- `verified`
- `changed`
- `revoked`
- `uncertain`

## 5. Guias interativos

Exemplo estrutural:

```json
{
  "id": "GUI-001",
  "slug": "compra-online-desistencia",
  "title": "Quero desistir de uma compra pela internet",
  "description": "Responda algumas perguntas para encontrar informações relevantes.",
  "status": "draft",
  "startQuestion": "q1",
  "questions": {
    "q1": {
      "id": "q1",
      "text": "Onde você fez a compra?",
      "helpText": "Pense no canal em que o contrato foi fechado.",
      "options": [
        { "label": "Pela internet ou telefone", "next": "q2" },
        { "label": "Em uma loja física", "next": "r2" },
        { "label": "Não tenho certeza", "next": "r3" }
      ]
    },
    "q2": {
      "id": "q2",
      "text": "Você sabe quando a contratação aconteceu?",
      "options": [
        { "label": "Sim", "next": "r1" },
        { "label": "Não", "next": "r3" }
      ]
    }
  },
  "results": {
    "r1": {
      "id": "r1",
      "title": "Pode existir direito de arrependimento",
      "body": "Confira as condições e os detalhes no conteúdo indicado.",
      "articleId": "CON-001",
      "caution": "A aplicação depende das circunstâncias e da conferência dos requisitos legais."
    },
    "r2": {
      "id": "r2",
      "title": "A regra pode ser diferente",
      "body": "A compra feita presencialmente não segue automaticamente a mesma regra de arrependimento.",
      "articleId": "CON-003"
    },
    "r3": {
      "id": "r3",
      "title": "Precisamos de mais informações",
      "body": "Leia o conteúdo geral e procure orientação adequada se houver prazo ou prejuízo relevante.",
      "articleId": "CON-001"
    }
  },
  "legalReferences": [],
  "lastReviewed": null,
  "reviewStatus": "pending_review"
}
```

O exemplo demonstra estrutura. O guia não deve ser publicado até que todas as opções, resultados, artigos e referências sejam validados.

## 6. Validação automática de dados

Criar script de validação que verifique:
- JSON válido.
- IDs e slugs únicos.
- Categoria existente.
- Campos obrigatórios.
- Links em formato URL.
- Status permitido.
- Referências internas existentes.
- Guias sem perguntas/resultados órfãos.
- Todo caminho de guia chega a resultado.
- Artigo vinculado ao resultado está publicado.
- Nenhum rascunho é incluído na build pública.

## 7. Conteúdo e HTML

Renderizar texto como texto, não inserir HTML arbitrário vindo de JSON. Se houver Markdown, usar parser seguro e sanitização adequada. Não permitir scripts, iframes ou HTML não confiável em conteúdo editorial.
