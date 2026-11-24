<p align="center">
  <img src="assets/banner.svg" alt="Cadê Meu Direito? — Seus direitos, sem juridiquês" width="100%">
</p>

<p align="center">
  <a href="https://cademeudireito.github.io/cademeudireito/"><strong>Acessar o site</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/cademeudireito/cademeudireito/actions/workflows/pages.yml"><img alt="Publicação" src="https://github.com/cademeudireito/cademeudireito/actions/workflows/pages.yml/badge.svg"></a>
</p>

# Cadê Meu Direito?

Um site gratuito que explica, em linguagem simples, os direitos do dia a dia no Brasil: consumidor, trabalho, saúde, moradia, educação, previdência, trânsito, internet e outros temas. Cada assunto traz a norma de referência, a fonte oficial e os canais para buscar ajuda.

## O que tem no site

- 13 áreas da vida, com 93 assuntos explicados.
- 13 guias passo a passo para situações específicas.
- Busca que aceita erros de digitação e jeitos diferentes de perguntar.
- Números úteis de três dígitos e canais de órgãos federais, com link para o site oficial de cada um.
- Funciona no celular e no computador, sem cadastro.

## Aviso

O conteúdo é educativo. Ele explica direitos e indica caminhos, mas não substitui a orientação de um advogado ou de um órgão de defesa do cidadão.

## Privacidade

O site não usa cookies, rastreadores, formulários, cadastro nem inteligência artificial. Todo o conteúdo fica no próprio site.

## Rodar localmente

Requisito: Node.js 20 ou superior. O projeto não usa dependências externas.

```bash
npm run dev        # servidor local com a versão em desenvolvimento
npm test           # testes
npm run validate   # confere o conteúdo
npm run build      # gera a versão para publicar, em dist/
```

## Publicação

O site é publicado com GitHub Pages. O fluxo está em `.github/workflows/pages.yml`: a cada envio para `main`, o conteúdo é validado, testado e publicado.

## Estrutura

```
src/        código do site e conteúdo (assuntos, guias, páginas e busca)
scripts/    build, validação e servidor local
tests/      testes automatizados
public/     ícone, robots.txt e cabeçalhos de segurança
```

## Encontrou um erro?

Abra uma issue neste repositório.
