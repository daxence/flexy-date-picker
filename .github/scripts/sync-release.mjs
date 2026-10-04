// Syncs package.json/package-lock.json's version and prepends the release
// notes to CHANGELOG.md, mirroring what @semantic-release/git used to push
// directly to main before it became rule-protected (PRs only).
import { readFileSync, writeFileSync } from 'node:fs';

const tagName = process.env.TAG_NAME;
const releaseBody = (process.env.RELEASE_BODY ?? '').trim();

if (!tagName) {
  throw new Error('TAG_NAME env var is required');
}

const version = tagName.replace(/^v/, '');

const pkgPath = 'package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
if (pkg.version === version) {
  console.warn(`package.json already at ${version}, skipping`);
} else {
  pkg.version = version;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.warn(`package.json version set to ${version}`);
}

const lockPath = 'package-lock.json';
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
if (lock.version === version) {
  console.warn(`package-lock.json already at ${version}, skipping`);
} else {
  lock.version = version;
  if (lock.packages?.['']) {
    lock.packages[''].version = version;
  }
  writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
  console.warn(`package-lock.json version set to ${version}`);
}

if (!releaseBody) {
  throw new Error('RELEASE_BODY env var is required to update CHANGELOG.md');
}

const changelogPath = 'CHANGELOG.md';
const changelog = readFileSync(changelogPath, 'utf8');
const firstLine = releaseBody.split('\n')[0];

if (changelog.includes(firstLine)) {
  console.warn(`CHANGELOG.md already has an entry for ${tagName}, skipping`);
} else {
  writeFileSync(changelogPath, `${releaseBody}\n\n${changelog}`);
  console.warn(`CHANGELOG.md updated with ${tagName} entry`);
}
