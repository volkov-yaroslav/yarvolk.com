import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function isAllZeroSha(sha) {
  return typeof sha === "string" && /^0+$/.test(sha);
}

function getDiffRange() {
  // Prefer GitHub push event SHAs when running in Actions.
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (eventPath && fs.existsSync(eventPath)) {
    const payload = readJson(eventPath);
    const before = payload?.before;
    const after = payload?.after ?? process.env.GITHUB_SHA;
    if (before && after && !isAllZeroSha(before) && !isAllZeroSha(after)) {
      return { before, after };
    }
    if (after && !isAllZeroSha(after)) {
      return { before: "HEAD~1", after };
    }
  }

  return { before: "HEAD~1", after: "HEAD" };
}

function getChangedNameStatus(before, after) {
  let cmd = `git diff --name-status ${before} ${after}`;
  // If HEAD~1 doesn't exist (first commit), diff against empty tree.
  try {
    return sh(cmd);
  } catch {
    const emptyTree = sh("git hash-object -t tree /dev/null");
    return sh(`git diff --name-status ${emptyTree} ${after}`);
  }
}

function listLocaleDirs(portfolioRoot) {
  const entries = fs.readdirSync(portfolioRoot, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => /^[a-z]{2}$/i.test(name));
}

function main() {
  // Allow an explicit bypass when needed (rare).
  const lastMsg = sh("git log -1 --pretty=%B");
  if (/\bi18n-skip\b/i.test(lastMsg)) return;

  const portfolioRoot = path.join("src", "content", "portfolio");
  if (!fs.existsSync(portfolioRoot)) return;

  const locales = listLocaleDirs(portfolioRoot);
  if (locales.length === 0) return;

  const { before, after } = getDiffRange();
  const out = getChangedNameStatus(before, after);
  if (!out) return;

  const changed = new Map(); // path -> status
  for (const line of out.split("\n")) {
    if (!line) continue;
    const parts = line.split("\t");
    const status = parts[0];
    const p = parts[1];
    if (!p) continue;

    // For renames, treat the new path as changed.
    const normalized =
      status.startsWith("R") && parts[2] ? parts[2] : p;
    changed.set(normalized, status);
  }

  const baseChanged = [...changed.keys()].filter((p) => {
    if (!p.startsWith(`${portfolioRoot}${path.sep}`)) return false;
    const rel = p.slice(`${portfolioRoot}${path.sep}`.length);
    return rel.endsWith(".mdx") && !rel.includes(path.sep);
  });

  if (baseChanged.length === 0) return;

  const errors = [];

  for (const basePath of baseChanged) {
    const baseName = path.basename(basePath);
    const baseStatus = changed.get(basePath) ?? "M";

    for (const locale of locales) {
      const localePath = path.join(portfolioRoot, locale, baseName);

      // If the locale file doesn't exist at all, that's out of sync.
      if (!fs.existsSync(localePath)) {
        errors.push(
          `${basePath} changed but missing locale file: ${localePath}`,
        );
        continue;
      }

      const localeStatus = changed.get(localePath);

      if (baseStatus.startsWith("M") && !localeStatus) {
        errors.push(
          `${basePath} changed but ${localePath} was not updated in the same push`,
        );
      }

      if (baseStatus.startsWith("A") && !(localeStatus?.startsWith("A"))) {
        errors.push(
          `${basePath} added but ${localePath} was not added in the same push`,
        );
      }

      if (baseStatus.startsWith("D") && !(localeStatus?.startsWith("D"))) {
        errors.push(
          `${basePath} deleted but ${localePath} was not deleted in the same push`,
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("i18n sync check failed:");
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }
}

main();

