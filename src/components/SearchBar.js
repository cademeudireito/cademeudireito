import { h } from '../utils/dom.js';
import { icon } from '../utils/icons.js';
import { navigate } from '../services/router.js';

/**
 * Formulário de busca. Sem JS, envia GET para `action` (?q=...). Com JS, navega sem recarregar
 * ou chama `onInput` para resultados ao vivo.
 */
export function SearchBar({ id, label = 'Buscar', value = '', placeholder, action = '/enciclopedia/', category = null, onInput = null, large = false }) {
  const input = h('input', {
    id, name: 'q', type: 'search', class: 'search__input', value, placeholder,
    autocomplete: 'off', enterkeyhint: 'search',
  });
  const form = h(
    'form',
    { class: `search${large ? ' search--large' : ''}`, role: 'search', action, method: 'get' },
    h('label', { class: 'sr-only', for: id, text: label }),
    h('span', { class: 'search__icon' }, icon('search')),
    input,
    category ? h('input', { type: 'hidden', name: 'categoria', value: category }) : null,
    h('button', { class: 'btn btn--primary search__btn', type: 'submit', text: 'Buscar' }),
  );
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (onInput) {
      onInput(input.value);
      return;
    }
    const qs = new URLSearchParams();
    if (input.value.trim()) qs.set('q', input.value.trim());
    navigate(`${action}${qs.toString() ? '?' + qs : ''}`);
  });
  if (onInput) input.addEventListener('input', () => onInput(input.value));
  return form;
}
