# flexy-date-picker

[![npm version](https://img.shields.io/npm/v/flexy-date-picker.svg)](https://www.npmjs.com/package/flexy-date-picker)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/react-%3E%3D18-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)](https://www.typescriptlang.org/)
[![Test coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](#quality--testing)
[![Tests](https://img.shields.io/badge/tests-101%20passing-brightgreen.svg)](#quality--testing)
[![Bundle size](https://img.shields.io/badge/gzip-~35kB-blue.svg)](#quality--testing)

A **fully customizable** React date & time picker with single / range selection, an optional time picker, injectable CSS theming, tooltips, and a complete event API. Built with TypeScript, Day.js, and zero hard-coded visual opinions — every color, radius, and slot can be overridden.

![Desktop calendar](./screenshots/desktop-calendar.png)

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Live examples](#live-examples)
- [Components](#components)
  - [`DatePicker`](#datepicker)
  - [`TimePicker`](#timepicker-standalone)
  - [`CalendarLegend`](#calendarlegend)
- [Theming via CSS custom properties](#theming-via-css-custom-properties)
- [Per-slot class / style injection](#per-slot-class--style-injection)
- [Tooltips](#tooltips)
- [Disabled dates](#disabled-dates)
- [Date + time picker](#date--time-picker)
- [Per-date time schedules](#per-date-time-schedules)
- [Range picker](#range-picker)
- [Custom renderers](#custom-renderers)
- [Accessibility](#accessibility)
- [Quality & testing](#quality--testing)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ⚛️ React 19 + TypeScript, works with any React ≥ 18 host app
- 📅 [Day.js](https://day.js.org/) under the hood — no moment, no deprecated libs
- 🔀 Single-date and date-range selection modes
- ⏰ Optional built-in time picker (uniform step, custom ranges, or full per-date schedules) and a fully standalone `TimePicker` component
- 🎨 CSS custom properties — inject any color/shape/spacing without a build step
- 🧩 Per-slot `classNames` and `styles` props for surgical overrides (30+ slots)
- 🌍 Locale & RTL-friendly via dayjs locales (`fr`, `ar`, …) and configurable week start
- 📣 Full event API: `onBeforeSelect`, `onAfterSelect`, `onDateChange`, `onRangeChange`, `onTimeChange`, `onMonthChange`, `onYearChange`, `onDayHover`, `onOpen`, `onClose`, `onClear`
- 💬 Tooltip support (string, `ReactNode`, or render-prop with rich per-day context)
- 🖌️ Custom renderers for days, nav buttons, and the input trigger
- 🧱 `inline` mode to embed the calendar directly in a layout (no popover)
- ♿ Accessible by default: `role="grid"`, `aria-pressed`, `aria-disabled`, `aria-label`, keyboard-navigable listboxes
- 🚀 Vite library mode — ESM + UMD builds, tree-shakeable, fully typed

---

## Installation

```bash
npm install flexy-date-picker dayjs
```

```bash
pnpm add flexy-date-picker dayjs
```

`dayjs` is a peer dependency and must be installed alongside the package. `react` and `react-dom` (≥ 18) are also required as peer dependencies.

## Quick start

```tsx
import { DatePicker } from 'flexy-date-picker';
import 'flexy-date-picker/styles'; // import the CSS once, anywhere in your app

function App() {
  return <DatePicker mode="single" onDateChange={(date) => console.log(date)} />;
}
```

## Live examples

- **Demo app** — run `npm run dev` for a playground covering every prop combination (booking calendars, day content injection, multilingual pickers, time schedules, custom themes, and more). Each demo section includes a "View code" toggle with the exact snippet used.
- **Storybook** — run `npm run storybook` for isolated, documented stories per component (`DatePicker`, `TimePicker`, `CalendarLegend`), including controls for every prop.

---

## Components

### `DatePicker`

The main component. Supports single-date and range selection, an optional time picker, and full styling/theming control.

#### Selection & value props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `value` | `Dayjs \| null` | — | Controlled single value |
| `defaultValue` | `Dayjs \| null` | — | Uncontrolled default |
| `rangeValue` | `{ start, end }` | — | Controlled range value |
| `defaultRangeValue` | `{ start, end }` | — | Uncontrolled range default |

#### Formatting & locale

| Prop | Type | Default | Description |
|---|---|---|---|
| `format` | `string` | `'MMM D, YYYY'` | dayjs format string |
| `locale` | `string` | — | dayjs locale (e.g. `'fr'`, `'ar'`) |
| `lang` | `string` | — | Alias for `locale` |
| `weekStartsOn` | `0–6` | `0` (Sunday) | First day of week |

#### Calendar display

| Prop | Type | Default | Description |
|---|---|---|---|
| `numberOfMonths` | `number` | `1` | Months displayed at once |
| `showMonthYearSelectors` | `boolean` | `true` | Show month/year dropdown selectors |
| `showAdjacentMonthDays` | `boolean` | `false` | Show adjacent-month days in the grid |
| `showOutsideDays` | `boolean` | — | Deprecated alias for `showAdjacentMonthDays` |
| `highlightToday` | `boolean` | `true` | Highlight today |
| `inline` | `boolean` | `false` | Render the calendar directly, without an input/popover |
| `placement` | `'top' \| 'bottom' \| 'auto'` | `'auto'` | Popover placement |

#### Constraints & state

| Prop | Type | Default | Description |
|---|---|---|---|
| `minDate` / `maxDate` | `Dayjs` | — | Earliest / latest selectable date |
| `disabled` | `DisabledConfig \| boolean` | — | Disable dates (`before`, `after`, `dates`, `predicate`) |
| `isDisabled` | `boolean` | `false` | Disable the whole picker |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `placeholder` | `string \| [string, string]` | — | Input placeholder(s) |
| `clearable` | `boolean` | `true` | Show the clear button |

#### Time picker (built into `DatePicker`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `enableTime` | `boolean` | `false` | Show a time slot list alongside the calendar |
| `timeStep` | `number` | `15` | Uniform slot interval in minutes |
| `timeFormat` | `string` | `'HH:mm'` | dayjs format for time labels |
| `minTime` / `maxTime` | `string` (`HH:mm`) | `'00:00'` / `'23:59'` | Bounds for generated slots |
| `disabledTime` | `DisabledTimeConfig` | — | Disable slots by weekday, date, or predicate |
| `timeSchedule` | `Record<'YYYY-MM-DD', DateSchedule>` | — | Per-date schedule override (multiple ranges, custom steps, unavailability) |
| `defaultTimeSchedule` | `DateSchedule` | — | Fallback schedule for dates not present in `timeSchedule` |

#### Styling

| Prop | Type | Description |
|---|---|---|
| `theme` | `DatePickerTheme` | CSS variable overrides (see [theming](#theming-via-css-custom-properties)) |
| `classNames` | `DatePickerClassNames` | Per-slot className overrides (see [slots](#per-slot-class--style-injection)) |
| `styles` | `DatePickerStyles` | Per-slot inline style overrides |
| `className` / `style` | `string` / `CSSProperties` | Extra class/style on the root element |

#### Custom renderers

| Prop | Signature | Description |
|---|---|---|
| `renderDay` | `(date: Dayjs, props: TooltipRenderProps) => ReactNode` | Fully custom day cell content |
| `renderNavButton` | `(direction: 'prev' \| 'next', onClick: () => void) => ReactNode` | Custom prev/next month buttons |
| `renderInput` | `(props: RenderInputProps) => ReactNode` | Fully custom trigger input |

#### Tooltip

| Prop | Type | Default | Description |
|---|---|---|---|
| `tooltip` | `string \| ReactNode \| (props: TooltipRenderProps) => ReactNode` | — | Day tooltip content |
| `tooltipDelay` | `number` | `300` | Tooltip delay (ms) |

#### Events

| Prop | Signature | Description |
|---|---|---|
| `onDateChange` | `(date: Dayjs \| null) => void` | Fires on single-date selection/clear |
| `onRangeChange` | `(range: { start, end }) => void` | Fires on range selection/clear |
| `onTimeChange` | `(date: Dayjs \| null, time: string) => void` | Fires when a time slot is picked |
| `onBeforeSelect` | `(date: Dayjs, meta: DateSelectionMeta) => boolean \| void` | Return `false` to cancel a selection |
| `onAfterSelect` | `(date: Dayjs, meta: DateSelectionMeta) => void` | Fires right after a selection is committed |
| `onMonthChange` | `(month: number, year: number) => void` | Fires when the visible month changes |
| `onYearChange` | `(year: number) => void` | Fires when the visible year changes |
| `onDayHover` | `(date: Dayjs \| null) => void` | Fires on day hover (range preview) |
| `onOpen` / `onClose` | `() => void` | Popover open/close |
| `onClear` | `() => void` | Fires when the clear button is used |

---

### `TimePicker` (standalone)

A self-contained time-of-day picker that can be used independently of `DatePicker` — as a popover-triggering input or rendered inline.

```tsx
import { TimePicker } from 'flexy-date-picker';

<TimePicker
  value={time}
  onChange={setTime}
  timeStep={15}
  minTime="08:00"
  maxTime="18:00"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (`HH:mm`) | — | Controlled value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `onChange` | `(time: string) => void` | — | Called with the selected `HH:mm`, or `''` after clear |
| `timeStep` | `number` | `15` | Uniform slot interval in minutes (ignored when `schedule` is set) |
| `minTime` / `maxTime` | `string` (`HH:mm`) | `'00:00'` / `'23:59'` | Slot bounds (ignored when `schedule` is set) |
| `schedule` | `DateSchedule` | — | Schedule-based generation: multiple time ranges, each with its own step, with gaps between them producing no slots. Overrides `timeStep`/`minTime`/`maxTime` |
| `timeFormat` | `string` | `'HH:mm'` | dayjs format for slot labels and display |
| `placeholder` | `string` | — | Placeholder text when no value is selected |
| `locale` | `string` | — | dayjs locale |
| `date` | `Dayjs` | today | Reference date used by `disabledTime` |
| `disabledTime` | `DisabledTimeConfig` | — | Disable slots by weekday, date, or predicate |
| `inline` | `boolean` | `false` | Render the slot list directly, without an input/popover |
| `isDisabled` | `boolean` | `false` | Disable all interaction |
| `readOnly` | `boolean` | `false` | Show the value but prevent changes |
| `clearable` | `boolean` | `true` | Show the clear button |
| `onOpen` / `onClose` / `onClear` | `() => void` | — | Popover lifecycle events |
| `className` / `style` | `string` / `CSSProperties` | — | Root element overrides |

---

### `CalendarLegend`

A small presentational component for labeling calendar states (e.g. availability legends in booking UIs).

```tsx
import { CalendarLegend } from 'flexy-date-picker';

<CalendarLegend
  items={[
    { label: 'Available', className: 'fldp-legend-box--available' },
    { label: 'Selected', className: 'fldp-legend-box--selected' },
    { label: 'Unavailable', className: 'fldp-legend-box--unavailable' },
  ]}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `{ label: string \| ReactNode; className: string }[]` | 5 default French labels | Legend rows, each rendered as a colored box + label |
| `className` | `string` | — | Extra class on the root element |
| `style` | `CSSProperties` | — | Extra inline style on the root element |

---

## Theming via CSS custom properties

Override any token on a parent element:

```css
.my-app {
  --fldp-primary: #7c3aed;
  --fldp-primary-hover: #6d28d9;
  --fldp-muted: #ede9fe;
  --fldp-border-radius: 12px;
  --fldp-day-border-radius: 50%;
  --fldp-font-family: 'Inter', sans-serif;
}
```

Or pass the `theme` prop:

```tsx
<DatePicker
  lang="fr"
  weekStartsOn={1}
  theme={{
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    muted: '#ede9fe',
    borderRadius: '12px',
    dayBorderRadius: '50%',
  }}
/>
```

### All available tokens

| Token | Default | Description |
|---|---|---|
| `--fldp-primary` | `#3b82f6` | Accent / selected color |
| `--fldp-primary-hover` | `#2563eb` | Accent hover |
| `--fldp-primary-foreground` | `#ffffff` | Text on accent background |
| `--fldp-background` | `#ffffff` | Popover background |
| `--fldp-surface` | `rgba(255, 255, 255, 0.88)` | Trigger + menu surface |
| `--fldp-surface-strong` | `rgba(255, 255, 255, 0.98)` | Strong surface tone |
| `--fldp-foreground` | `#0f172a` | Default text color |
| `--fldp-muted` | `#eff6ff` | In-range highlight |
| `--fldp-accent-soft` | `rgba(15, 118, 110, 0.12)` | Soft hover/accent state |
| `--fldp-muted-foreground` | `#64748b` | Placeholder / weekday text |
| `--fldp-border` | `#e2e8f0` | Border color |
| `--fldp-input-background` | `#ffffff` | Input background |
| `--fldp-today-color` | `#3b82f6` | Today dot + text |
| `--fldp-border-radius` | `8px` | Outer radius |
| `--fldp-day-border-radius` | `6px` | Day cell radius |
| `--fldp-shadow` | `…` | Popover box shadow |
| `--fldp-font-family` | system-ui | Font family |
| `--fldp-font-size` | `14px` | Base font size |
| `--fldp-disabled-opacity` | `0.38` | Disabled element opacity |
| `--fldp-transition-duration` | `150ms` | Animation speed |
| `--fldp-z-index` | `9999` | Popover z-index |

---

## Per-slot class / style injection

Every visual slot accepts a className and inline style:

```tsx
<DatePicker
  classNames={{
    calendar: 'my-calendar',
    daySelected: 'my-selected-day',
    popover: 'my-popover',
  }}
  styles={{
    popover: { background: '#fefce8' },
    dayInRange: { fontWeight: 700 },
  }}
/>
```

Available slots: `root`, `inputWrapper`, `input`, `separator`, `clearButton`, `popover`, `calendar`, `calendarHeader`, `navButton`, `monthYearLabel`, `weekdays`, `weekday`, `daysGrid`, `day`, `dayToday`, `daySelected`, `dayRangeStart`, `dayRangeEnd`, `dayInRange`, `dayDisabled`, `dayOutside`, `dayHovered`, `timePicker`, `timeTitle`, `timeSlotList`, `timeSlot`, `timeSlotSelected`, `timeSlotDisabled`, `tooltip`.

---

## Tooltips

```tsx
// Static string
<DatePicker tooltip="Click to select" />

// ReactNode
<DatePicker tooltip={<strong>Pick a date</strong>} />

// Render prop — full control, including hotel-style "X nights" hints
<DatePicker
  mode="range"
  tooltip={({ date, isToday, isDisabled, isRangeStart, isRangeEnd, isInRange, nights }) => {
    if (isDisabled) return '🚫 Unavailable';
    if (nights && isRangeEnd) return `${nights} night${nights > 1 ? 's' : ''}`;
    if (isRangeStart) return '📌 Check-in';
    if (isRangeEnd) return '🏁 Check-out';
    if (isToday) return '📅 Today';
    return date.format('dddd, MMM D');
  }}
  tooltipDelay={200}
/>
```

---

## Disabled dates

```tsx
<DatePicker
  disabled={{
    before: dayjs('2024-01-01'),   // disable all before Jan 1
    after: dayjs('2024-12-31'),    // disable all after Dec 31
    dates: [dayjs('2024-06-15')],  // specific dates
    predicate: (d) => d.day() === 0 || d.day() === 6, // weekends
  }}
/>
```

---

## Date + time picker

Combine calendar selection with a time slot list in one component:

```tsx
<DatePicker
  mode="single"
  value={meetingDate}
  onDateChange={setMeetingDate}
  onTimeChange={(date, time) => console.log(date, time)}
  enableTime
  timeStep={15}
  timeFormat="HH:mm"
  minTime="08:00"
  maxTime="20:00"
  disabledTime={{
    weekdays: { 0: ['08:00', '08:15', '08:30'], 6: ['08:00', '08:15', '08:30'] },
  }}
/>
```

## Per-date time schedules

Give individual dates their own set of time ranges — with gaps, different step intervals, or full unavailability — via `timeSchedule` / `defaultTimeSchedule`:

```tsx
<DatePicker
  mode="single"
  enableTime
  defaultTimeSchedule={{ ranges: [{ from: '09:00', to: '17:00', step: 30 }] }}
  timeSchedule={{
    '2026-06-15': { unavailable: true }, // fully booked, no slots shown
    '2026-06-16': {
      ranges: [
        { from: '08:00', to: '12:00', step: 15 },
        { from: '14:00', to: '16:00', step: 5 },
        { from: '16:00', to: '18:00', step: 10 },
      ],
    },
  }}
/>
```

---

## Range picker

```tsx
const [range, setRange] = useState({ start: null, end: null });

<DatePicker
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  numberOfMonths={2}
/>
```

---

## Custom renderers

```tsx
<DatePicker
  renderDay={(date, { isSelected }) => (
    <span style={{ fontWeight: isSelected ? 700 : 400 }}>{date.date()}</span>
  )}
  renderNavButton={(direction, onClick) => (
    <button onClick={onClick}>{direction === 'prev' ? '←' : '→'}</button>
  )}
  renderInput={({ value, onClick, isOpen }) => (
    <button onClick={onClick}>{value || 'Pick a date'} {isOpen ? '▲' : '▼'}</button>
  )}
/>
```

---

## Accessibility

The calendar grid, navigation, and inputs follow WAI-ARIA authoring practices out of the box:

- Day grid uses `role="grid"` / `role="row"` / `role="columnheader"`, with each day exposing `aria-label` (full localized date), `aria-pressed` (selected state), and `aria-disabled`.
- Month/year navigation exposes `aria-label="Previous month"` / `"Next month"`, and the month/year dropdowns use `role="listbox"` / `role="option"` with `aria-expanded` / `aria-selected`.
- The input trigger uses `role="button"`, `aria-haspopup="dialog"`, and `aria-expanded`; the popover itself uses `role="dialog"`.
- The standalone time picker region is exposed via `role="region"` with a descriptive `aria-label`.
- Decorative icons/carets are marked `aria-hidden="true"` so they're skipped by screen readers.

---

## Quality & testing

This project is built and gated the way a production library should be:

| Check | Status |
|---|---|
| **Unit test coverage** | 100% statements / branches / functions / lines, enforced as a hard CI gate (`vitest --coverage`, thresholds in [vite.config.ts](./vite.config.ts)) |
| **Test suite** | 100+ tests across every component, context, and utility (`vitest`, React Testing Library) |
| **Type safety** | `strict` TypeScript, zero `any` leaking through the public API, full `.d.ts` output |
| **Linting** | ESLint with `typescript-eslint`, `react-hooks`, `jsx-a11y`, and `unicorn` rule sets, zero warnings allowed |
| **Accessibility** | WAI-ARIA roles/attributes on every interactive element (see [Accessibility](#accessibility)) and an automated `@storybook/addon-a11y` check on every story |
| **Bundle** | Tree-shakeable ESM + UMD output via `vite-plugin-dts`, ~35 kB gzipped for the full library |
| **Commits & releases** | [Conventional Commits](https://www.conventionalcommits.org/) enforced via `commitlint` + `husky`, versioning and changelog automated with `semantic-release` |

Every prop, event, and edge case documented above (disabled dates, per-date time schedules, range reordering, keyboard navigation, placement auto-resolution, etc.) is backed by a dedicated test — the goal is that the README and the test suite never drift apart.

```bash
npm run test            # Run the full suite
npm run test:coverage   # Run with the 100% coverage gate enforced
npm run lint             # Zero-warning lint pass
```

---

## Development

```bash
npm install
npm run dev              # Vite dev server with the demo app (with copy-pasteable code snippets)
npm run build             # Build the library to /dist
npm run test               # Run the test suite
npm run test:coverage      # Run tests with coverage
npm run storybook          # Explore components interactively
npm run build-storybook    # Build a static Storybook site
npm run lint               # Lint the codebase
```

## Contributing

Issues and pull requests are welcome. Please:

1. Keep the codebase feature-based (`src/features/<feature>/...`) and add tests + Storybook stories for new behavior.
2. Run `npm run lint` and `npm run test` before opening a PR.
3. Follow [Conventional Commits](https://www.conventionalcommits.org/) — releases are automated with `semantic-release`.

## License

[MIT](./LICENSE) © [Daxence Solutions](https://github.com/daxence)