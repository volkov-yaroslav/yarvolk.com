# AGENTS.md

This file defines mandatory safety rules for AI agents working in this repository.

## Scope

- Applies to any agent making local changes, Git operations, CI/deploy edits, or automation changes.
- Treat these rules as required unless the user explicitly asks to bypass a specific rule.

## Git Safety (Mandatory)

1. Always sync remote before push:
- Run `git fetch origin`.
- Check ahead/behind status of current branch vs `origin/<branch>`.
- If behind, run `git pull --rebase origin <branch>` before pushing.

2. Never push blind:
- Do not run `git push` if remote has new commits not in local history.
- Rebase first, then push.

3. No force push by default:
- Never use `git push --force` or `--force-with-lease` unless explicitly requested by user.

4. Preserve remote-created files:
- Assume files may be added from other sources (automation, API, CI, other machines).
- Do not delete or overwrite remote-only files without explicit user confirmation.

5. Re-check before final push:
- Right before pushing, run `git fetch origin` again and verify branch is not behind.

## Commit Safety

1. Keep commits scoped:
- Include only files relevant to the requested task.

2. No unrelated reverts:
- Do not revert or modify unrelated user changes.

3. Clear commit messages:
- Describe user-facing impact and area changed.

## Deploy/Automation Safety

1. Prefer additive changes for automation:
- Avoid destructive workflow changes without explicit user direction.

2. Keep publish paths explicit:
- For generated content, use deterministic paths and avoid broad deletes.

3. Fail safely:
- If required credentials/secrets are missing, stop and report exactly what is missing.

## Conflict Resolution Policy

- If there is a local/remote conflict, stop and surface a concise summary.
- Do not auto-resolve by discarding remote changes.

## Recommended Pre-Push Checklist

1. `git status --short`
2. `git fetch origin`
3. `git rev-list --left-right --count HEAD...origin/<branch>`
4. If behind: `git pull --rebase origin <branch>`
5. Run project build/tests if available
6. Push
