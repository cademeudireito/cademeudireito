# 01 — Escopo, navegação e mapa do site

## 1. Arquitetura de informação

Navegação principal:
- Início
- Encontrar meus direitos (orientador)
- Enciclopédia
- Sobre

CTA destacado: **Descobrir meus direitos**.

Rodapé:
- Início
- Enciclopédia
- Categorias
- Sobre o projeto
- Como usamos as leis
- Aviso educativo
- Acessibilidade
- Privacidade
- Repositório GitHub (quando publicado)
- Aviso: conteúdo informativo, não substitui orientação jurídica individual.

## 2. Mapa de páginas

| Rota sugerida | Página |
|---|---|
| `/` | Página inicial |
| `/enciclopedia/` | Índice de assuntos |
| `/categoria/consumidor/` | Categoria |
| `/categoria/trabalho/` | Categoria |
| `/categoria/saude/` | Categoria |
| `/categoria/moradia/` | Categoria |
| `/categoria/direitos-digitais/` | Categoria |
| `/categoria/educacao/` | Categoria |
| `/categoria/servicos-publicos/` | Categoria |
| `/assunto/:slug/` | Artigo/situação |
| `/orientador/` | Lista/entrada dos guias |
| `/orientador/:slug/` | Guia interativo |
| `/sobre/` | Sobre o projeto |
| `/fontes-e-metodologia/` | Como pesquisamos e validamos |
| `/aviso-educativo/` | Limites da informação |
| `/acessibilidade/` | Acessibilidade |
| `/privacidade/` | Privacidade e dados |

Rotas podem ser adaptadas à implementação, mas URLs devem ser legíveis, estáveis e sem acentos.

## 3. Categorias da primeira versão

### A. Consumidor
Compra presencial e online, cancelamento, arrependimento, defeitos, garantia, cobrança, contratos, serviços essenciais, bancos e fraudes de consumo.

### B. Trabalho
Salário, jornada, horas extras, férias, 13º, afastamentos, rescisão, FGTS, registro e direitos básicos de empregados. Distinguir empregado CLT, doméstico, temporário, aprendiz, servidor e autônomo quando necessário.

### C. Saúde e paciente
SUS, atendimento, urgência, medicamentos, exames, planos de saúde, negativas de cobertura, prontuário, consentimento e direitos do paciente. Regras de plano privado devem ser distinguidas das regras do SUS.

### D. Moradia e aluguel
Locação urbana, contrato, reajuste, caução, reparos, condomínio, despejo, entrega de imóvel e relações de vizinhança. Sinalizar quando a questão depende de legislação municipal ou do contrato.

### E. Direitos digitais
Dados pessoais, privacidade, golpes digitais, contas invadidas, comércio eletrônico, plataformas, conteúdo e segurança. Não prometer recuperação de valores ou contas.

### F. Educação
Matrícula, mensalidades, cobranças, transferência, documentos escolares, inclusão e direitos estudantis. Distinguir rede pública/privada e níveis de ensino.

### G. Serviços públicos e cidadania
Acesso a serviços, atendimento, documentos, protocolos, transparência, reclamações, assistência social e serviços municipais/estaduais/federais. Diferenciar competências e canais.

**Observação:** benefícios previdenciários, tributação, família, sucessões, trânsito, violência, imigração e processo judicial podem ser temas futuros. Não incluí-los no MVP sem aprovação e pesquisa própria.

## 4. Catálogo editorial inicial

Meta indicativa: aproximadamente 30 páginas, priorizando utilidade e qualidade. Não é obrigação preencher com conteúdo não validado.

### Consumidor — 12 assuntos
1. Comprei pela internet e quero desistir da compra.
2. Recebi um produto com defeito.
3. A loja não quer trocar o produto.
4. A garantia acabou: ainda posso reclamar?
5. Estão cobrando algo que não contratei.
6. Paguei e não recebi o produto ou serviço.
7. A empresa não cumpriu a oferta.
8. Quero cancelar um serviço ou assinatura.
9. Meu nome foi negativado por dívida que não reconheço.
10. Como contestar uma cobrança indevida.
11. Sofri um golpe em uma compra ou pagamento.
12. Como registrar uma reclamação de consumo.

### Trabalho — 6 assuntos
13. Meu salário está atrasado.
14. Não recebi minhas férias ou o adicional correspondente.
15. Estou fazendo horas extras: como entender meus direitos?
16. Fui demitido: quais verbas podem ser devidas?
17. Meu empregador não registrou meu contrato.
18. Não recebi meu 13º salário.

### Saúde — 4 assuntos
19. Meu plano de saúde negou um procedimento.
20. Como reclamar de demora ou negativa no SUS.
21. Tenho direito de acessar meu prontuário?
22. Quais informações devo receber antes de um procedimento?

### Moradia — 3 assuntos
23. O proprietário quer aumentar meu aluguel.
24. Quem deve pagar um reparo no imóvel alugado?
25. Recebi uma notificação de despejo: o que devo entender?

### Direitos digitais — 3 assuntos
26. Usaram meus dados pessoais sem autorização.
27. Minha conta foi invadida.
28. Sofri um golpe pela internet: quais providências considerar?

### Educação e serviços públicos — 2 assuntos
29. A escola/faculdade está cobrando uma taxa que considero indevida.
30. Não consigo atendimento ou resposta de um órgão público.

O catálogo é uma fila de produção, não uma declaração de que todos os temas já estão juridicamente pesquisados. Alguns assuntos devem ser subdivididos ou reescritos após a pesquisa.

## 5. Página inicial

Seções, nesta ordem:

1. Cabeçalho.
2. Hero com título, texto de apoio, busca e sugestões de busca.
3. Destaque para o Orientador.
4. Categorias.
5. Assuntos populares.
6. Explicação em três etapas: encontre a situação, entenda o direito, veja próximos passos.
7. Rodapé.

### Texto-base do hero
**Título:** Você tem direitos. A gente te ajuda a entender.

**Apoio:** Descubra o que a lei diz, entenda o que você pode fazer e encontre caminhos para resolver situações do dia a dia. Sem juridiquês e sem complicação.

**Busca:** “Ex.: a loja não quer devolver meu dinheiro…”

Sugestões:
- Quero cancelar uma compra.
- Não recebi meu salário.
- Meu plano de saúde negou atendimento.
- Tenho problemas com meu aluguel.

### Destaque do orientador
**Título:** Não sabe por onde começar?  
**Texto:** Responda algumas perguntas simples e descubra quais direitos podem se aplicar à sua situação.  
**Botão:** Me ajude a descobrir.

## 6. Busca e descoberta

- Busca local, sem serviço externo obrigatório.
- Pesquisar título, resumo, palavras-chave, sinônimos e categoria.
- Tolerar acentos e diferenças de maiúsculas/minúsculas.
- Exibir resultados com título, categoria e resumo.
- Estado vazio amigável: sugerir termos ou categorias.
- Não simular compreensão semântica por IA.
- Se não houver resultado, indicar o orientador e as categorias relacionadas.
- Ordenação por relevância simples e determinística.

## 7. Página de categoria

Deve conter:
- Breadcrumb.
- Ícone e nome da categoria.
- Descrição curta e humana.
- Busca restrita à categoria.
- Lista de assuntos em cartões.
- Filtros simples apenas quando houver volume suficiente.
- Estado vazio.
- Link para voltar à enciclopédia.

## 8. Página de assunto

Estrutura:
1. Breadcrumb.
2. Categoria discreta.
3. Título em linguagem cotidiana.
4. Resposta rápida em destaque.
5. “Entenda melhor”.
6. “Quando isso se aplica”.
7. “O que você pode fazer”.
8. “Quais documentos guardar”.
9. “E se não resolver?”
10. “O que diz a lei” com referências.
11. Exceções e pontos de atenção.
12. Conteúdos relacionados.
13. Data da revisão e status editorial.

Não exibir uma parede de texto legal. A íntegra da norma deve ser acessada por link oficial.

## 9. Página do orientador

Apresenta os guias disponíveis, explica que as respostas são educativas e oferece início sem cadastro.

## 10. Páginas institucionais

**Sobre:** propósito, gratuidade, independência, público e limites.

**Fontes e metodologia:** como os assuntos são escolhidos, como as normas são verificadas, como se atualiza conteúdo e como comunicar correções.

**Aviso educativo:** explicação visível de que o conteúdo é geral e não substitui orientação jurídica individual.

**Privacidade:** informar que o MVP não exige conta e deve evitar coleta de dados pessoais. Descrever hospedagem, logs técnicos e eventuais cookies realmente utilizados; não declarar ausência de coleta sem verificar o provedor.

**Acessibilidade:** compromisso, recursos e canal de contato somente se houver um endereço real configurado.
