# Kagga Bites

One Verse. One Image. A Lifetime of Reflection.

Kagga Bites is a Hugo blog for six-panel watercolor interpretations of D.V. Gundappa's *Mankuthimmana Kagga*. The comic is an invitation back to the verified original Kannada verse, not a substitute for it.

## Local development

Hugo Extended 0.155.3 or newer and Node.js 22 or newer are recommended.

```bash
make dev
```

Open `http://localhost:1313/kagga/`.

## Common commands

```bash
make help
make dev
make new VERSE=42
make check
make build
make clean
```

## Creating a comic

1. Read `AGENTS.md` completely.
2. Inspect `data/visual-index.json` before choosing a signature image.
3. Retrieve and verify the original Kannada, translation, and commentary.
4. Complete the philosophy brief, signature image, storyboard, and quality gate.
5. Create the draft with `make new VERSE=42`.
6. Add the verse to `data/visual-index.json` using all required fields.
7. Generate the illustration only after the brief scores at least 45/50.
8. Keep the post as `draft: true` until the Kannada, sources, comic, and accessibility text are reviewed.
9. Run `make check` before publishing.

If an image generator cannot reproduce Kannada accurately, use an empty scroll in the artwork. The site template typesets the verified four-line verse separately using `kannada_lines`.

## Visual index entry

```json
{
  "verse_number": 42,
  "theme": "Equanimity",
  "title": "Balance",
  "signature_image": "A lamp steady inside a windy shelter",
  "final_ending": "The flame stayed small—and steady.",
  "status": "draft"
}
```

The validation script rejects missing index fields and duplicate verse numbers, titles, or signature images.

## Project structure

```text
archetypes/              Reusable Kagga comic front matter
content/comics/          Comic posts
data/visual-index.json   Collection-wide metaphor index
layouts/                 Hugo page and comic templates
prompts/                 Reproducible final comic-image prompts
static/                  Styles, behavior, and local artwork
scripts/                 Content validation
.github/workflows/       GitHub Pages deployment
```

## Publishing

The included workflow deploys `main` to GitHub Pages. In the GitHub repository, set **Settings → Pages → Source** to **GitHub Actions**.
