# AGENTS.md

Lightweight rules for agents in this repository.

## Core Rules

1. Sync before push:
- `git fetch origin`
- If branch is behind remote, run `git pull --rebase origin <branch>`
- Push only after local is up to date

2. No force push unless user explicitly asks.

3. Do not overwrite or delete remote-added files without explicit confirmation.

4. Keep commits scoped to the requested task; do not revert unrelated user changes.

5. If credentials/secrets are missing, stop and report exactly what is needed.

6. Keep all live site languages in sync:
- Before changing content, check which site languages exist.
- Any user-facing content change must be updated for every supported language before the task is done.
- Keep names, company names, product names, software names, project titles, and universal terms like `SEO` in English unless localization is clearly better.
- Localized content must read naturally, not like half-English hybrids. Translate generic words and phrases fully, and feel free to adapt wording for readability instead of mirroring English literally.

## Quick Pre-Push

1. `git status --short`
2. `git fetch origin`
3. `git rev-list --left-right --count HEAD...origin/<branch>`
4. Rebase if behind, then push

## Future Rules

- Add new project-specific rules here as needed.
- Prefer shorter slugs for blog posts. The filename slug does not need to mirror the full title; use a concise version of the title instead.
