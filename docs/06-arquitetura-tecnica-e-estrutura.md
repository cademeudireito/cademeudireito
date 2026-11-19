# 06 — Arquitetura técnica e estrutura do projeto

## 1. Arquitetura

Site estático, gerado/buildado localmente e hospedado em serviço de páginas estáticas.

Stack prevista:
- HTML5 semântico.
- CSS3 com variáveis e componentes.
- JavaScript moderno.
- Vite.
- JSON para conteúdo e configuração.
- Git/GitHub.
- Cloudflare Pages (ou hospedagem estática equivalente).

Não adicionar framework pesado sem justificar e pedir aprovação. Vite não exige framework.

## 2. Requisitos técnicos

- Build reproduzível.
- Sem segredo ou chave privada no frontend.
- Sem API paga.
- Sem backend ou banco no MVP.
- Sem dependência de IA em produção.
- Conteúdo separado da apresentação.
- URLs estáveis e acessíveis.
- Imagens otimizadas e licenciadas.
- Fontes locais quando possível.
- Erros de carregamento tratados com mensagens claras.
- Console sem erros em páginas principais.

## 3. Estrutura sugerida

```text
cade-meu-direito/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── SearchBar.js
│   │   ├── CategoryCard.js
│   │   ├── ArticleCard.js
│   │   ├── Breadcrumbs.js
│   │   ├── QuickAnswer.js
│   │   ├── LegalReference.js
│   │   ├── GuideProgress.js
│   │   └── Notice.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Encyclopedia.js
│   │   ├── Category.js
│   │   ├── Article.js
│   │   ├── GuideIndex.js
│   │   ├── Guide.js
│   │   └── StaticPage.js
│   ├── data/
│   │   ├── categories.json
│   │   ├── articles/
│   │   └── guides/
│   ├── services/
│   │   ├── contentLoader.js
│   │   ├── search.js
│   │   └── guideEngine.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── utils/
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── LICENSE
└── docs/
```

Pode adaptar nomes e dividir componentes, mas preservar separação entre dados, lógica e interface.

## 4. Navegação e roteamento

Usar rotas legíveis. Pode usar roteador leve ou roteamento simples compatível com Vite, desde que:
- URLs funcionem ao recarregar diretamente.
- Hospedagem esteja configurada para fallback correto.
- Links internos sejam links reais.
- Back/forward do navegador funcione.
- Páginas não dependam de navegação iniciada apenas pela home.

## 5. Busca local

Implementar indexação em memória dos artigos publicados:
- Normalizar acentos.
- Converter para minúsculas.
- Pesquisar título, resumo, palavras-chave e sinônimos.
- Dar peso maior ao título e menor a palavras-chave.
- Exibir resultados relevantes.
- Não usar busca externa paga.

## 6. Carregamento de conteúdo

O carregador deve:
- Ler JSON validável.
- Filtrar status `published` na build pública.
- Detectar IDs/slug duplicados.
- Detectar categoria inexistente.
- Detectar referência legal sem URL.
- Não exibir rascunhos por acidente.
- Tratar arquivo ausente sem tela quebrada.

## 7. SEO básico

- Título e descrição únicos por página.
- URLs legíveis.
- HTML semântico.
- Open Graph básico.
- Sitemap XML gerado ou mantido.
- `robots.txt`.
- Canonical quando necessário.
- Dados estruturados apenas quando apropriados e corretos.
- Não usar marcação que afirme aconselhamento profissional ou autoridade oficial.

## 8. Desempenho

- Imagens comprimidas e dimensionadas.
- Lazy loading para imagens abaixo da dobra.
- Evitar bibliotecas grandes desnecessárias.
- Evitar scripts bloqueantes.
- CSS enxuto.
- Verificar Core Web Vitals em ambiente publicado quando possível.

## 9. Hospedagem

Preferência: Cloudflare Pages integrado ao GitHub, plano gratuito conforme limites e termos vigentes. Não prometer gratuidade perpétua nem ignorar limites do provedor.

Configuração:
- Build command: `npm run build`.
- Output directory: `dist`.
- Node versão LTS compatível com Vite.
- Deploy por push na branch principal.
- Preview deploy em pull requests, se disponível no plano.
- Domínio próprio é opcional e pode ter custo de registro.

## 10. Versionamento

- Repositório GitHub público se a intenção de código aberto for mantida.
- Commits claros.
- Não enviar `node_modules`, arquivos temporários, segredos ou dados pessoais.
- README com instalação, desenvolvimento, build, deploy e contribuição técnica.
- Licença de código escolhida conscientemente; confirmar compatibilidade de imagens/fontes e conteúdo de terceiros.
