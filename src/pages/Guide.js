import { h, link } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { GuideProgress } from '../components/GuideProgress.js';
import { Notice } from '../components/Notice.js';
import { LegalReference } from '../components/LegalReference.js';
import { StatusLabel } from '../components/StatusLabel.js';
import { getStart, answer, maxQuestionsFrom } from '../services/guideEngine.js';
import { NotFound } from './NotFound.js';

export async function Guide({ ctx, content }) {
  const guide = content.guides.find((g) => g.slug === ctx.params.slug);
  if (!guide) return NotFound({ ctx, content });

  // Estado só em memória (sem armazenamento, sem dados pessoais).
  const history = []; // [{ questionId, optionIndex }]
  let node = null;
  let selected = null;
  const total = maxQuestionsFrom(guide, guide.startQuestion);
  const panel = h('div', { class: 'guide__panel' });
  const live = h('div', { class: 'sr-only', 'aria-live': 'polite' });

  function restart() {
    history.length = 0;
    selected = null;
    try { node = getStart(guide); } catch { node = null; }
    draw();
  }

  function goTo(next) {
    node = next;
    selected = null;
    draw();
  }

  function renderQuestion(q) {
    const step = history.length + 1;
    const prev = history[history.length - 1];
    const name = `opt-${q.id}`;
    const form = h('form', { class: 'guide__form', novalidate: true });
    const fieldset = h('fieldset', { class: 'options' }, h('legend', { class: 'guide__question', tabindex: '-1', id: 'guide-heading', text: q.text }), q.helpText ? h('p', { class: 'muted', id: 'guide-help', text: q.helpText }) : null);
    const btnNext = h('button', { type: 'submit', class: 'btn btn--primary btn--lg', text: 'Continuar', disabled: selected === null });
    q.options.forEach((opt, i) => {
      const input = h('input', { type: 'radio', name, id: `${name}-${i}`, value: String(i), class: 'option__input', checked: selected === i });
      input.addEventListener('change', () => { selected = i; btnNext.disabled = false; });
      fieldset.append(h('div', { class: 'option' }, input, h('label', { class: 'option__label', for: `${name}-${i}`, text: opt.label })));
    });
    form.append(fieldset);
    const back = h('button', { type: 'button', class: 'btn btn--secondary', onClick: () => { const last = history.pop(); node = { type: 'question', node: guide.questions[last.questionId] }; selected = last.optionIndex; draw(); } }, icon('back', { size: 18 }), 'Voltar');
    form.append(h('div', { class: 'guide__actions' }, history.length ? back : null, btnNext, h('button', { type: 'button', class: 'btn btn--ghost', onClick: restart }, 'Reiniciar')));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (selected === null) return;
      history.push({ questionId: q.id, optionIndex: selected });
      goTo(answer(guide, q.id, selected));
    });
    if (prev && selected === null) selected = null;
    return h('div', {}, GuideProgress(Math.min(step, total), total), form);
  }

  function renderResult(r) {
    const art = content.articleById.get(r.articleId);
    const list = (items, ordered) => (items?.length ? h(ordered ? 'ol' : 'ul', { class: ordered ? 'numbered' : 'bullets' }, items.map((i) => h('li', { text: i }))) : null);
    const related = (r.relatedArticleIds ?? []).map((id) => content.articleById.get(id)).filter(Boolean);
    const refs = art?.legalReferences ?? [];
    return h(
      'div',
      { class: 'result' },
      h('h2', { class: 'guide__question', tabindex: '-1', id: 'guide-heading', text: r.title }),
      h('section', {}, h('h3', { text: 'O que suas respostas indicam' }), h('p', { text: r.indicates })),
      r.rule ? h('section', {}, h('h3', { text: 'Possível regra aplicável' }), h('p', { text: r.rule })) : null,
      r.steps?.length ? h('section', {}, h('h3', { text: 'Próximos passos gerais' }), list(r.steps, true)) : null,
      r.documents?.length ? h('section', {}, h('h3', { text: 'O que vale guardar' }), list(r.documents)) : null,
      r.caution ? Notice(r.caution, { tone: 'warning' }) : null,
      art
        ? h('p', {}, link(`/assunto/${art.slug}/`, { class: 'btn btn--primary btn--lg' }, 'Ler o conteúdo completo', icon('arrow', { size: 18 })))
        : Notice('O conteúdo completo ainda não está disponível.'),
      related.length ? h('section', {}, h('h3', { text: 'Veja também' }), h('ul', { class: 'bullets' }, related.map((a) => h('li', {}, link(`/assunto/${a.slug}/`, {}, a.title))))) : null,
      refs.length ? h('section', {}, h('h3', { text: 'Fontes oficiais' }), h('ul', { class: 'legal-list' }, refs.map((x) => LegalReference(x, content.site.fallbackLegalUrl)))) : null,
      Notice('Suas respostas não substituem análise individual. Se houver prazo correndo ou prejuízo relevante, procure a Defensoria Pública, um advogado ou o órgão competente.', { title: 'Aviso' }),
      h('div', { class: 'guide__actions' }, history.length ? h('button', { type: 'button', class: 'btn btn--secondary', onClick: () => { const last = history.pop(); node = { type: 'question', node: guide.questions[last.questionId] }; selected = last.optionIndex; draw(); } }, icon('back', { size: 18 }), 'Voltar') : null, h('button', { type: 'button', class: 'btn btn--ghost', onClick: restart }, icon('refresh', { size: 18 }), 'Recomeçar')),
    );
  }

  function draw() {
    if (!node) {
      panel.replaceChildren(Notice('Este guia não está disponível no momento.', { tone: 'warning' }));
      return;
    }
    panel.replaceChildren(node.type === 'question' ? renderQuestion(node.node) : renderResult(node.node));
    live.textContent = node.type === 'question' ? 'Nova pergunta.' : 'Resultado disponível.';
    panel.querySelector('#guide-heading')?.focus({ preventScroll: false });
  }

  try { node = getStart(guide); } catch { node = null; }
  if (node) {
    panel.replaceChildren(renderQuestion(node.node)); // primeira renderização sem roubar o foco
  } else draw();

  return {
    noindex: guide.status !== 'published',
    title: guide.title,
    description: guide.description,
    main: h('div', { class: 'container page page--narrow' }, Breadcrumbs([{ label: 'Início', href: '/' }, { label: 'Encontrar meus direitos', href: '/orientador/' }, { label: guide.title }]), h('h1', { text: guide.title }), StatusLabel(guide.status), Notice('Não digite dados pessoais. As respostas ficam só no seu navegador e não são enviadas a ninguém.'), live, panel),
  };
}
