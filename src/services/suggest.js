// Monta o link para sugerir um tema. Sem servidor próprio: abre um formulário pré-preenchido
// (hoje, uma "issue" do GitHub do projeto), onde o responsável recebe a sugestão.
export function suggestionLink(site, term) {
  const base = site?.suggestionUrl;
  if (!base) return null;
  const clean = String(term ?? '').trim().slice(0, 120);
  const url = new URL(base);
  url.searchParams.set('title', `Sugestão de tema: ${clean}`);
  url.searchParams.set(
    'body',
    `**O que a pessoa procurou:** ${clean}\n\n**O que gostaria de saber (opcional):**\n\n\n_Não escreva dados pessoais (nome, CPF, telefone, endereço)._`,
  );
  return url.href;
}
