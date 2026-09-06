# CLAUDE.md — SCS Website Project Instructions

## Session Logging

Whenever the user says **"session terminated"**, do the following in order:

### 1. Append to `SESSION_LOG.md`
Add a new entry with:
- The date (YYYY-MM-DD)
- The time (HH:MM)
- A concise bullet-point summary of everything worked on during that session

If `SESSION_LOG.md` does not exist, create it first with a header, then append the entry.

Format:
```
## YYYY-MM-DD — HH:MM

- Item 1
- Item 2
- Item 3

---
```

### 2. Append to `LESSON_PLAN.md`
After the session log, write a new lesson entry to `LESSON_PLAN.md` (create it with a header if it doesn't exist).

The lesson entry should:
- Be dated (YYYY-MM-DD)
- Pick out the **React, TypeScript, JavaScript, CSS, or tooling concepts** that came up naturally during the session's work
- For each concept, write a short plain-English explanation (3–6 sentences) — what it is, why it exists, and how it showed up in the code we wrote today
- End with a **"Try it yourself"** prompt: a small, concrete exercise the user can do on their own to reinforce the concept (no more than 2–3 sentences)
- Keep the tone conversational, like a patient tutor explaining to someone learning for the first time
- Do NOT repeat concepts already covered in previous lesson entries

Format:
```
## YYYY-MM-DD

### Concept Name
Explanation here.

**Try it yourself:** Exercise prompt here.

---
```

### 3. Commit and push
Stage all changes and push to the repo:
```
git add -A
git commit -m "session log YYYY-MM-DD"
git push origin main
```

## Project Notes

- Single-file site: `index.html` (all CSS + JS inline)
- Brand palette documented in `brand-palette.md`
- All changes should be logged in `CHANGELOG.md`
