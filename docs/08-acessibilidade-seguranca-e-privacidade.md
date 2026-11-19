# 08 — Acessibilidade, segurança e privacidade

## 1. Acessibilidade

Meta: WCAG 2.2 nível AA como referência de projeto, sem declarar conformidade formal sem auditoria.

Obrigatório:
- HTML semântico.
- Ordem de títulos lógica.
- Navegação completa por teclado.
- Foco visível.
- Skip link para conteúdo principal.
- Labels associados aos campos.
- Mensagens de erro compreensíveis.
- Contraste adequado.
- Alvos de toque confortáveis (mínimo recomendado de 44×44 CSS px; botões principais em torno de 48 px de altura).
- Zoom até 200% sem perda funcional.
- Layout reflow em telas estreitas.
- Não transmitir informação apenas por cor.
- Alt text em imagens informativas.
- Respeitar `prefers-reduced-motion`.
- Links com texto que explique o destino.
- Testar com leitor de tela.

## 2. Linguagem acessível

- Uma ideia principal por parágrafo.
- Títulos descritivos.
- Instruções explícitas.
- Explicar termos jurídicos.
- Não usar siglas sem explicar.
- Evitar ironia, julgamento ou culpabilização.
- Não culpar vítimas de golpes ou pessoas em vulnerabilidade.

## 3. Privacidade por padrão

MVP não precisa de cadastro nem de dados pessoais.

Não solicitar:
- CPF.
- RG.
- Endereço residencial.
- Dados bancários.
- Senhas.
- Dados médicos.
- Documentos pessoais.
- Número de processo que identifique alguém, salvo se futuramente houver necessidade justificada e arquitetura adequada.

Não adicionar analytics, pixels, publicidade comportamental ou ferramentas de rastreamento sem aprovação, análise de privacidade e transparência.

Não afirmar “não coletamos dados” sem verificar logs e práticas do provedor de hospedagem.

## 4. Segurança

- HTTPS obrigatório na hospedagem final.
- Dependências atualizadas e minimizadas.
- Não armazenar segredos no repositório.
- Validar/sanitizar conteúdo.
- Não renderizar HTML não confiável.
- Política de segurança de conteúdo (CSP) quando viável.
- Links externos com `rel` seguro quando abrirem nova aba.
- Tratar conteúdo externo como não confiável.
- Não criar formulários sem destino real e política de tratamento.
- Não permitir que arquivos JSON de conteúdo executem código.

## 5. Links externos e encaminhamentos

- Usar links oficiais.
- Indicar quando o usuário sairá do site.
- Não inventar telefones, e-mails, endereços ou horários.
- Conferir a página de destino antes de publicar.
- Evitar links profundos quebrados; manter alternativa para página principal do órgão.

## 6. Situações urgentes e risco

Se um conteúdo abordar risco à saúde, segurança, violência, perda iminente de prazo ou prejuízo grave:
- Não oferecer diagnóstico.
- Não atrasar busca de ajuda urgente com questionário longo.
- Indicar serviços oficiais pertinentes, depois de confirmar o canal.
- Não inventar números de emergência.
- Incluir mensagem clara para procurar atendimento profissional/autoridade competente.

## 7. Política de cookies

Não instalar cookies não essenciais no MVP. Se hospedagem ou funcionalidade futura os utilizar, documentar finalidade, duração, fornecedor e base legal; implementar mecanismo de consentimento quando exigido.
