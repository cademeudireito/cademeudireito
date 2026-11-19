# 09 — Testes, critérios de aceite e implantação

## 1. Critérios gerais de aceite

O MVP só estará pronto quando:
- Todas as páginas previstas estiverem implementadas.
- Navegação funcionar em desktop e mobile.
- Busca retornar resultados corretos e estados vazios claros.
- Categorias e artigos publicados estiverem conectados corretamente.
- Guias não tiverem caminhos quebrados.
- Conteúdo não validado não aparecer na versão pública.
- Referências e links tiverem sido conferidos.
- Não houver erros relevantes no console.
- Build e deploy forem reproduzíveis.
- Acessibilidade básica tiver sido testada.
- README explicar como executar e publicar.

## 2. Testes funcionais

### Navegação
- Todos os links do header e footer funcionam.
- Breadcrumbs funcionam.
- URLs diretas carregam.
- Recarregar uma rota não gera 404.
- Voltar/avançar do navegador funciona.

### Busca
- Busca por título.
- Busca por palavra-chave.
- Busca sem acento.
- Busca sem resultados.
- Busca vazia.
- Busca mobile.
- Resultados não incluem rascunhos.

### Categorias e artigos
- Categoria abre.
- Artigo abre.
- Relacionados existem.
- Fonte abre em nova aba quando previsto.
- Status e data aparecem corretamente.
- Conteúdo pendente não aparece publicamente.

### Orientadores
- Cada opção aponta para destino válido.
- Voltar preserva respostas.
- Reiniciar limpa o fluxo.
- Todos os caminhos chegam a resultado.
- Resultados apontam para artigo publicado.
- Sem coleta de dados pessoais.

## 3. Testes responsivos

Testar ao menos:
- 360 px de largura.
- 390 px.
- 768 px.
- 1024 px.
- 1440 px.

Verificar:
- Sem rolagem horizontal indevida.
- Busca utilizável.
- Menu mobile operável.
- Botões com tamanho adequado.
- Artigos confortáveis de ler.
- Ilustração não empurra conteúdo importante para baixo.

## 4. Testes de acessibilidade

- Teclado apenas.
- Foco visível.
- Contraste.
- Leitor de tela em fluxos principais.
- Zoom 200%.
- Redução de movimento.
- Labels e mensagens de erro.
- Hierarquia de títulos.
- Links compreensíveis fora de contexto.

## 5. Testes de qualidade editorial/jurídica

Para cada página que for publicada:
- Conferir lei, artigo e URL.
- Confirmar situação da norma.
- Conferir exceções e requisitos.
- Verificar data da revisão.
- Verificar se a linguagem não promete resultado.
- Conferir se o órgão/canal está atualizado.
- Verificar abrangência territorial.
- Verificar se a explicação não extrapola a fonte.

## 6. Teste de compreensão com público

Teste de aceitação essencial:
Uma pessoa de aproximadamente 65–70 anos, com pouca familiaridade com internet, deve conseguir:
1. Entrar e entender o propósito do site.
2. Encontrar a busca.
3. Escolher uma categoria.
4. Abrir um assunto.
5. Encontrar a resposta principal.
6. Identificar um próximo passo.

Observar sem conduzir. Se a pessoa não conseguir, simplificar.

## 7. Desempenho e estabilidade

- Build sem erros.
- Sem erros de console.
- Imagens otimizadas.
- Sem dependência externa essencial que possa falhar.
- Lighthouse ou ferramenta equivalente para diagnóstico, sem prometer nota específica.
- Links externos conferidos.
- Sem arquivos grandes desnecessários.

## 8. Implantação

1. Criar repositório GitHub.
2. Configurar branch principal.
3. Configurar build Vite.
4. Conectar à hospedagem estática.
5. Definir build command e pasta de saída.
6. Configurar fallback de rotas, se necessário.
7. Ativar HTTPS.
8. Testar URL de preview.
9. Revisar conteúdo e política de privacidade.
10. Publicar apenas conteúdos `published`.

## 9. Antes de cada publicação

- [ ] Build concluído.
- [ ] Testes funcionais.
- [ ] Testes mobile.
- [ ] Links oficiais.
- [ ] Conteúdo publicado validado.
- [ ] Sem rascunhos na build.
- [ ] Sem segredos no repositório.
- [ ] Aviso educativo presente.
- [ ] Privacidade condiz com ferramentas reais.
