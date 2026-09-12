---
name: component-workflow
description: "Use when adding or refactoring components, hooks, contexts, or feature modules in this project. Covers feature-based structure, tests, Storybook, and demo updates."
user-invocable: true
---

# Component Workflow

## When to Use
- Adding a new component, hook, context, or feature slice.
- Refactoring public behavior, props, or exports.
- Introducing a new visible state that should be documented and tested.

## Procedure
1. Place the implementation in the relevant `src/features/<feature>/...` area.
2. Keep shared-only logic in `src/shared/...` and avoid importing feature internals across boundaries.
3. Add or update tests next to the implementation.
4. Add or update Storybook stories and docs for any user-visible component or state.
5. Update `src/demo/demo.tsx` when the new work should appear in the demo page or public examples.
6. Export the public surface through the nearest `index.ts` barrel.
7. Keep the API flexible enough for future variants and keep coupling low.

## Good Defaults
- Prefer small, composable pieces over large monoliths.
- Reuse existing feature patterns before inventing a new convention.
- Preserve backward compatibility unless the change is intentionally breaking.
- Fix lint and type issues in the touched slice before calling the work done.
- Respect existing repository rules, conventions, and public API patterns instead of bypassing them.