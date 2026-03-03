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

## Quick Pre-Push

1. `git status --short`
2. `git fetch origin`
3. `git rev-list --left-right --count HEAD...origin/<branch>`
4. Rebase if behind, then push

## Future Rules

- Add new project-specific rules here as needed.
