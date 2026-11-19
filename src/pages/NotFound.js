import { h } from '../utils/dom.js';
import { EmptyState } from '../components/EmptyState.js';

export async function NotFound() {
  return {
    title: 'Página não encontrada',
    description: 'A página que você procura não existe ou ainda não foi publicada.',
    status: 404,
    main: h('div', { class: 'container page' }, h('h1', { text: 'Página não encontrada' }), EmptyState('Não achamos essa página', 'O endereço pode estar errado ou o conteúdo ainda não foi publicado.', [{ label: 'Ir para o início', href: '/' }, { label: 'Ver a enciclopédia', href: '/enciclopedia/' }])),
  };
}
