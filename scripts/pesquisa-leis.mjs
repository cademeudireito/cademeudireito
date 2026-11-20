// Pesquisa assistida com o acervo ctresb/leis (auxiliar, NÃO valida vigência).
//   LEIS_DIR=/caminho/leis node scripts/pesquisa-leis.mjs            -> gera dossiê + atualiza referências dos artigos
//   LEIS_DIR=... node scripts/pesquisa-leis.mjs --check              -> só confere (não grava); sai com erro se faltar dispositivo
// Lê research/normas.json; escreve research/dossie/<chave>.json e o campo `research` nas referências.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, loadAllData } from './lib-data.mjs';

const LEIS = process.env.LEIS_DIR ?? '/home/claude/ctresb/leis';
const checkOnly = process.argv.includes('--check');
const registry = JSON.parse(await readFile(path.join(ROOT, 'research', 'normas.json'), 'utf8')).normas;
const byName = new Map(Object.entries(registry).map(([k, v]) => [v.name, k]));

async function findFile(n) {
  if (n.arquivo) return path.join(LEIS, n.arquivo);
  const dir = path.join(LEIS, 'federal', n.tipo, String(n.ano));
  const files = await readdir(dir);
  const hit = files.find((f) => new RegExp(`^[a-z]+-${n.numero}-${n.ano}-`).test(f));
  return hit ? path.join(dir, hit) : null;
}

function parseFront(md) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(md);
  const meta = {};
  if (m) for (const line of m[1].split('\n')) {
    const kv = /^([a-z_]+):\s*"?(.*?)"?\s*$/.exec(line);
    if (kv) meta[kv[1]] = kv[2];
  }
  const m2 = /^# (.+)$/m.exec(md);
  if (!meta.titulo && m2) meta.titulo = m2[1];
  return { meta, body: m ? md.slice(m[0].length) : md };
}

/** Divide o texto em artigos: chave "49", "49-A"; valor = texto. */
function splitArticles(body) {
  const arts = new Map();
  const re = /^\*{0,2}Art\.?\s*(\d+(?:\.\d{3})*)(?:\s*[º°o])?(?:\s*-\s*([A-Z]))?[.\s*]/gm;
  const marks = [];
  let m;
  while ((m = re.exec(body))) { const num = m[1].replace(/\./g, ''); marks.push({ key: m[2] ? `${num}-${m[2]}` : num, at: m.index }); }
  marks.forEach((mk, i) => {
    if (!arts.has(mk.key)) arts.set(mk.key, body.slice(mk.at, marks[i + 1]?.at ?? body.length).trim());
  });
  return arts;
}

/** Extrai números de artigos de textos como "arts. 18 a 26", "art. 7º, XVII", "arts. 2º, 3º, 9º e 29". */
export function citedArticles(provisions) {
  const out = new Set();
  for (const p of provisions) {
    const m = /^arts?\.\s*(.+)$/i.exec(p.trim());
    if (!m) continue;
    const head = m[1].split(/,\s*(?=[IVXL]+\b|parágrafo|§)/)[0]; // corta incisos/parágrafos
    const NUM = '\\d+(?:\\.\\d{3})*';
    const range = new RegExp(`(${NUM})[º°]?\\s+a\\s+(${NUM})`, 'g');
    let r;
    let rest = head;
    while ((r = range.exec(head))) {
      const lo = Number(r[1].replace(/\./g, ''));
      const hi = Number(r[2].replace(/\./g, ''));
      for (let i = lo; i <= hi && i - lo < 80; i++) out.add(String(i));
      rest = rest.replace(r[0], ' ');
    }
    for (const n of rest.matchAll(new RegExp(`(${NUM})[º°]?(?:-([A-Z]))?`, 'g'))) {
      const num = n[1].replace(/\./g, '');
      out.add(n[2] ? `${num}-${n[2]}` : num);
    }
  }
  return [...out];
}

const data = await loadAllData();
const cache = new Map();
async function load(key) {
  if (cache.has(key)) return cache.get(key);
  const n = registry[key];
  const file = await findFile(n);
  let rec = { key, name: n.name, found: false };
  if (file) {
    const { meta, body } = parseFront(await readFile(file, 'utf8'));
    rec = { key, name: n.name, found: true, file: path.relative(LEIS, file), meta, arts: splitArticles(body), cited: new Set() };
  }
  cache.set(key, rec);
  return rec;
}

let missing = 0;
const notFound = new Set();
for (const a of data.articles) {
  for (const ref of a.legalReferences) {
    const key = byName.get(ref.name);
    if (!key) continue; // sem equivalente no acervo (ANS, CFM, jurisprudência etc.)
    const rec = await load(key);
    if (!rec.found) { notFound.add(key); continue; }
    const wanted = citedArticles(ref.provisions);
    const present = wanted.filter((n) => rec.arts.has(n));
    const absent = wanted.filter((n) => !rec.arts.has(n));
    present.forEach((n) => rec.cited.add(n));
    if (absent.length) { missing += absent.length; console.warn(`✗ ${a.id}: ${ref.name} — artigo(s) não encontrado(s) no acervo: ${absent.join(', ')}`); }
    ref.research = {
      source: 'ctresb/leis',
      file: rec.file,
      fonte: rec.meta.fonte ?? null,
      versaoTexto: rec.meta.versao_texto ?? null,
      revogada: rec.meta.revogada === 'true',
      baixadoEm: rec.meta.baixado_em ?? null,
      provisionsFound: present,
      provisionsMissing: absent,
    };
    if (!ref.officialUrl && rec.meta.fonte) ref.officialUrl = rec.meta.fonte; // candidato; segue pending_verification
    if (rec.meta.revogada === 'true') ref.status = 'uncertain';
  }
}
for (const k of notFound) console.warn(`✗ norma não localizada no acervo: ${k} (${registry[k].name})`);

if (!checkOnly) {
  await mkdir(path.join(ROOT, 'research', 'dossie'), { recursive: true });
  for (const rec of cache.values()) {
    if (!rec.found) continue;
    const arts = Object.fromEntries([...rec.cited].sort((x, y) => parseInt(x) - parseInt(y)).map((n) => [n, rec.arts.get(n).slice(0, 2500)]));
    await writeFile(path.join(ROOT, 'research', 'dossie', `${rec.key}.json`), JSON.stringify({ key: rec.key, name: rec.name, file: rec.file, ...rec.meta, artigosCitados: arts }, null, 2) + '\n');
  }
  for (const a of data.articles) await writeFile(path.join(ROOT, 'src', 'data', 'articles', `${a.id}.json`), JSON.stringify(a, null, 2) + '\n');
}
console.log(`Normas consultadas: ${[...cache.values()].filter((r) => r.found).length}/${cache.size} | dispositivos ausentes: ${missing}`);
if (checkOnly && (missing || notFound.size)) process.exit(1);
