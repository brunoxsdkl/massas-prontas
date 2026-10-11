import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { products, guideChoices } from '../public/products.js';
import { siteConfig } from '../public/site.config.js';
import { createProjectSummary, isValidWhatsAppNumber, whatsAppUrl } from '../public/contact.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const html = await readFile(path.join(publicDir, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs HTML duplicados');
const attributes = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
for (const url of attributes) {
  if (url.startsWith('/')) await access(path.join(publicDir, url));
  if (url.startsWith('#')) assert(ids.includes(url.slice(1)), `Âncora ausente: ${url}`);
}
for (const match of html.matchAll(/\b(?:aria-controls|aria-labelledby|for)="([^"]+)"/g)) {
  for (const id of match[1].split(' ')) assert(ids.includes(id), `Referência HTML ausente: ${id}`);
}
assert.equal(products.length, 6);
assert.deepEqual(products.map((p) => [p.id, p.category]), [
  ['ac1-azul', 'AC1'], ['ac1-verde', 'AC1'], ['ac2-laranja', 'AC2'], ['ac3-roxa', 'AC3'], ['massa-pronta', 'Massa pronta'], ['cimento-comum', 'Cimento'],
]);
assert.equal(new Set(products.map((p) => p.id)).size, 6);
for (const product of products) {
  assert(ids.includes(`tab-${product.id}`), `Tab ausente: ${product.id}`);
  await access(path.join(publicDir, `assets/products/${product.id}.webp`));
  await access(path.join(publicDir, `assets/products/${product.id}-small.webp`));
  assert(product.description && product.caution && product.uses.length === 3);
}
assert.equal(products.find(p => p.id === 'cimento-comum').weightKg, 5);
for (const choice of Object.values(guideChoices)) assert(products.some((p) => p.id === choice.productId));
assert.equal(isValidWhatsAppNumber(''), false);
assert.equal(isValidWhatsAppNumber('55DDNNNNNNNNN'), false);
assert.equal(whatsAppUrl('', 'teste'), null);
assert.equal(isValidWhatsAppNumber('5511999999999'), true);
const message = createProjectSummary({ productName: 'AC2 Laranja — 20 kg', city: ' Curitiba ', area: '60', description: 'Piso externo' });
assert(message.includes('Cidade: Curitiba') && message.includes('60 m²') && message.includes('Piso externo'));
const url = new URL(whatsAppUrl('5511999999999', message));
assert.equal(url.searchParams.get('text'), message);
assert(!createProjectSummary({ productName: 'AC1 Azul' }).includes('undefined'));
assert(siteConfig.whatsappNumber === '' || isValidWhatsAppNumber(siteConfig.whatsappNumber), 'Número comercial deve conter DDI e somente dígitos');
assert(!html.includes('mailto:') && !html.includes('wa.me/'), 'Contato não confirmado no HTML');
for (const name of await readdir(path.join(publicDir, 'assets/products'))) assert(!name.endsWith('.png'), 'Usar imagens otimizadas no deploy');
console.log('Verificado: 6 produtos, guia, navegação, referências de arquivos, configuração de contato e geração de resumo.');
