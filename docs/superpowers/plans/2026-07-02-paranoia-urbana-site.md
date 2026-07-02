# Paranoia Urbana Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a tabloid-style Astro static site for the Paranoia Urbana zine, populated with the real Edition #1 content, deployed to GitHub Pages under `JarbasSPires/paranoia-urbana`.

**Architecture:** Astro with native Markdown Content Collections — one collection per content type (`reviews`, `interviews`, `columns`, `documentaries`, `shows`). No backend, no database. Every page is statically generated at build time from `.md` files under `src/content/`. New editions are published by adding new `.md` files.

**Tech Stack:** Astro (static site generator), plain `.astro` components (no UI framework needed), CSS (no framework), GitHub Actions for CI/deploy, GitHub Pages for hosting.

---

## Before you start

- Project root: `C:\Users\Eterc\Documents\Paranoia` (already a git repo with one commit — the design spec).
- Source images already extracted from the zine's Word doc and copied into `assets-source/` at the project root:
  - `assets-source/capa-edicao-01.png` — cover art
  - `assets-source/logo.png` — skull logo + contact info
  - `assets-source/coluna-reflexao.png` — editorial page (for reference only, text already transcribed below)
  - `assets-source/documentarios.png` — documentary review page (reference only)
  - `assets-source/entrevista-odiar.png` — interview page (reference only)
  - `assets-source/resenha-flower.png` — Flower review page (reference only)
  - `assets-source/resenha-violator.png` — Violator feature page (reference only)
  - `assets-source/poema-encerramento.png` — closing poem page (reference only)
- Node.js and npm must be installed (`node -v` should print v18 or newer). If missing, install Node before Task 1.
- All commands below assume the working directory is the project root unless stated otherwise.

---

## Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/pages/index.astro` (placeholder, replaced in Task 6)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "paranoia-urbana",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.16.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

GitHub Pages serves project sites (not user/org sites) from a subpath, so `site` and `base` must be set to match the `JarbasSPires/paranoia-urbana` repo.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jarbasspires.github.io',
  base: '/paranoia-urbana',
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/base"
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 5: Create placeholder `src/pages/index.astro`**

```astro
---
---
<html lang="pt-BR">
  <body>
    <h1>Paranoia Urbana</h1>
  </body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: completes with no errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 7: Verify the dev server boots**

Run: `npm run build`
Expected: `dist/paranoia-urbana/index.html` is created, build exits 0.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro
git commit -m "Scaffold Astro project"
```

---

## Task 2: Global tabloid stylesheet

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write the stylesheet**

Implements the approved visual direction: black background, white/off-white text, serif headlines, dense multi-column grid, thin rule lines — no color accents, no paper-collage texture.

```css
:root {
  --bg: #0a0a0a;
  --fg: #eaeaea;
  --muted: #999;
  --rule: #444;
  --rule-strong: #fff;
  --font-headline: Georgia, 'Times New Roman', serif;
  --font-body: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  line-height: 1.5;
}

a {
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
}

a:hover {
  border-bottom-color: var(--fg);
}

.site-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 3px solid var(--rule-strong);
}

.site-header img.logo {
  height: 56px;
  width: auto;
}

.site-title {
  font-family: var(--font-headline);
  font-weight: 900;
  font-size: 28px;
  letter-spacing: 1px;
  margin: 0;
}

.site-nav {
  margin-left: auto;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}

.article-card {
  border-top: 1px solid var(--rule);
  padding-top: 10px;
}

.article-card .kicker {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--muted);
}

.article-card h3 {
  font-family: var(--font-headline);
  font-size: 20px;
  margin: 4px 0 8px;
}

.article-card p {
  font-size: 14px;
  color: var(--fg);
}

.article-list {
  list-style: none;
  padding: 0;
}

.article-list li {
  border-bottom: 1px solid var(--rule);
  padding: 12px 0;
}

.article-body {
  max-width: 700px;
  margin: 0 auto;
  font-size: 16px;
}

.article-body h1 {
  font-family: var(--font-headline);
  font-size: 32px;
}

.article-meta {
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 20px;
}

.links-list {
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--rule);
}

.site-footer {
  border-top: 3px solid var(--rule-strong);
  padding: 20px;
  margin-top: 40px;
  font-size: 13px;
  color: var(--muted);
  text-align: center;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "Add tabloid stylesheet"
```

---

## Task 3: Content collections schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Write the schema**

```ts
import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  date: z.date(),
  summary: z.string(),
  band: z.string().optional(),
  cover: z.string().optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
});

const showSchema = z.object({
  band: z.string(),
  date: z.date(),
  venue: z.string(),
  city: z.string(),
  link: z.string().optional(),
});

const reviews = defineCollection({ type: 'content', schema: articleSchema });
const interviews = defineCollection({ type: 'content', schema: articleSchema });
const columns = defineCollection({ type: 'content', schema: articleSchema });
const documentaries = defineCollection({ type: 'content', schema: articleSchema });
const shows = defineCollection({ type: 'content', schema: showSchema });

export const collections = { reviews, interviews, columns, documentaries, shows };
```

- [ ] **Step 2: Create empty collection directories so Astro recognizes them**

```bash
mkdir -p src/content/reviews src/content/interviews src/content/columns src/content/documentaries src/content/shows
```

- [ ] **Step 3: Verify the build still succeeds with no content yet**

Run: `npm run build`
Expected: exits 0 (empty collections are valid).

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts
git commit -m "Add content collections schema"
```

---

## Task 4: Copy zine media into public assets

**Files:**
- Create: `public/logo.png`
- Create: `public/covers/capa-edicao-01.png`
- Create: `public/covers/coluna-reflexao.png`
- Create: `public/covers/documentarios.png`
- Create: `public/covers/entrevista-odiar.png`
- Create: `public/covers/resenha-flower.png`
- Create: `public/covers/resenha-violator.png`
- Create: `public/covers/poema-encerramento.png`

- [ ] **Step 1: Copy files from `assets-source/` into `public/`**

```bash
mkdir -p public/covers
cp assets-source/logo.png public/logo.png
cp assets-source/capa-edicao-01.png public/covers/capa-edicao-01.png
cp assets-source/coluna-reflexao.png public/covers/coluna-reflexao.png
cp assets-source/documentarios.png public/covers/documentarios.png
cp assets-source/entrevista-odiar.png public/covers/entrevista-odiar.png
cp assets-source/resenha-flower.png public/covers/resenha-flower.png
cp assets-source/resenha-violator.png public/covers/resenha-violator.png
cp assets-source/poema-encerramento.png public/covers/poema-encerramento.png
```

- [ ] **Step 2: Verify files copied**

Run: `ls public/covers`
Expected: 7 files listed, plus `public/logo.png` exists.

- [ ] **Step 3: Commit**

```bash
git add public/logo.png public/covers
git commit -m "Add zine cover art and logo assets"
```

---

## Task 5: Layout, Header, Footer components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro:1-8` (use the new layout instead of the Task 1 placeholder)

- [ ] **Step 1: Create `src/components/Header.astro`**

```astro
---
const base = import.meta.env.BASE_URL;
const links = [
  { href: `${base}`, label: 'Home' },
  { href: `${base}resenhas/`, label: 'Resenhas' },
  { href: `${base}entrevistas/`, label: 'Entrevistas' },
  { href: `${base}colunas/`, label: 'Colunas' },
  { href: `${base}documentarios/`, label: 'Documentários' },
  { href: `${base}agenda/`, label: 'Agenda' },
  { href: `${base}quem-somos/`, label: 'Quem Somos' },
];
---
<header class="site-header">
  <a href={base}><img class="logo" src={`${base}logo.png`} alt="Paranoia Urbana" /></a>
  <h1 class="site-title"><a href={base}>PARANOIA URBANA</a></h1>
  <nav class="site-nav">
    {links.map((link) => <a href={link.href}>{link.label}</a>)}
  </nav>
</header>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
<footer class="site-footer">
  <p>Paranoia Urbana &mdash; Zine Digital e Impresso &mdash; Iniciativa Samamba Thrash!</p>
  <p>
    <a href="https://www.instagram.com/paranoiaurbana/" target="_blank" rel="noopener">Instagram</a>
    &middot;
    <a href="mailto:jarbas.spires@gmail.com">jarbas.spires@gmail.com</a>
  </p>
</footer>
```

- [ ] **Step 3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
}
const { title } = Astro.props;
---
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} · Paranoia Urbana</title>
  </head>
  <body>
    <Header />
    <main class="container">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Replace the Task 1 placeholder `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Home">
  <p>Site em construção.</p>
</BaseLayout>
```

(This is temporary — Task 6 replaces it with the real home page.)

- [ ] **Step 5: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0, `dist/paranoia-urbana/index.html` contains the string `PARANOIA URBANA`.

Run: `grep -o "PARANOIA URBANA" dist/paranoia-urbana/index.html`
Expected: prints `PARANOIA URBANA` at least once.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/pages/index.astro
git commit -m "Add base layout, header and footer"
```

---

## Task 6: Home page

**Files:**
- Modify: `src/pages/index.astro` (replace Task 5 stub)

- [ ] **Step 1: Write the home page**

Pulls every entry from `reviews`, `interviews`, `columns`, `documentaries`, tags each with its category and URL, sorts by date descending, and renders them in the tabloid grid.

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const base = import.meta.env.BASE_URL;

const [reviews, interviews, columns, documentaries] = await Promise.all([
  getCollection('reviews'),
  getCollection('interviews'),
  getCollection('columns'),
  getCollection('documentaries'),
]);

const sections = [
  { items: reviews, kicker: 'Resenha', path: 'resenhas' },
  { items: interviews, kicker: 'Entrevista', path: 'entrevistas' },
  { items: columns, kicker: 'Coluna', path: 'colunas' },
  { items: documentaries, kicker: 'Documentário', path: 'documentarios' },
];

const allItems = sections
  .flatMap(({ items, kicker, path }) =>
    items.map((item) => ({
      title: item.data.title,
      summary: item.data.summary,
      date: item.data.date,
      kicker,
      href: `${base}${path}/${item.slug}/`,
    }))
  )
  .sort((a, b) => b.date.valueOf() - a.date.valueOf());
---
<BaseLayout title="Home">
  <div class="article-grid">
    {allItems.map((item) => (
      <article class="article-card">
        <p class="kicker">{item.kicker}</p>
        <h3><a href={item.href}>{item.title}</a></h3>
        <p>{item.summary}</p>
      </article>
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify the build succeeds (still zero content, so the grid is empty)**

Run: `npm run build`
Expected: exits 0, no errors about missing collections.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add home page with cross-collection article grid"
```

---

## Task 7: Reviews list and detail pages

**Files:**
- Create: `src/pages/resenhas/index.astro`
- Create: `src/pages/resenhas/[slug].astro`

- [ ] **Step 1: Create the list page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const base = import.meta.env.BASE_URL;
const items = (await getCollection('reviews')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---
<BaseLayout title="Resenhas">
  <h2>Resenhas</h2>
  <ul class="article-list">
    {items.map((item) => (
      <li>
        <p class="kicker">{item.data.band ?? 'Resenha'}</p>
        <h3><a href={`${base}resenhas/${item.slug}/`}>{item.data.title}</a></h3>
        <p>{item.data.summary}</p>
      </li>
    ))}
  </ul>
</BaseLayout>
```

- [ ] **Step 2: Create the detail page**

```astro
---
import { getCollection, getEntryBySlug } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const items = await getCollection('reviews');
  return items.map((item) => ({ params: { slug: item.slug } }));
}

const { slug } = Astro.params;
const entry = await getEntryBySlug('reviews', slug!);
const { Content } = await entry!.render();
const base = import.meta.env.BASE_URL;
---
<BaseLayout title={entry!.data.title}>
  <article class="article-body">
    <h1>{entry!.data.title}</h1>
    <p class="article-meta">
      {entry!.data.band && <>{entry!.data.band} &middot; </>}
      {entry!.data.date.toLocaleDateString('pt-BR')}
    </p>
    {entry!.data.cover && (
      <img src={`${base}covers/${entry!.data.cover}`} alt={entry!.data.title} style="max-width:100%" />
    )}
    <Content />
    {entry!.data.links && entry!.data.links.length > 0 && (
      <div class="links-list">
        <p><strong>Links:</strong></p>
        <ul>
          {entry!.data.links.map((link) => (
            <li><a href={link.url} target="_blank" rel="noopener">{link.label}</a></li>
          ))}
        </ul>
      </div>
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0 (no review content yet, so `getStaticPaths` returns an empty array — that's valid).

- [ ] **Step 4: Commit**

```bash
git add src/pages/resenhas
git commit -m "Add reviews list and detail pages"
```

---

## Task 8: Interviews list and detail pages

**Files:**
- Create: `src/pages/entrevistas/index.astro`
- Create: `src/pages/entrevistas/[slug].astro`

- [ ] **Step 1: Create the list page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const base = import.meta.env.BASE_URL;
const items = (await getCollection('interviews')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---
<BaseLayout title="Entrevistas">
  <h2>Entrevistas</h2>
  <ul class="article-list">
    {items.map((item) => (
      <li>
        <p class="kicker">{item.data.band ?? 'Entrevista'}</p>
        <h3><a href={`${base}entrevistas/${item.slug}/`}>{item.data.title}</a></h3>
        <p>{item.data.summary}</p>
      </li>
    ))}
  </ul>
</BaseLayout>
```

- [ ] **Step 2: Create the detail page**

```astro
---
import { getCollection, getEntryBySlug } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const items = await getCollection('interviews');
  return items.map((item) => ({ params: { slug: item.slug } }));
}

const { slug } = Astro.params;
const entry = await getEntryBySlug('interviews', slug!);
const { Content } = await entry!.render();
const base = import.meta.env.BASE_URL;
---
<BaseLayout title={entry!.data.title}>
  <article class="article-body">
    <h1>{entry!.data.title}</h1>
    <p class="article-meta">
      {entry!.data.band && <>{entry!.data.band} &middot; </>}
      {entry!.data.date.toLocaleDateString('pt-BR')}
    </p>
    {entry!.data.cover && (
      <img src={`${base}covers/${entry!.data.cover}`} alt={entry!.data.title} style="max-width:100%" />
    )}
    <Content />
    {entry!.data.links && entry!.data.links.length > 0 && (
      <div class="links-list">
        <p><strong>Links:</strong></p>
        <ul>
          {entry!.data.links.map((link) => (
            <li><a href={link.url} target="_blank" rel="noopener">{link.label}</a></li>
          ))}
        </ul>
      </div>
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/pages/entrevistas
git commit -m "Add interviews list and detail pages"
```

---

## Task 9: Columns list and detail pages

**Files:**
- Create: `src/pages/colunas/index.astro`
- Create: `src/pages/colunas/[slug].astro`

- [ ] **Step 1: Create the list page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const base = import.meta.env.BASE_URL;
const items = (await getCollection('columns')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---
<BaseLayout title="Colunas">
  <h2>Colunas</h2>
  <ul class="article-list">
    {items.map((item) => (
      <li>
        <p class="kicker">Coluna</p>
        <h3><a href={`${base}colunas/${item.slug}/`}>{item.data.title}</a></h3>
        <p>{item.data.summary}</p>
      </li>
    ))}
  </ul>
</BaseLayout>
```

- [ ] **Step 2: Create the detail page**

```astro
---
import { getCollection, getEntryBySlug } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const items = await getCollection('columns');
  return items.map((item) => ({ params: { slug: item.slug } }));
}

const { slug } = Astro.params;
const entry = await getEntryBySlug('columns', slug!);
const { Content } = await entry!.render();
const base = import.meta.env.BASE_URL;
---
<BaseLayout title={entry!.data.title}>
  <article class="article-body">
    <h1>{entry!.data.title}</h1>
    <p class="article-meta">{entry!.data.date.toLocaleDateString('pt-BR')}</p>
    {entry!.data.cover && (
      <img src={`${base}covers/${entry!.data.cover}`} alt={entry!.data.title} style="max-width:100%" />
    )}
    <Content />
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/pages/colunas
git commit -m "Add columns list and detail pages"
```

---

## Task 10: Documentaries list and detail pages

**Files:**
- Create: `src/pages/documentarios/index.astro`
- Create: `src/pages/documentarios/[slug].astro`

- [ ] **Step 1: Create the list page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const base = import.meta.env.BASE_URL;
const items = (await getCollection('documentaries')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---
<BaseLayout title="Documentários">
  <h2>Documentários</h2>
  <ul class="article-list">
    {items.map((item) => (
      <li>
        <p class="kicker">Documentário</p>
        <h3><a href={`${base}documentarios/${item.slug}/`}>{item.data.title}</a></h3>
        <p>{item.data.summary}</p>
      </li>
    ))}
  </ul>
</BaseLayout>
```

- [ ] **Step 2: Create the detail page**

```astro
---
import { getCollection, getEntryBySlug } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const items = await getCollection('documentaries');
  return items.map((item) => ({ params: { slug: item.slug } }));
}

const { slug } = Astro.params;
const entry = await getEntryBySlug('documentaries', slug!);
const { Content } = await entry!.render();
const base = import.meta.env.BASE_URL;
---
<BaseLayout title={entry!.data.title}>
  <article class="article-body">
    <h1>{entry!.data.title}</h1>
    <p class="article-meta">{entry!.data.date.toLocaleDateString('pt-BR')}</p>
    {entry!.data.cover && (
      <img src={`${base}covers/${entry!.data.cover}`} alt={entry!.data.title} style="max-width:100%" />
    )}
    <Content />
    {entry!.data.links && entry!.data.links.length > 0 && (
      <div class="links-list">
        <p><strong>Links:</strong></p>
        <ul>
          {entry!.data.links.map((link) => (
            <li><a href={link.url} target="_blank" rel="noopener">{link.label}</a></li>
          ))}
        </ul>
      </div>
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/pages/documentarios
git commit -m "Add documentaries list and detail pages"
```

---

## Task 11: Agenda page (shows)

**Files:**
- Create: `src/pages/agenda/index.astro`

No shows exist yet for this edition, so the page must handle the empty state instead of assuming content.

- [ ] **Step 1: Create the page**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const items = (await getCollection('shows')).sort(
  (a, b) => a.data.date.valueOf() - b.data.date.valueOf()
);
---
<BaseLayout title="Agenda">
  <h2>Agenda de Shows</h2>
  {items.length === 0 ? (
    <p>Nenhum show cadastrado no momento. Fique de olho no <a href="https://www.instagram.com/paranoiaurbana/" target="_blank" rel="noopener">Instagram</a>.</p>
  ) : (
    <ul class="article-list">
      {items.map((item) => (
        <li>
          <p class="kicker">{item.data.date.toLocaleDateString('pt-BR')}</p>
          <h3>{item.data.band}</h3>
          <p>{item.data.venue} &mdash; {item.data.city}</p>
          {item.data.link && <a href={item.data.link} target="_blank" rel="noopener">Mais informações</a>}
        </li>
      ))}
    </ul>
  )}
</BaseLayout>
```

- [ ] **Step 2: Verify the build succeeds and shows the empty state**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Nenhum show cadastrado" dist/paranoia-urbana/agenda/index.html`
Expected: prints `Nenhum show cadastrado`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/agenda
git commit -m "Add agenda page with empty-state handling"
```

---

## Task 12: Quem Somos page

**Files:**
- Create: `src/pages/quem-somos/index.astro`

- [ ] **Step 1: Create the page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;
---
<BaseLayout title="Quem Somos">
  <article class="article-body">
    <h1>Quem Somos</h1>
    <img src={`${base}logo.png`} alt="Paranoia Urbana" style="max-width:280px" />
    <p>
      Paranoia Urbana é um zine digital e impresso de metal e punk (d-beat,
      raw punk, crust, thrash), iniciativa da Samamba Thrash. Trazemos
      entrevistas, resenhas, colunas e cobertura do underground.
    </p>
    <p>
      Este zine não pertence apenas a quem o edita, mas a todos que fazem a
      cena. Qualquer pessoa pode enviar textos, sugerir entrevistas ou
      resenhas. Nosso objetivo é promover a união entre punks e bangers —
      comunidades com estilos diferentes, unidas pela mesma causa — e
      erradicar elementos fascistas da cena. Paranoia Urbana segue uma
      ideologia libertária antifascista.
    </p>
    <p>
      <strong>Instagram:</strong>{' '}
      <a href="https://www.instagram.com/paranoiaurbana/" target="_blank" rel="noopener">
        @paranoiaurbana
      </a>
    </p>
    <p>
      <strong>Contato:</strong> <a href="mailto:jarbas.spires@gmail.com">jarbas.spires@gmail.com</a>
    </p>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "libertária antifascista" dist/paranoia-urbana/quem-somos/index.html`
Expected: prints `libertária antifascista`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/quem-somos
git commit -m "Add Quem Somos page"
```

---

## Task 13: Populate review content

**Files:**
- Create: `src/content/reviews/flower-hardly-a-dream.md`
- Create: `src/content/reviews/violator-united-for-thrash.md`

- [ ] **Step 1: Create the Flower review**

```markdown
---
title: "Flower — Hardly a Dream"
date: 2026-07-01
summary: "Crust punk com uma pitada de metal — a Profane Existence apresentando uma banda incrível."
band: "Flower"
cover: "resenha-flower.png"
links:
  - label: "Bandcamp"
    url: "https://flowernewyorkcity.bandcamp.com/album/hardly-a-dream"
---

Que banda foda, meus caros! Sinto como se estivesse ouvindo Nausea pela
primeira vez. O ambiente e a estética, a Profane Existence nos apresentando
essa banda incrível, é simplesmente incrível. Não há palavras para descrever.

Se você curte Nausea, Sacrilege, Antischism, prepare-se, porque este álbum
vai te emocionar. Não dá para não ouvir o *Hardly a Dream* inteiro; é uma
pedrada atrás da outra. Faixas como "Lethargy" e "Retribution" são
incríveis, um crust punk com aquela pitada de metal, simplesmente
sensacional.

Que safra de bandas boas temos com Flower e Hope, não é mesmo? Elas estão no
topo dessas bandas maravilhosas que estão surgindo. E que venham muitas
outras! Incrível, simplesmente incrível!
```

- [ ] **Step 2: Create the Violator feature**

```markdown
---
title: "Violator — United for Thrash"
date: 2026-07-01
summary: "Thrash metal old school autêntico, com pé no hardcore e a alma do underground."
band: "Violator"
cover: "resenha-violator.png"
links:
  - label: "Bandcamp"
    url: "https://violatorthrash.bandcamp.com/album/scenarios-of-brutality"
  - label: "Facebook"
    url: "https://www.facebook.com/Violatorthrash/?locale=pt_BR"
---

O que dizer de uma banda que ainda nos dias atuais mantém a mesma proposta
de criar um autêntico e clássico Thrash Metal Old School! Uma banda que
aborda temas que nos levam a refletir sobre a vida cotidiana e seus
problemas, e que sempre permaneceu no underground, com seus membros
defendendo com paixão essa subcultura que engloba o metal, hardcore, punk e
rock! Com orgulho, apresento a vocês o Violator, caso ainda não o conheçam.

Esta é simplesmente uma banda que deixou sua marca na minha geração e
certamente deixará nas futuras, para aqueles que apreciam a fase
"Schizophrenia" do Sepultura, Kreator, Vio-lence e o antigo Thrash
brasileiro, representado por bandas como Taurus, Mutilator, MX e Executer,
com um toque sutil do bom e velho Hardcore.

Amigos, escutem e balancem suas cabeças vigorosamente, pois estão diante de
uma das melhores bandas de Thrash, não apenas do Brasil, mas do mundo!

**United for Thrash.**
```

- [ ] **Step 3: Verify the build succeeds and the review pages render**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "United for Thrash" dist/paranoia-urbana/resenhas/violator-united-for-thrash/index.html`
Expected: prints `United for Thrash`.

- [ ] **Step 4: Commit**

```bash
git add src/content/reviews
git commit -m "Add Flower and Violator review content"
```

---

## Task 14: Populate interview content

**Files:**
- Create: `src/content/interviews/odiar.md`

- [ ] **Step 1: Create the interview**

```markdown
---
title: "Entrevista — Odiär"
date: 2026-07-01
summary: "D-beat raw punk direto do ES: a banda fala sobre origem, influências e a cena."
band: "Odiär"
cover: "entrevista-odiar.png"
---

**1. Como surgiu a ideia de vocês para montarem a banda? Conte um pouco da
história da banda.**

Resposta Luís - Então irmão, a ideia a princípio era fazer um show de
reunião com uma antiga banda nossa. Mas aí fomos criando som e resolvemos
montar um projeto chamado Disumano. Porém o intuito era ter no mínimo 4
integrantes, mas nunca passou de nós 2... sempre ensaiamos em 2... chegamos
a gravar um material com o Disumano com um chegado no vocal e o bicho que
fez a master resolveu gravar uma guitarra ali pra quebrar um galho. Mas
depois dessa gravação, encerramos o Disumano e começamos o Odiär, já na
ideia de ser só nós 2 mermo.

**2. Quais são as principais ideias da banda e sobre as temáticas das
letras?**

Resposta Luís - As letras falam em sua maioria sobre questões sociais, anti
burguesia, anarquia, desesperança, guerra e demais coisas fudidas que
assolam essa terra.

**3. Como vocês veem a cena local e do Brasil hoje, em relação aos
movimentos?**

Resposta Luís - Aqui no ES existe uma cena bacana, porém não tão forte...
tem algumas bandas que tão representando legal, mas o punk aqui já foi
maior, pelo menos ao meu vê. A cena no Brasil é muito forte e vasta... tá
tendo muita banda fazendo o punk acontecer da melhor forma faça você mermo,
com uma anti música de protesto foda. O punk no Brasil tá cada dia mais
vivo e isso é muito importante e muito necessário.

**4. Quais são as principais influências e o que vocês da banda gostam de
ouvir?**

Resposta Luís - Discharge é a influência máxima. Todos os riffs criados são
inspirados em Discharge. A gente curte muito d-beat, hardcore desde as
bandas clássicas às bandas atuais... vou citar algumas: Discharge na fase
Porrada, Disclose, Physique, Destruct, Odiär, Ulster, Subúrbio 99, Detesto,
Lifelock, Scarecrow, Anti Cimex, Vaaska, MG 15, Electric Funeral... vixi é
muita banda heheh.

**5. Obrigado por aceitarem a entrevista. Vocês poderiam deixar uma
mensagem para os nossos leitores?**

Resposta Luís - Agradeço demais o convite pra participar do zine de vocês.
Tamo junto sempre! Se mantenha punk, barulho não música, Palestina livre e
é nóiz! Abraço e continuem na luta sempre!
```

- [ ] **Step 2: Verify the build succeeds and the interview renders**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Discharge é a influência máxima" dist/paranoia-urbana/entrevistas/odiar/index.html`
Expected: prints `Discharge é a influência máxima`.

- [ ] **Step 3: Commit**

```bash
git add src/content/interviews
git commit -m "Add Odiär interview content"
```

---

## Task 15: Populate column content

**Files:**
- Create: `src/content/columns/reflexao.md`
- Create: `src/content/columns/queremos-viver.md`

- [ ] **Step 1: Create the editorial column**

```markdown
---
title: "Reflexão"
date: 2026-07-01
summary: "O editorial da Edição #1: pós-revival do underground, união entre punks e bangers, e o compromisso antifascista do zine."
cover: "coluna-reflexao.png"
---

O cenário underground enfrenta atualmente um pós-revival em todos os
sentidos. Hoje, temos uma oportunidade de colher novos frutos dentro do
underground mundial, educando os jovens para apoiar e dar as boas-vindas a
essa nova geração. Aprendemos ao longo dos anos que a união e o respeito
geram bons resultados e fortalecem ainda mais os movimentos dentro do rock.
O estímulo a bandas, zines e movimentos culturais nos torna melhores como
pessoas.

Recentemente, participei de alguns shows e pude perceber que o underground
sobreviveu bem à pandemia. Novas bandas de diversos estilos estão com força
total, e os veteranos estão lidando bem com essa geração atual. É
gratificante ver a energia da galera nos pogos e mosh, absorver as ideias e
sugestões e perceber que estou envelhecendo enquanto aprecio meu legado com
meus filhos e amigos. Mesmo em situações adversas, é bom constatar como as
coisas mudaram do que costumavam ser.

Este zine não pertence apenas a mim ou a você, mas sim a todos nós. Todos
podem enviar seus textos, oferecer ideias para entrevistas e resenhas. O
principal objetivo deste zine é promover a união entre Punks e Bangers,
pois somos uma comunidade com estilos diferentes, porém unidos pela mesma
causa. Nosso propósito é erradicar elementos fascistas da cena. Se você não
apoia a paz, a liberdade, e se suas ideias estão alinhadas com regimes
opressores e ditatoriais, sugerimos que interrompa a leitura, já que este
zine segue uma ideologia libertária antifascista.
```

- [ ] **Step 2: Create the closing poem as its own column entry**

```markdown
---
title: "Queremos Viver, Não Apenas Sobreviver"
date: 2026-07-01
summary: "Poema de encerramento da Edição #1."
cover: "poema-encerramento.png"
---

Nós vivemos nos guetos desta grande cidade,

De luta em luta, sobrevivemos,
Mas vivemos na constante luta,
Onde traçamos destinos diferentes,
Na sociedade que nos oprime.

No subúrbio, aprendemos a ser fortes,
Aprendemos a viver em comunidade,
O medo já não faz parte de nós,

O ódio apenas para o sistema,
Para a burguesia e as autoridades.

Nas cidades satélites, existimos,
Na capital, manifestamos,

Por direitos humanos e animais,
Todos somos seres vivos,

Merecemos dignidade igual,

Queremos viver, não apenas sobreviver!
```

- [ ] **Step 3: Verify the build succeeds and both columns render**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "ideologia libertária antifascista" dist/paranoia-urbana/colunas/reflexao/index.html`
Expected: prints `ideologia libertária antifascista`.

Run: `grep -o "Queremos viver" dist/paranoia-urbana/colunas/queremos-viver/index.html`
Expected: prints `Queremos viver`.

- [ ] **Step 4: Commit**

```bash
git add src/content/columns
git commit -m "Add editorial and closing poem content"
```

---

## Task 16: Populate documentary content

**Files:**
- Create: `src/content/documentaries/mulheres-no-metal.md`
- Create: `src/content/documentaries/viver-para-lutar.md`

- [ ] **Step 1: Create the "Mulheres no Metal" entry**

```markdown
---
title: "Women in Metal (Mulheres no Metal)"
date: 2026-07-01
summary: "Documentário de 2013 sobre a força feminina no metal brasileiro, com bandas de Belo Horizonte."
cover: "documentarios.png"
links:
  - label: "Assistir no YouTube"
    url: "https://www.youtube.com/watch?v=jj2EI8keIBs&t=545s"
---

Documentário dedicado às mulheres no metal. Este documentário foi lançado
em 2013 e foi produzido por Gracielle Fonseca, contando com o apoio de uma
ONG e da comunidade de Belo Horizonte. O filme apresenta bandas de metal
extremo como Placenta, Valhalla, Miasthenia e Flammea, oferecendo insights
sobre suas origens, influências e o papel crucial das mulheres no cenário
underground. Trata-se de um registro histórico que abrange
significativamente as bandas de Brasília e do Brasil como um todo.
```

- [ ] **Step 2: Create the "Viver Para Lutar" entry**

```markdown
---
title: "Viver Para Lutar — Punk, Anarquismo e Feminismo"
date: 2026-07-01
summary: "Episódio 1: as minas dos anos 90 — punk, anarquismo e feminismo no Brasil."
cover: "documentarios.png"
links:
  - label: "Assistir no YouTube"
    url: "https://www.youtube.com/watch?v=nMRd4nh3tm0&ab_channel=AnarcopunkORG"
---

Documentário sobre a cena anarcopunk no Brasil nos anos 90. O documentário
retoma a importante ligação entre punk, anarquismo e feminismo que
floresceu naquele período. Questionando todo o contexto social em que
viviam, as mulheres punks criaram coletivos, zines, bandas, redes,
encontros anarcofeministas e projetos que trouxeram à tona as urgências do
feminismo não só dentro das movimentações punks e anarquistas, mas para
suas próprias vidas. Por meio das memórias de mulheres que viveram esta
história, tanto na movimentação anarcopunk quanto em outros contextos
punks da época, reúne algumas dessas inúmeras experiências de luta.
```

- [ ] **Step 3: Verify the build succeeds and both entries render**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Gracielle Fonseca" dist/paranoia-urbana/documentarios/mulheres-no-metal/index.html`
Expected: prints `Gracielle Fonseca`.

Run: `grep -o "anarcopunk" dist/paranoia-urbana/documentarios/viver-para-lutar/index.html`
Expected: prints `anarcopunk`.

- [ ] **Step 4: Commit**

```bash
git add src/content/documentaries
git commit -m "Add documentary review content"
```

---

## Task 17: Final home page check with full content

**Files:** none (verification only)

- [ ] **Step 1: Build with all content in place**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 2: Verify the home page lists all 7 articles**

Run: `grep -oE "article-card" dist/paranoia-urbana/index.html | wc -l`
Expected: `7` (2 reviews + 1 interview + 2 columns + 2 documentaries).

- [ ] **Step 3: Verify the site builds cleanly from scratch**

```bash
rm -rf dist .astro
npm run build
```
Expected: exits 0 with no warnings about missing content or broken links.

---

## Task 18: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deploy workflow"
```

---

## Task 19: Create the GitHub repository and push

**Files:** none (repo/deploy operation)

This task publishes the site to a public GitHub repository and pushes commits — confirm with the user before running Step 2 and Step 4, since these are visible, external, hard-to-reverse actions.

- [ ] **Step 1: Confirm GitHub CLI is authenticated as JarbasSPires**

Run: `gh auth status`
Expected: shows an authenticated account. If it's not `JarbasSPires`, run `gh auth login` and follow the prompts before continuing.

- [ ] **Step 2: Create the repository (ask the user to confirm first)**

Run: `gh repo create JarbasSPires/paranoia-urbana --public --source=. --remote=origin`
Expected: creates the repo and adds `origin` remote pointing to `https://github.com/JarbasSPires/paranoia-urbana`.

- [ ] **Step 3: Rename the local branch to `main` if it isn't already**

Run: `git branch -M main`

- [ ] **Step 4: Push (ask the user to confirm first)**

Run: `git push -u origin main`
Expected: pushes all commits; GitHub Actions run starts automatically (visible under the repo's Actions tab).

- [ ] **Step 5: Enable GitHub Pages with the Actions source**

Run: `gh api repos/JarbasSPires/paranoia-urbana/pages -X POST -f "build_type=workflow"`
Expected: 201 Created (or 409 if Pages is already configured, which is fine).

- [ ] **Step 6: Verify the deployed site**

Wait for the Actions run to finish (`gh run watch` or check the Actions tab), then open
`https://jarbasspires.github.io/paranoia-urbana/` and confirm the home page loads with
the logo, header nav, and the 7 articles.

---

## Self-Review Notes

- **Spec coverage:** all 7 pages from the spec are covered (Home: Task 6; Resenhas: Task 7; Entrevistas: Task 8; Colunas: Task 9; Documentários: Task 10; Agenda: Task 11; Quem Somos: Task 12). All 8 pieces of Edition #1 content are covered (Tasks 13–16 — the poem and the editorial are two separate `columns` entries per the spec). Repo/deploy covered by Tasks 18–19. Visual style (Option A) implemented in Task 2.
- **Type consistency:** all detail pages (`resenhas`, `entrevistas`, `documentarios`) share the same `articleSchema` fields (`title`, `date`, `summary`, `band?`, `cover?`, `links?`) defined once in Task 3 and consumed identically across Tasks 7, 8, 10. `columns` uses the same schema but the list/detail pages don't render `band`/`links` since no column content uses them. `shows` has its own schema (`band`, `date`, `venue`, `city`, `link?`), consumed only in Task 11.
- **Out of scope confirmed:** no shop/e-commerce, no CMS/login, no custom domain — matches the spec's "Fora de escopo" section.
