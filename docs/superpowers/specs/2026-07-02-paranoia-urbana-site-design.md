# Paranoia Urbana — Site Design

## Contexto

Paranoia Urbana é um zine DIY de metal/punk (d-beat, crust, thrash), com
edições digitais e impressas, mantido por Jarbas Pires ("Iniciativa Samamba
Thrash!"). O conteúdo da Edição #1 já existe em `Quem somos.docx`
(`C:\Users\Eterc\Music\Quem somos.docx`), contendo capa, logo, editorial,
entrevista, resenhas e um poema de encerramento — todo extraído e catalogado
durante o brainstorming (ver seção "Conteúdo da Edição #1" abaixo).

O objetivo é um site no espírito do [Maximum Rocknroll](https://www.maximumrocknroll.com/):
um arquivo editorial de zine que cresce a cada nova edição, com entrevistas,
resenhas, colunas e notícias da cena — não uma landing page estática única.

## Stack

- **Astro** (gerador de site estático) com **Content Collections** nativas em
  Markdown/MDX. Cada artigo é um arquivo `.md`; o site é gerado a partir
  desses arquivos. Sem banco de dados, sem backend, sem login — só arquivos
  de texto, editáveis diretamente.
- Publicação futura de conteúdo = adicionar um novo arquivo `.md` na coleção
  correta.

## Estrutura de conteúdo

```
src/content/
  reviews/        # resenhas de álbum/banda (ex: Flower, Violator)
  interviews/      # entrevistas (ex: Odiär)
  columns/          # editorial/colunas (ex: Reflexão)
  documentaries/    # resenhas de documentários (ex: Mulheres no Metal, Viver Para Lutar)
  shows/            # agenda de shows/eventos
```

Cada coleção usa um schema simples (título, data, autor opcional, imagem de
capa opcional, corpo em Markdown). Uma nova edição do zine não é uma entidade
separada no código — é simplesmente um novo lote de arquivos `.md` datados,
distribuídos entre essas coleções (assim como o MRR não separa "edições" na
navegação, e sim categorias de conteúdo cronológico).

## Páginas

- **Home (`/`)** — grade tabloide densa: logo no topo, listagem cronológica
  dos itens mais recentes de todas as coleções (título, categoria, resumo
  curto), estilo mockup "A" aprovado (ver Estilo Visual).
- **`/resenhas`** — lista de resenhas + página individual por resenha
  (`/resenhas/[slug]`).
- **`/entrevistas`** — lista + página individual (`/entrevistas/[slug]`).
- **`/colunas`** — lista + página individual (`/colunas/[slug]`).
- **`/documentarios`** — lista + página individual (`/documentarios/[slug]`).
- **`/agenda`** — lista de shows/eventos (data, banda, local).
- **`/quem-somos`** — texto sobre o coletivo, link do Instagram
  (@paranoiaurbana), contato.

## Estilo visual (Opção A — Tabloide Clássico, aprovado)

- Preto e branco predominante, sem paleta de cores decorativa.
- Tipografia serifada para títulos (estilo jornal/tablóide), sans-serif para
  corpo de texto.
- Grade de colunas densa na home (múltiplas colunas por viewport largo,
  colapsando para 1 coluna em mobile).
- Logo (caveira, extraída de `image2.png` do Word) no cabeçalho de todas as
  páginas.
- Sem elementos de colagem/papel rasgado na UI do site (isso fica reservado
  para imagens de capa dos artigos, quando fizer sentido usar as artes
  originais do zine).

## Conteúdo da Edição #1 (a popular no lançamento)

Extraído de `Quem somos.docx` (8 imagens, praticamente todo o conteúdo é
imagem/design, não texto solto):

1. **Capa** (`image1.png`) — arte "Paranóia Urbana", D-beat Raw Punk,
   MetalPunk Zine.
2. **Logo** (`image2.png`) — caveira + "Paranóia Urbana", "Zine Digital e
   Impresso", contato `jarbas.spires@gmail.com`, "Iniciativa Samamba
   Thrash!". Vai para `/quem-somos` e cabeçalho do site.
3. **Coluna "Reflexão"** (`image3.png`) — editorial sobre o cenário
   underground pós-pandemia, união entre punks e bangers, ideologia
   libertária antifascista → coleção `columns`.
4. **"Documentário"** (`image4.png`) — resenha de dois documentários:
   *Women in Metal* (Mulheres no Metal, 2013, Gracielle Fonseca) e *Viver
   Para Lutar — Punk, Anarquismo e Feminismo* → coleção `documentaries`
   (dois itens, com links de YouTube incluídos no doc).
5. **Entrevista com Odiär** (`image5.png`) — 5 perguntas e respostas sobre a
   banda de d-beat/raw punk → coleção `interviews`.
6. **Resenha: Flower — "Hardly a Dream"** (`image6.png`) — crust/metal, com
   link de Bandcamp → coleção `reviews`.
7. **Matéria: Violator — "United for Thrash"** (`image7.png`) — thrash metal
   old school, com links de Bandcamp e Facebook → coleção `reviews`.
8. **Poema de encerramento** (`image8.png`) — "Nós vivemos nos guetos desta
   grande cidade..." → publicado como parte da coluna/editorial ou como
   peça própria em `columns`.

O texto de cada peça será digitado a partir do que está legível nas imagens
(o conteúdo já foi transcrito durante o brainstorming); as imagens originais
podem ser usadas como arte de capa dos respectivos artigos quando quebrarem
a estética tabloide sem prejudicá-la.

## Repositório e deploy

- GitHub: `JarbasSPires/paranoia-urbana` (público — necessário para GitHub
  Pages gratuito).
- GitHub Actions faz build (Astro) e publica em GitHub Pages a cada push na
  branch principal.
- Sem domínio próprio definido por enquanto; usa o domínio padrão do GitHub
  Pages (`jarbasspires.github.io/paranoia-urbana`) até decisão futura.

## Fora de escopo (por enquanto)

- Loja/e-commerce (venda do zine impresso) — não solicitado nesta rodada.
- CMS/painel administrativo com login — descartado a favor de arquivos
  Markdown editáveis diretamente.
- Domínio customizado — hospedagem inicial no domínio padrão do GitHub
  Pages.
