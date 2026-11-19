# 02 — Identidade visual, direção de arte e experiência

## 1. Direção criativa

O site deve parecer uma mistura de plataforma educativa contemporânea, revista digital acolhedora e guia público bem desenhado.

Personalidade:
- Humana, confiável, clara e otimista.
- Colorida com equilíbrio, sem excesso de estímulos.
- Editorial e moderna, sem aparência de escritório de advocacia.
- Simples sem parecer infantil.
- Institucional sem parecer portal governamental antigo.

Evitar:
- Martelo de juiz e balança como símbolos dominantes.
- Fotos genéricas de advogados, tribunais e pessoas de terno.
- Visual corporativo genérico.
- Ilustrações infantis ou excesso de emojis.
- Gradientes chamativos, sombras pesadas, excesso de caixas e texto minúsculo.

## 2. Paleta

| Token | Cor | Uso |
|---|---|---|
| `--color-bg` | `#F8F7F2` | fundo geral marfim |
| `--color-surface` | `#FFFFFF` | cartões e superfícies |
| `--color-text` | `#243747` | texto principal azul-marinho |
| `--color-muted` | `#657582` | texto secundário |
| `--color-primary` | `#187C72` | verde-petróleo da marca e ações |
| `--color-primary-soft` | `#E4F2ED` | fundos suaves e destaques |
| `--color-accent-warm` | `#F4C66A` | amarelo quente, detalhes |
| `--color-accent-coral` | `#E88C72` | coral, detalhes |
| `--color-accent-blue` | `#EAF0F5` | azul muito claro |
| `--color-border` | `#E5E8E6` | bordas |

Não usar cores de destaque em grandes áreas sem necessidade. Garantir contraste WCAG AA para texto e controles; ajustar combinações quando necessário, sem alterar a personalidade da paleta.

## 3. Tipografia

Fonte principal: **Nunito Sans**. Alternativa de acessibilidade: **Atkinson Hyperlegible** em contextos onde melhore a legibilidade.

Preferir arquivos locais licenciados e incluídos no projeto. Se não houver arquivos, usar fallback `Arial, Helvetica, sans-serif`. Não depender de Google Fonts remoto para a página funcionar.

Escala sugerida:
- Hero: 42–52 px desktop; 34–40 px mobile.
- Título de página: 32–40 px.
- Título de seção: 24–28 px.
- Título de cartão: 18–21 px.
- Corpo: 17–18 px.
- Texto auxiliar: 15–16 px.
- Legendas: 14–15 px.

Corpo com line-height entre 1.5 e 1.7. Evitar peso ultrafino, caixa alta prolongada e parágrafos longos.

## 4. Formas e espaçamento

- Cartões: raio 14–18 px.
- Botões: raio 10–14 px.
- Busca: raio 14–18 px.
- Painel hero: até 22 px.
- Bordas finas e sombras muito discretas.
- Espaço generoso entre seções.
- Largura de leitura de artigos: aproximadamente 680–820 px.
- Conteúdo geral com largura máxima consistente, aproximadamente 1120–1200 px.

## 5. Ícones e ilustrações

Usar ícones lineares consistentes (Lucide ou equivalente com licença compatível). Exemplos:
- Consumidor: sacola.
- Trabalho: maleta.
- Saúde: cruz/saúde.
- Moradia: casa.
- Direitos digitais: celular/escudo.
- Educação: livro.
- Serviços públicos: edifício/documento.
- Busca: lupa.
- Orientador: bússola ou balões de conversa.

Ilustração editorial da página inicial: pessoa comum segurando documento ou celular, com cartões flutuantes discretos (“Seus direitos”, “Informação clara”, “O que fazer?”). Não usar imagens de pessoas que pareçam retratar um caso real.

## 6. Cabeçalho

Desktop:
- Wordmark “Cadê Meu Direito?” à esquerda.
- Links: Início, Encontrar meus direitos, Enciclopédia, Sobre.
- CTA “Descobrir meus direitos”.
- Fundo claro, sem ocupar altura excessiva.

Mobile:
- Marca à esquerda.
- Menu acessível com botão identificado.
- CTA pode ficar no menu ou como ação compacta, sem apertar a navegação.
- Menu operável por teclado e leitor de tela.

## 7. Hero

Layout desktop em duas colunas:
- Esquerda: título, apoio, busca grande e sugestões clicáveis.
- Direita: ilustração editorial amigável e pequenos elementos flutuantes.

Layout mobile:
- Texto primeiro.
- Busca e sugestões logo abaixo.
- Ilustração depois, reduzida para não empurrar o conteúdo útil para muito longe.

## 8. Orientador em destaque

Cartão grande em verde suave, com ícone, título, texto e botão primário. Deve ser visualmente distinto sem competir com o hero.

## 9. Categorias

Título: “Qual assunto você precisa entender?”  
Apoio: “Escolha uma área e encontre respostas para situações do seu dia a dia.”

Cartões com ícone, nome, breve descrição e affordance de navegação. Grade:
- 3–4 colunas desktop conforme largura.
- 2 colunas tablet.
- 1–2 colunas mobile, mantendo cartões confortáveis.

## 10. Assuntos populares

Exemplos de cartões:
- Quero devolver uma compra feita pela internet.
- Meu produto apresentou defeito.
- Estão cobrando uma dívida que não reconheço.
- Não recebi minhas férias.
- Meu plano de saúde negou atendimento.
- O aluguel vai aumentar.

Mostrar apenas assuntos realmente cadastrados e aprovados para publicação.

## 11. Seção explicativa

Título: “Entender seus direitos não precisa ser complicado.”

Três passos:
1. Encontre sua situação.
2. Entenda o que a lei diz.
3. Descubra o que pode fazer.

Usar ícones e textos curtos.

## 12. Rodapé

Simples, organizado e legível. Incluir nome, slogan, navegação, categorias, páginas institucionais, GitHub e aviso educativo. Não inventar endereço de contato.

## 13. Componentes visuais

Criar componentes reutilizáveis:
- Header / MobileMenu.
- Footer.
- SearchBar.
- CategoryCard.
- ArticleCard.
- Breadcrumbs.
- QuickAnswer.
- LegalReference.
- StatusLabel (apenas em ambiente interno ou preview).
- RelatedArticles.
- GuideProgress.
- GuideOption.
- GuideResult.
- Callout / Notice.
- EmptyState.

Estados obrigatórios para botões e controles: padrão, hover, focus-visible, active e disabled.

## 14. Interações e movimento

- Transições curtas e discretas.
- Hover de cartão sutil (leve elevação ou mudança de borda).
- Sem carrossel automático.
- Sem animação piscante.
- Respeitar `prefers-reduced-motion`.
- Não depender de hover para revelar informação essencial.

## 15. Acessibilidade visual

- Corpo com tamanho confortável.
- Botões com altura mínima de 48 px.
- Áreas clicáveis generosas.
- Contraste suficiente.
- Foco de teclado claramente visível.
- Não usar apenas cor para comunicar status.
- Zoom de 200% sem perda de conteúdo.
- Texto alternativo para imagens informativas; ilustrações decorativas com alt vazio.
- Não usar texto incorporado em imagem para informação essencial.

## 16. Sensação final desejada

Ao entrar, a pessoa deve entender em poucos segundos:
1. Que o site explica direitos.
2. Que pode pesquisar seu problema.
3. Que pode escolher uma categoria.
4. Que existe um orientador passo a passo.
5. Que não precisa entender juridiquês nem criar conta.
