---
name: destination-vocab-module
description: >-
  Builds a Destination B2 vocabulary unit from a textbook scan or screenshot:
  transcribe 01-vocab.md, write 02-vocab-guide.md (contrasts, examples), and
  03-extra-tasks.md quizzes (typically phrasal verbs). Use when the user attaches
  a vocab-page scan/PDF screenshot, asks for a new unit/module, a vocabulary
  guide, extra tasks, or Destination B2 notes.
---

# Destination B2 vocabulary module

Canonical unit: `destination-b2-textbook/02-travel-and-transport/` (`01-vocab.md`, `02-vocab-guide.md`, `03-extra-tasks.md`). Copy that structure, not a new format.

English throughout (British spelling). Do not invent entries that are not on the scan.

## When the user sends a scan

1. Read every attached image. Transcribe what is on the page; do not OCR-paraphrase definitions.
2. If the page is cropped (only contrast + phrasal verbs, no collocations), transcribe what is visible and ask for the rest **or** continue if the user only wants that slice.
3. Default full module (unless they ask for one file only):
   - `destination-b2-textbook/NN-slug/01-vocab.md`
   - `…/02-vocab-guide.md`
   - `…/03-extra-tasks.md`
4. Folder slug: `NN-kebab-topic` from the unit title (`02-travel-and-transport`). Number with a leading zero.
5. Register the unit in `.vitepress/config.mts` (`nav` + `sidebar`). Do not publish `ai/`.

## 01-vocab.md (from the scan)

Mirror the textbook blocks in this order when present:

```markdown
# Unit N · Vocabulary

## Topic title from the page

### Topic vocabulary in contrast
### Phrasal verbs
### Phrases and collocations
### Word patterns
### Word formation
```

- Contrast groups: 3-column markdown table; cells are `word / word / word`.
- Phrasal verbs: `**verb** — short gloss` (keep multiple senses after `;`).
- Collocations: `**headword** — phrase; phrase`.
- Word patterns / formation: same compact textbook lines.
- Keep textbook abbreviations (`sth`, `sb`, `swh`, `(un)cultured`).

## 02-vocab-guide.md

Do not copy 01-vocab verbatim. Teach.

### Topic vocabulary in contrast

One `### word / word / word` section per table cell.

- 2–5 sentences on how they differ in English.
- One example **per word**, **10–20 words**, preferably in the unit topic.
- Format:

```markdown
### voyage / journey / trip / travel / excursion

Short contrast paragraph.

- **voyage** — Example sentence of ten to twenty words.
```

### Phrasal verbs

Examples only (no extra theory). One sentence per listed verb, 10–20 words.

- Two senses in the gloss (`check out`, `drop off`) → two example lines.
- `set out/off` → two lines (`set out`, `set off`).

### Phrases and collocations + Word patterns

One example per **phrase/pattern**, not per headword.

Split rules (match Unit 2):

- Semicolon → separate sentences (`accident` → 3).
- Distinct phrases: split `go/be`, `have/take`, `go/turn`, `lose/make/find`, `go on/take`.
- Keep one sentence: `to/towards`, `of/(a)round`, `your/a`.
- Word patterns: expand `sth` / `sb` / `doing` / `to do` (`afraid` → 4). Split taught pairs `in` vs `at`, `on` vs `for`, `here` vs `there`.
- Do not cartesian-product `about/of` with every complement; mix both prepositions across the set.
- Optional `(with sb)`: show the useful form (`arrange sth`, `arrange sth with sb`, `arrange for sb to do`).

Bold the **specific phrase**, grouped under `### headword`.

```markdown
### accident

- **have an accident** — …
- **be (involved) in an accident** — …
- **do sth by accident** — …
```

Word formation: skip unless the user asks.

If they only want contrasts or only examples, do that slice; still follow these rules.

## 03-extra-tasks.md (typically phrasal verbs)

Default: two exercises, **10 items each**, covering the unit’s phrasal verbs (all of them if the list is ~15).

```markdown
# Extra tasks

Practice the Unit N phrasal verbs. Check each item as you go. Spelling is not case-sensitive.

## 1. Multiple choice
## 2. Fill in the phrase
```

Components (already global in `.vitepress/theme`). Wrap each exercise in `QuizBlock` so a screenshot score appears at the bottom:

```vue
<QuizBlock unit="Unit N · Topic title" exercise="1. Multiple choice">

<MultipleChoice
  question="We had to ___ at the airport three hours before our flight."
  :options="['check in', 'take off', 'pull in']"
  answer="check in"
/>

</QuizBlock>

<QuizBlock unit="Unit N · Topic title" exercise="2. Fill in the phrase">

<FillBlank
  sentence="The driver ___ at the side of the road to look at the map."
  :answer="['pulled in', 'pull in']"
/>

</QuizBlock>
```

- Gap is `___`. Distractors for MC: other verbs from the **same unit**.
- `FillBlank` `answer`: string or `string[]` (lemma + inflected form, e.g. `['set out', 'set off']`).
- Matching is trim + lower case; the first array item is shown on a wrong answer — put the form that fits the sentence first.
- The completed sentence must be grammatical (`I will ___ from the station` → `pick you up`, not `I will pick up you`).
- Do not clone the same sentence across MC and fill-in.
- Unit topic in the sentences (travel for Unit 2, etc.).
- `QuizBlock` shows `unit / exercise` and `Score: n/total`. Finish locks the score after every item is checked.

If they ask only for extra tasks, still read `01-vocab.md` in that folder for the verb list.

## Sidebar

In `.vitepress/config.mts`, add a group:

```ts
{
  text: 'Unit N · Topic title',
  items: [
    { text: 'Vocabulary', link: '/NN-slug/01-vocab' },
    { text: 'Vocabulary guide', link: '/NN-slug/02-vocab-guide' },
    { text: 'Extra tasks', link: '/NN-slug/03-extra-tasks' }
  ]
}
```

Optional: a `nav` link to the new unit’s `01-vocab`.

## Do not

- Rewrite textbook glosses in 01-vocab.
- Add a database, answer keys as plain lists, or new quiz component types unless asked.
- Commit or push unless asked.
