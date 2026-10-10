import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
await rm(path.join(root, 'dist'), { recursive: true, force: true });
await mkdir(path.join(root, 'dist'), { recursive: true });
await cp(path.join(root, 'public'), path.join(root, 'dist'), { recursive: true });
const rawOrigin = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
if (rawOrigin) {
  const origin = new URL(rawOrigin).origin;
  const htmlPath = path.join(root, 'dist/index.html');
  const html = await readFile(htmlPath, 'utf8');
  await writeFile(htmlPath, html.replace('</head>', `  <link rel="canonical" href="${origin}/">\n  <meta property="og:url" content="${origin}/">\n</head>`).replace('content="/assets/brand/social-preview.jpg"', `content="${origin}/assets/brand/social-preview.jpg"`));
  await writeFile(path.join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`);
  await writeFile(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
}
console.log('TEKNOFIX: site estático preparado em dist/');
