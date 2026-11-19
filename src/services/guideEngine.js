// Motor de árvore de decisão, independente da interface (docs/05 §4).
// Sem estado interno: recebe o guia, a pergunta e a opção; devolve a próxima etapa.

/** @returns {{type:'question', node:object}|{type:'result', node:object}} */
export function getStart(guide) {
  return resolve(guide, guide.startQuestion);
}

function resolve(guide, id) {
  if (guide.questions?.[id]) return { type: 'question', node: guide.questions[id] };
  if (guide.results?.[id]) return { type: 'result', node: guide.results[id] };
  throw new Error(`Destino inexistente no guia ${guide.id}: "${id}"`);
}

/**
 * @param {object} guide
 * @param {string} questionId
 * @param {number} optionIndex índice da opção escolhida
 */
export function answer(guide, questionId, optionIndex) {
  const question = guide.questions?.[questionId];
  if (!question) throw new Error(`Pergunta inexistente: "${questionId}"`);
  const option = question.options?.[optionIndex];
  if (!option) throw new Error(`Opção inválida (${optionIndex}) na pergunta "${questionId}"`);
  return resolve(guide, option.next);
}

/** Maior número de perguntas que ainda podem ser feitas a partir de `id` (inclui a própria). */
export function maxQuestionsFrom(guide, id, memo = new Map(), visiting = new Set()) {
  if (!guide.questions[id]) return 0;
  if (memo.has(id)) return memo.get(id);
  if (visiting.has(id)) return 0; // ciclo: o validador acusa; aqui apenas evitamos recursão infinita
  visiting.add(id);
  let best = 0;
  for (const opt of guide.questions[id].options) {
    best = Math.max(best, maxQuestionsFrom(guide, opt.next, memo, visiting));
  }
  visiting.delete(id);
  memo.set(id, best + 1);
  return best + 1;
}

/**
 * Valida a estrutura do guia. Retorna lista de mensagens de erro (vazia = ok).
 * @param {object} guide
 * @param {Map<string, object>} [articlesById] artigos existentes (para checar resultados)
 */
export function validateGuide(guide, articlesById = null) {
  const errors = [];
  const where = `Guia ${guide?.id ?? '?'}`;
  const questions = guide.questions ?? {};
  const results = guide.results ?? {};

  if (!guide.startQuestion) errors.push(`${where}: startQuestion ausente`);
  else if (!questions[guide.startQuestion] && !results[guide.startQuestion])
    errors.push(`${where}: startQuestion "${guide.startQuestion}" não existe`);

  for (const [key, q] of Object.entries(questions)) {
    if (q.id !== key) errors.push(`${where}: pergunta "${key}" com id divergente ("${q.id}")`);
    if (!q.text) errors.push(`${where}: pergunta "${key}" sem texto`);
    if (!Array.isArray(q.options) || q.options.length < 2)
      errors.push(`${where}: pergunta "${key}" precisa de ao menos 2 opções`);
    for (const [i, opt] of (q.options ?? []).entries()) {
      if (!opt.label) errors.push(`${where}: opção ${i} de "${key}" sem rótulo`);
      if (!questions[opt.next] && !results[opt.next])
        errors.push(`${where}: opção "${opt.label}" de "${key}" aponta para "${opt.next}" inexistente`);
    }
  }
  for (const id of Object.keys(results))
    if (questions[id]) errors.push(`${where}: id "${id}" usado como pergunta e como resultado`);

  for (const [key, r] of Object.entries(results)) {
    if (r.id !== key) errors.push(`${where}: resultado "${key}" com id divergente ("${r.id}")`);
    if (!r.title) errors.push(`${where}: resultado "${key}" sem título`);
    if (!r.indicates) errors.push(`${where}: resultado "${key}" sem "indicates"`);
    if (!r.articleId) errors.push(`${where}: resultado "${key}" sem articleId`);
    else if (articlesById && !articlesById.has(r.articleId))
      errors.push(`${where}: resultado "${key}" aponta para artigo inexistente "${r.articleId}"`);
    for (const rel of r.relatedArticleIds ?? [])
      if (articlesById && !articlesById.has(rel))
        errors.push(`${where}: resultado "${key}" relaciona artigo inexistente "${rel}"`);
  }

  // Alcançabilidade e terminação (sem ciclo sem saída).
  const reachable = new Set();
  const stack = [guide.startQuestion];
  while (stack.length) {
    const id = stack.pop();
    if (!id || reachable.has(id)) continue;
    reachable.add(id);
    for (const opt of questions[id]?.options ?? []) stack.push(opt.next);
  }
  for (const id of [...Object.keys(questions), ...Object.keys(results)])
    if (!reachable.has(id)) errors.push(`${where}: "${id}" é órfão (inalcançável)`);

  const terminates = new Set(Object.keys(results));
  let changed = true;
  while (changed) {
    changed = false;
    for (const [id, q] of Object.entries(questions)) {
      if (!terminates.has(id) && (q.options ?? []).some((o) => terminates.has(o.next))) {
        terminates.add(id);
        changed = true;
      }
    }
  }
  for (const id of Object.keys(questions))
    if (!terminates.has(id)) errors.push(`${where}: pergunta "${id}" não leva a nenhum resultado`);

  // Ciclos (mesmo com saída, a árvore deve ser acíclica para o indicador de progresso).
  const color = new Map();
  const dfs = (id) => {
    if (!questions[id]) return;
    color.set(id, 1);
    for (const opt of questions[id].options ?? []) {
      if (color.get(opt.next) === 1) errors.push(`${where}: ciclo detectado em "${id}" → "${opt.next}"`);
      else if (!color.has(opt.next)) dfs(opt.next);
    }
    color.set(id, 2);
  };
  if (questions[guide.startQuestion]) dfs(guide.startQuestion);

  return errors;
}

/** Enumera todos os caminhos (listas de [perguntaId, índiceOpção]) até cada resultado. Útil para testes. */
export function enumeratePaths(guide) {
  const paths = [];
  const walk = (id, trail) => {
    const q = guide.questions[id];
    if (!q) {
      paths.push({ trail, resultId: id });
      return;
    }
    q.options.forEach((opt, i) => walk(opt.next, [...trail, [id, i]]));
  };
  walk(guide.startQuestion, []);
  return paths;
}
