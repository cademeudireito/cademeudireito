# 10 — Plano de execução e instrução para IA de desenvolvimento

## 1. Ordem de execução

A IA deverá trabalhar por etapas e entregar evidências de conclusão.

### Fase 0 — Leitura e planejamento
- Ler todos os arquivos Markdown deste pacote.
- Ler o README e os arquivos de cobertura/progresso/licença do repositório `ctresb/leis`.
- Resumir entendimento do escopo.
- Apresentar arquitetura e plano de arquivos.
- Apontar conflitos, lacunas e decisões que exigem aprovação.
- Não começar a codificar antes de apresentar esse plano.

### Fase 1 — Fundação técnica
- Criar Vite e estrutura de pastas.
- Configurar CSS tokens.
- Criar layout, rotas e componentes básicos.
- Criar build e README técnico.

### Fase 2 — Interface
- Construir header, hero, busca, destaque do orientador, categorias, populares, seção de três passos e footer.
- Construir categoria, artigo, índice do orientador e páginas institucionais.
- Aplicar responsividade e acessibilidade.

### Fase 3 — Dados e busca
- Criar modelos JSON.
- Criar carregador e validação.
- Implementar busca local.
- Garantir exclusão de conteúdo não publicado.

### Fase 4 — Guias
- Implementar motor de árvore de decisão.
- Criar três guias iniciais como rascunhos.
- Testar todos os caminhos.

### Fase 5 — Conteúdo
- Criar registros para o catálogo de aproximadamente 30 assuntos.
- Produzir rascunhos com estrutura editorial e referências de pesquisa.
- Não inventar fundamentação.
- Marcar todo material como pendente de revisão.
- Não incluir rascunhos no site público.

### Fase 6 — Qualidade
- Executar testes.
- Corrigir problemas.
- Apresentar relatório de páginas, dados, fluxos e pendências jurídicas.
- Preparar deploy, sem publicar conteúdo jurídico não validado.

## 2. Entregáveis obrigatórios

- Código-fonte completo.
- Site executável localmente.
- Build de produção.
- README de instalação e deploy.
- Dados JSON separados.
- Validador de conteúdo e guias.
- Testes básicos.
- Relatório de rotas implementadas.
- Relatório de assuntos cadastrados e status.
- Relatório de referências legais pendentes.
- Lista de decisões que precisam de aprovação.

## 3. Regras contra expansão indevida

Não acrescentar:
- Novas categorias.
- Novas funcionalidades.
- Contas ou login.
- Backend/banco.
- IA em produção.
- Formulários de envio.
- Chat.
- Comentários.
- Monetização.
Sem aprovação expressa.

Não substituir a identidade visual por template genérico. Não reduzir o site a uma página única. Não preencher o conteúdo com lorem ipsum na entrega final; usar conteúdo demonstrativo claramente identificado como não publicado.

## 4. Prompt para enviar à IA

Você é responsável pela implementação técnica do projeto Cadê Meu Direito?.

Leia integralmente todos os arquivos Markdown da documentação antes de agir. Leia também o repositório de pesquisa legislativa indicado: https://github.com/ctresb/leis, especialmente README.md, PROGRESSO.md, COBERTURA.md e LICENSE.

A documentação deste pacote é a especificação do projeto. Implemente o que está definido, respeitando escopo, identidade visual, arquitetura, dados, acessibilidade e critérios de aceite.

Não comece a codificar imediatamente. Primeiro entregue:
1. Resumo do entendimento do produto.
2. Plano de implementação.
3. Estrutura de pastas proposta.
4. Lista de páginas e componentes.
5. Lista de dados e guias.
6. Riscos, dúvidas e inconsistências.
7. Plano para garantir que conteúdo não validado não apareça no site público.

Aguarde aprovação do plano antes de iniciar a implementação.

### Regras jurídicas obrigatórias

O repositório `ctresb/leis` é auxiliar. O próprio README alerta que o conteúdo pode conter conversões automáticas e OCR, não substitui a publicação oficial e deve ser conferido na fonte indicada. Não importar o acervo inteiro nem tratar qualquer arquivo como automaticamente vigente.

Para cada assunto, criar rascunho com referências a verificar. Não inventar leis, artigos, prazos, exceções, decisões ou links. Não marcar conteúdo como validado. Todo conteúdo começa como `draft` ou `pending_review`; apenas `published` entra no build público. Se não conseguir confirmar uma informação, registrar a pendência.

### Regras de produto e tecnologia

O MVP é um site estático, gratuito, sem backend, banco de dados, login, pagamento, API paga ou IA em produção. Usar HTML, CSS, JavaScript, Vite e JSON, salvo justificativa aprovada para alteração.

Implementar enciclopédia, busca local, categorias, páginas de assunto e três guias interativos predefinidos. Os guias usam lógica determinística em JavaScript, não geração por IA.

Não criar comunidade, comentários, contribuições, painel administrativo ou funcionalidades fora do escopo.

### Regras de qualidade

Seguir o design descrito em `02-identidade-visual-e-ux.md`, incluindo a paleta, tipografia, composição da home, cartões, páginas de categoria/artigo e experiência mobile. Priorizar WCAG 2.2 AA como referência. Testar teclado, foco, contraste, zoom e leitores de tela.

Ao concluir, entregar relatório de conformidade com a documentação, testes executados, páginas implementadas, status de cada conteúdo, links oficiais pendentes e limitações conhecidas. Não declarar validação jurídica concluída.

## 5. Decisões que pertencem ao responsável do projeto

A IA deve pedir aprovação antes de:
- Alterar o escopo.
- Adicionar dependências externas relevantes.
- Mudar stack.
- Adicionar coleta de dados.
- Criar formulários ou integrações.
- Publicar conteúdo jurídico.
- Adotar nova categoria.
- Escolher licença se houver dúvida sobre ativos de terceiros.

## 6. Checklist final de entrega

- [ ] Todas as páginas do mapa implementadas.
- [ ] Identidade visual aplicada.
- [ ] Responsividade testada.
- [ ] Busca local funcional.
- [ ] Enciclopédia e categorias funcionais.
- [ ] Três guias funcionais.
- [ ] Dados separados da interface.
- [ ] Validador de JSON e guias.
- [ ] Conteúdo pendente bloqueado no build público.
- [ ] Avisos e páginas institucionais.
- [ ] README e instruções de deploy.
- [ ] Testes e relatório.
- [ ] Nenhuma funcionalidade fora do escopo sem aprovação.
