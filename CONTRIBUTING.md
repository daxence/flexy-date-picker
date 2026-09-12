# Contributing

Thanks for considering a contribution to `@daxence/flexy-date-picker`! This project follows a
feature-based structure and a strict quality bar (100% test coverage, zero lint warnings).

## Getting started

```bash
git clone https://github.com/daxence/flexy-date-picker.git
cd flexy-date-picker
npm install
npm run dev          # demo playground
npm run storybook    # component stories
```

## Development workflow

1. Create a branch off `main`.
2. Keep code feature-based: product code under `src/features/<feature>/...`, shared primitives
   under `src/shared/...`.
3. Add or update tests and Storybook stories for any new or changed behavior.
4. Update `src/demo/demo.tsx` when a new implementation or public behavior should appear in the
   demo experience.
5. Update the README when the public API changes.

## Before opening a pull request

Run the full local check suite — it mirrors what CI runs:

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json
npm run test:coverage
npm run build
npm run build-storybook
```

All of these must pass, and coverage must stay at 100% for the tracked runtime surface.

## Commit messages

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) and enforces
them via `commitlint` + `husky`. Releases (versioning, changelog, npm publish) are fully automated
with `semantic-release` based on commit messages:

- `fix: ...` → patch release
- `feat: ...` → minor release
- `feat!: ...` or a `BREAKING CHANGE:` footer → major release
- `chore:`, `docs:`, `refactor:`, `test:`, `ci:` → no release

## Pull requests

- Keep PRs focused on a single change.
- Describe the motivation and, for UI changes, include a screenshot or a Storybook link.
- CI must be green before review.

## Reporting bugs / requesting features

Please use the [issue templates](.github/ISSUE_TEMPLATE) so we have the information needed to
reproduce or evaluate the request.
