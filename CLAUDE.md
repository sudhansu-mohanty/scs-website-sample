# CLAUDE.md — SCS Website Project Instructions

## Session Logging

Whenever the user says **"session terminated"**, append a new entry to `SESSION_LOG.md` in this project with:
- The date (YYYY-MM-DD)
- The time (HH:MM)
- A concise bullet-point summary of everything worked on during that session

If `SESSION_LOG.md` does not exist, create it first with a header, then append the entry.

After writing the log, stage all changes and push to the repo:
```
git add -A
git commit -m "session log YYYY-MM-DD"
git push origin main
```

Format:

```
## YYYY-MM-DD — HH:MM

- Item 1
- Item 2
- Item 3

---
```

## Project Notes

- Single-file site: `index.html` (all CSS + JS inline)
- Brand palette documented in `brand-palette.md`
- All changes should be logged in `CHANGELOG.md`
