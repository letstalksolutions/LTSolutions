# LT.Solutions — About Page Review and Quick Fixes
**Date:** 26 Oct 2025  
**Page:** `/about.html`  
**Focus:** De-cram layout, improve readability, tighten hierarchy, and preserve voice.

---

## TL;DR — Ship These Now

1. Increase vertical padding between sections.
2. Reduce paragraph line-length for easier reading.
3. Slightly reduce H2 size and add breathing room above intros.
4. Add grid gaps and soften value-card density.
5. Separate CTAs with clear primary vs secondary styling.
6. Add a one-line cue before the personal section to smooth the voice change.
7. Set `aria-current="page"` on the About nav link.

---

## Priority Fixes (copy-paste ready)

### 1) Section spacing and rhythm
```css
.section { padding-block: 6rem; }
.section .section__header { margin-bottom: 2.25rem; }
.section--navy { padding-block: 7rem; }

@media (max-width: 768px) {
  .section { padding-block: 4rem; }
}
```

### 2) Paragraph readability
```css
.section__intro,
.value-card__text,
.about__body p {
  max-width: 68ch;
  margin-inline: auto;
  line-height: 1.65;
}
```

### 3) Headings and hierarchy
```css
.section__title {
  font-size: clamp(1.75rem, 2.4vw + 1rem, 2.4rem);
  letter-spacing: 0.2px;
}
.section__title + .section__intro {
  margin-top: 0.75rem;
}
```

### 4) Values grid density
```css
.grid--3col,
.grid--2col {
  gap: 1.5rem;
}

.value-card {
  padding: 1.25rem 1.25rem 1.1rem;
  border-radius: 14px;
}

.value-card__title { margin-bottom: 0.35rem; }
.value-card__text  { opacity: 0.95; }
```

### 5) CTA cluster spacing and hierarchy
```css
.cta-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.25rem;
}
.btn--secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
}
```

---

## Small Content Tweaks (keep the voice)

- **Our Foundation:** split the long paragraph into two shorter ones for scan-ability.
- **Values:** keep five cards, consider “Empowerment” instead of “Continuity” if you prefer. Add a short sub-line to each for fast scanning:
  - *Integrity* — honest advice over easy answers  
  - *Collaboration* — shoulder to shoulder with your team  
  - *Clarity* — simple language for complex systems  
  - *Impact* — outcomes you can measure, fast  
  - *Continuity* — we design for handover, not dependency
- **Why Work With Me:** add a one-line cue above the personal section:
  
```
A quick personal note from Andreas.
```

---

## Micro Layout Helpers

### Spacer helpers
```html
<div class="spacer spacer--sm"></div>
<div class="spacer spacer--md"></div>
```

```css
.spacer--sm { height: 12px; }
.spacer--md { height: 24px; }
```

Place a `spacer--md` between major sections such as Values → Partnership and Partnership → Why Work With Me.

### Pull-quote style
```css
blockquote {
  border-left: 3px solid var(--color-red);
  padding-left: 1rem;
  margin: 1rem auto;
  font-style: italic;
  opacity: 0.95;
  max-width: 58ch;
}
```

### Subtle divider between company and personal copy
```html
<div class="divider" role="separator" aria-hidden="true"></div>
```

```css
.divider {
  width: 100%;
  max-width: 160px;
  height: 1px;
  margin: 1.5rem auto;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
}
```

---

## Accessibility and Semantics

- Add `aria-current="page"` to the About link in the header nav.
- Ensure each section uses one `h2` and value cards use `h3`.
- Optional: use `<blockquote cite="...">` if you want to attribute quotes formally.

---

## Optional: Patch File Strategy

If you prefer to avoid touching global styles, create **`/assets/css/about.patch.css`** and import it only on `/about.html`.

```html
<link rel="stylesheet" href="/assets/css/about.patch.css" media="all">
```

Paste all CSS from the “Priority Fixes” and “Optional Niceties” sections into that file.

---

## Notes

- British English and no long hyphens throughout.
- Values and headings match your current class naming to avoid style collisions.
- These changes are safe defaults that improve readability without changing brand aesthetics.
