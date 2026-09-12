# Project Guidelines

## Architecture
- Keep the codebase feature-based: place product code under `src/features/<feature>/...` and shared primitives under `src/shared/...`.
- Prefer small, loosely coupled modules with clear public barrels in `index.ts` files.
- Preserve flexibility in public APIs: use composition, explicit props, and slot-based overrides instead of hard-wiring behavior.
- When extending an existing feature, follow the nearby file structure instead of introducing a new pattern.

## Code Style
- Use TypeScript and React patterns that stay readable without extra abstraction.
- Keep logic, rendering, and styling separated when it improves reuse.
- Avoid cross-feature coupling unless the dependency is truly shared.
- Favor names and types that make the public API easy to understand from the call site.
- Fix lint and type issues before merging changes, and respect the existing rules instead of working around them.

## Styling
- Treat styling as a token system: prefer CSS custom properties, theme variables, and reusable slots.
- Avoid literal colors, spacing, radii, shadows, or motion values when a variable or token can represent them.
- Make every visual choice overrideable through tokens, theme props, `classNames`, or `styles` before hard-coding anything.
- Keep components themeable and override-friendly through existing `classNames`, `styles`, and theme props.
- If a new visual value is needed, add it to the theme surface so it can be reused consistently.

## Build and Test
- Use `npm run build` to verify the library build.
- Use `npm run test` for the normal test pass and `npm run test:coverage` when behavior changes need coverage validation.
- Use `npm run storybook` to verify interactive UI changes and `npm run build-storybook` when static output matters.
- For every new component or user-visible feature, add or update tests and Storybook coverage.
- Update `src/demo/demo.tsx` whenever a new implementation or public behavior should appear in the demo experience.
- Keep the coverage gate at 100% for the runtime surface that the repo tracks, and add tests until the reported coverage is actually green.

## Conventions
- Keep component files, tests, and Storybook stories close together.
- Prefer feature-based exports and keep shared utilities in `src/shared`.
- Add or update docs and examples when the public API changes.
- Make new APIs flexible enough to support future variants without a rewrite.