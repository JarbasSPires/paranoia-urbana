// Converte as imagens de public/covers e public/pulse para WebP redimensionado
// e atualiza as referências em src/. Uso: npm run optimize-images
import { readdir, readFile, writeFile, rm, rename } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

// Largura máxima por pasta: capa da página, card da home e fundo do hero.
const FOLDERS = [
  { dir: 'public/covers', width: 1400 },
  { dir: 'public/pulse', width: 640, overrides: { 'hero.png': 1920 } },
];
const CONVERTIBLE = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const QUALITY = 80;

const renames = new Map();
let before = 0;
let after = 0;

for (const { dir, width, overrides = {} } of FOLDERS) {
  const abs = join(ROOT, dir);
  for (const file of await readdir(abs)) {
    const ext = extname(file).toLowerCase();
    if (!CONVERTIBLE.has(ext)) continue;
    const src = join(abs, file);
    const outName = `${basename(file, extname(file))}.webp`;
    const out = join(abs, outName);
    const input = await readFile(src);
    const meta = await sharp(input).metadata();
    const maxWidth = overrides[file] ?? width;
    // Já otimizada: WebP dentro da largura máxima.
    if (ext === '.webp' && (meta.width ?? 0) <= maxWidth) continue;

    const output = await sharp(input)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
    const tmp = `${out}.tmp`;
    await writeFile(tmp, output);
    if (src !== out) await rm(src);
    await rename(tmp, out);

    before += input.length;
    after += output.length;
    if (file !== outName) renames.set(file, outName);
    console.log(`${dir}/${file} → ${outName}  ${kb(input.length)} → ${kb(output.length)}`);
  }
}

// Atualiza referências (frontmatter "cover", imageMap da home, <img> nos textos).
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(astro|md|mdx|ts|js|mjs)$/.test(entry.name)) yield p;
  }
}

if (renames.size) {
  for await (const file of walk(join(ROOT, 'src'))) {
    let text = await readFile(file, 'utf8');
    let changed = false;
    for (const [from, to] of renames) {
      const re = new RegExp(`(["'/])${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=["'])`, 'g');
      const next = text.replace(re, `$1${to}`);
      if (next !== text) {
        text = next;
        changed = true;
      }
    }
    if (changed) {
      await writeFile(file, text);
      console.log(`atualizado: ${file.slice(ROOT.length)}`);
    }
  }
}

console.log(`\nTotal: ${kb(before)} → ${kb(after)}`);

function kb(n) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
}
