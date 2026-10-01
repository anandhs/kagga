import { readFileSync, readdirSync } from 'node:fs'

const index = JSON.parse(readFileSync('data/visual-index.json', 'utf8'))
const required = ['verse_number', 'theme', 'title', 'signature_image', 'final_ending', 'status']
const requiredSections = [
  '## Comic strip',
  '## ಕನ್ನಡ ಪದ್ಯ',
  '## English translation',
  '## English explanation and summary',
  '## References',
]

if (!Array.isArray(index)) throw new Error('data/visual-index.json must contain an array.')

for (const [position, entry] of index.entries()) {
  for (const field of required) {
    if (entry[field] === undefined || entry[field] === '') throw new Error(`Visual index entry ${position + 1} is missing ${field}.`)
  }
}

for (const field of ['verse_number', 'title', 'signature_image']) {
  const values = index.map((entry) => String(entry[field]).trim().toLowerCase())
  const duplicate = values.find((value, position) => values.indexOf(value) !== position)
  if (duplicate) throw new Error(`Visual index contains a duplicate ${field}: ${duplicate}`)
}

const indexedVerses = new Set(index.map((entry) => Number(entry.verse_number)))
const drafts = readdirSync('content/comics').filter((name) => name.endsWith('.md') && name !== '_index.md')

for (const filename of drafts) {
  const content = readFileSync(`content/comics/${filename}`, 'utf8')
  const verse = content.match(/^verse_number:\s*(\d+)\s*$/m)
  if (!verse) throw new Error(`${filename} is missing a numeric verse_number.`)
  if (!indexedVerses.has(Number(verse[1]))) throw new Error(`${filename} is missing from data/visual-index.json.`)

  const positions = requiredSections.map((heading) => content.indexOf(heading))
  const missing = requiredSections.find((heading, position) => positions[position] === -1)
  if (missing) throw new Error(`${filename} is missing required section: ${missing}`)
  if (positions.some((position, index) => index > 0 && position < positions[index - 1])) {
    throw new Error(`${filename} does not use the required blog post section order.`)
  }

  const kannadaLines = content.match(/^kannada_lines:\n((?:  - .+\n){4})/m)
  if (!kannadaLines) throw new Error(`${filename} must contain exactly four populated kannada_lines.`)
  const translationLines = content.match(/^english_translation:\n((?:  - .+\n){4})/m)
  if (!translationLines) throw new Error(`${filename} must contain exactly four populated english_translation lines.`)
  const panelLines = content.match(/^panel_lines:\n((?:  - .+\n){6})/m)
  if (!panelLines) throw new Error(`${filename} must contain exactly six populated panel_lines.`)
  if (!/^comic_image:\s*"[^"]+"\s*$/m.test(content)) throw new Error(`${filename} is missing comic_image.`)
  if (!/^comic_image_alt:\s*"[^"]+"\s*$/m.test(content)) throw new Error(`${filename} is missing comic_image_alt.`)
}

console.log(`Visual index valid: ${index.length} comic${index.length === 1 ? '' : 's'}.`)
