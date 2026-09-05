# Monad — Typography Reference

## Fonts

### ABC Diatype Mono
`--font-abc-diatype-mono`

Used for: body text, navigation, buttons, badges, tags, and all UI strings. The monospace choice across every functional element gives the interface its technical-manual character.

- **Substitute:** JetBrains Mono, IBM Plex Mono, or Space Mono
- **Weights:** 400, 500 (500 reserved for emphasized UI labels)
- **Sizes:** 12px, 14px, 16px, 18px, 20px, 28px

### Untitled Serif
`--font-untitled-serif`

Used for: display and heading type only (hero, section headings, sub-section headings, feature card titles). Weight is locked at 400 across all sizes — the serif's natural contrast and tight letter-spacing carry the visual weight instead of bold.

- **Substitute:** Times New Roman, Georgia, or any editorial serif with similar stroke contrast
- **Weights:** 400 only — never bold
- **Sizes:** 24px, 32px, 40px, 48px, 80px
- **Line height:** 1.2 across all sizes
- **Letter spacing:** -0.02em at all sizes

### Untitled Sans
`--font-untitled-sans`

Minor/unused role — detected in source but not part of the core serif/mono pairing.

- **Weight:** 400
- **Size:** 16px
- **Line height:** 1.35
- **Letter spacing:** -0.02em

## Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|-----------------|-------|
| caption | 12px | 1.2 | -0.4px | `--text-caption` |
| body-sm | 14px | 1.35 | -0.28px | `--text-body-sm` |
| body | 16px | 1.35 | -0.4px | `--text-body` |
| label | 18px | 1.2 | -0.4px | `--text-label` |
| body-lg | 20px | 1.35 | -0.4px | `--text-body-lg` |
| subheading | 24px | 1.2 | -0.48px | `--text-subheading` |
| heading-sm | 32px | 1.2 | -0.64px | `--text-heading-sm` |
| heading | 40px | 1.2 | -0.8px | `--text-heading` |
| heading-lg | 48px | 1.2 | -0.96px | `--text-heading-lg` |
| display | 80px | 1.2 | -1.6px | `--text-display` |

## CSS Custom Properties

```css
:root {
  /* Font families */
  --font-abc-diatype-mono: 'ABC Diatype Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-untitled-serif: 'Untitled Serif', ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-untitled-sans: 'Untitled Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;

  /* Scale */
  --text-caption: 12px;      --leading-caption: 1.2;      --tracking-caption: -0.4px;
  --text-body-sm: 14px;      --leading-body-sm: 1.35;     --tracking-body-sm: -0.28px;
  --text-body: 16px;         --leading-body: 1.35;        --tracking-body: -0.4px;
  --text-label: 18px;        --leading-label: 1.2;        --tracking-label: -0.4px;
  --text-body-lg: 20px;      --leading-body-lg: 1.35;     --tracking-body-lg: -0.4px;
  --text-subheading: 24px;   --leading-subheading: 1.2;   --tracking-subheading: -0.48px;
  --text-heading-sm: 32px;   --leading-heading-sm: 1.2;   --tracking-heading-sm: -0.64px;
  --text-heading: 40px;      --leading-heading: 1.2;      --tracking-heading: -0.8px;
  --text-heading-lg: 48px;   --leading-heading-lg: 1.2;   --tracking-heading-lg: -0.96px;
  --text-display: 80px;      --leading-display: 1.2;      --tracking-display: -1.6px;
}
```

## Pairing Philosophy

The serif/mono pairing is the single most distinctive design choice in this system:

- **Untitled Serif** handles all hierarchical display text (headlines, section titles, feature card titles, FAQ questions) — it carries editorial authority through stroke contrast and refined letterforms, never through weight (always 400).
- **ABC Diatype Mono** handles everything functional: body paragraphs, navigation, button labels, badges, tags, and inline UI text.

**Rule of thumb:** the serif announces, the mono instructs. Swapping in a sans-serif for body text breaks the brand identity immediately.
