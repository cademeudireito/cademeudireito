import { h, externalLink } from '../utils/dom.js';

const REF_LABEL = {
  pending_verification: 'Ainda não verificada',
  verified: 'Verificada',
  changed: 'Alterada',
  revoked: 'Revogada',
  uncertain: 'Situação incerta',
};
import { formatDate } from '../services/text.js';

export function LegalReference(ref, fallbackUrl) {
  const url = ref.officialUrl ?? null;
  return h(
    'li',
    { class: 'legal-ref' },
    h('p', { class: 'legal-ref__name', text: ref.name }),
    ref.provisions?.length ? h('p', { class: 'legal-ref__prov', text: `Dispositivos: ${ref.provisions.join('; ')}` }) : null,
    h('p', { class: 'legal-ref__meta', text: `Esfera: ${ref.sphere} · Situação: ${REF_LABEL[ref.status] ?? ref.status}${ref.checkedAt ? ` · Consulta em ${formatDate(ref.checkedAt)}` : ''}` }),
    ref.notes ? h('p', { class: 'legal-ref__notes', text: ref.notes }) : null,
    url
      ? externalLink(url, 'Ver texto oficial')
      : h('p', { class: 'legal-ref__pending' }, 'Link oficial específico ainda não registrado. Conferir no ', fallbackUrl ? externalLink(fallbackUrl, 'Portal da Legislação (Planalto)') : 'portal oficial', '.'),
  );
}
