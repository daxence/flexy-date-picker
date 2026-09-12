---
name: styling-token-workflow
description: "Use when styling UI, defining theme tokens, or adjusting visual variants in this project. Encourages CSS variables, reusable tokens, and flexible slot-based styles."
user-invocable: true
---

# Styling and Token Workflow

## When to Use
- Changing component visuals, layout, spacing, motion, or theme tokens.
- Adding a new visual variant or adjusting a design system primitive.

## Procedure
1. Prefer CSS custom properties, theme variables, and shared tokens over literal values.
2. Extend the existing token surface before introducing a one-off style value.
3. Keep styling slot-based and override-friendly through the existing `classNames`, `styles`, and theme APIs.
4. Make any new visual rule overridable instead of baking it into the component.
5. Keep components flexible by separating structure from presentation where practical.
6. Verify the result in Storybook and add tests when styling changes affect behavior.

## Good Defaults
- Keep spacing, radius, colors, shadows, and motion consistent through variables.
- Avoid hard-coded styling that makes future variants difficult.
- Favor reusable theme primitives over component-local magic numbers.
- If lint surfaces a style-related issue in the touched area, fix it rather than bypassing the rule.