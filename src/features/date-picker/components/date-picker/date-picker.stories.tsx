import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { DatePicker } from './date-picker';

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,

  argTypes: {
    // ── Selection mode ────────────────────────────────────────────────────
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Selection mode — single date or date range.',
      table: { category: 'Selection', defaultValue: { summary: 'single' } },
    },

    // ── Single value ─────────────────────────────────────────────────────
    value: {
      control: false,
      description: 'Controlled single date value (dayjs).',
      table: { category: 'Selection' },
    },
    defaultValue: {
      control: false,
      description: 'Uncontrolled initial single date value.',
      table: { category: 'Selection' },
    },

    // ── Range value ───────────────────────────────────────────────────────
    rangeValue: {
      control: false,
      description: 'Controlled range value `{ start, end }`.',
      table: { category: 'Selection' },
    },
    defaultRangeValue: {
      control: false,
      description: 'Uncontrolled initial range value.',
      table: { category: 'Selection' },
    },

    // ── Format & locale ───────────────────────────────────────────────────
    format: {
      control: 'text',
      description: 'Display format passed to `dayjs .format()`. E.g. `MMM D, YYYY`.',
      table: { category: 'Formatting', defaultValue: { summary: 'MMM D, YYYY' } },
    },
    locale: {
      control: 'text',
      description: 'Locale string for dayjs (e.g. `fr`, `ar`, `de`).',
      table: { category: 'Formatting' },
    },
    lang: {
      control: 'text',
      description: 'Language alias for locale — identical to `locale`.',
      table: { category: 'Formatting' },
    },

    // ── Calendar ──────────────────────────────────────────────────────────
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of the week: 0 = Sunday … 6 = Saturday.',
      table: { category: 'Calendar', defaultValue: { summary: '0' } },
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'Number of calendar panels shown at once.',
      table: { category: 'Calendar', defaultValue: { summary: '1' } },
    },
    showAdjacentMonthDays: {
      control: 'boolean',
      description: 'Show day numbers from the previous/next months inside the current grid.',
      table: { category: 'Calendar', defaultValue: { summary: 'false' } },
    },
    highlightToday: {
      control: 'boolean',
      description: "Highlight today's date in the calendar.",
      table: { category: 'Calendar', defaultValue: { summary: 'true' } },
    },
    inline: {
      control: 'boolean',
      description: 'Render calendar inline — removes the input trigger and popover.',
      table: { category: 'Calendar', defaultValue: { summary: 'false' } },
    },

    // ── Constraints ───────────────────────────────────────────────────────
    minDate: {
      control: false,
      description: 'Earliest selectable date (dayjs).',
      table: { category: 'Constraints' },
    },
    maxDate: {
      control: false,
      description: 'Latest selectable date (dayjs).',
      table: { category: 'Constraints' },
    },
    disabled: {
      control: false,
      description: '`DisabledConfig` object or `true` to disable all dates.',
      table: { category: 'Constraints' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire picker.',
      table: { category: 'Constraints', defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the picker read-only (display only).',
      table: { category: 'Constraints', defaultValue: { summary: 'false' } },
    },

    // ── Input ─────────────────────────────────────────────────────────────
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input. Array form `[start, end]` for range mode.',
      table: { category: 'Input' },
    },
    clearable: {
      control: 'boolean',
      description: 'Show the clear (×) button.',
      table: { category: 'Input', defaultValue: { summary: 'true' } },
    },

    // ── Time ──────────────────────────────────────────────────────────────
    enableTime: {
      control: 'boolean',
      description: 'Show a time-slot picker panel alongside the calendar.',
      table: { category: 'Time', defaultValue: { summary: 'false' } },
    },
    timeStep: {
      control: { type: 'number', min: 5, max: 60, step: 5 },
      description: 'Time slot interval in minutes.',
      table: { category: 'Time', defaultValue: { summary: '15' } },
    },
    timeFormat: {
      control: 'text',
      description: 'Display format for time slots. Default `HH:mm`.',
      table: { category: 'Time', defaultValue: { summary: 'HH:mm' } },
    },
    minTime: {
      control: 'text',
      description: 'Earliest selectable time in `HH:mm`.',
      table: { category: 'Time', defaultValue: { summary: '00:00' } },
    },
    maxTime: {
      control: 'text',
      description: 'Latest selectable time in `HH:mm`.',
      table: { category: 'Time', defaultValue: { summary: '23:59' } },
    },
    disabledTime: {
      control: false,
      description: 'Disable specific time slots by weekday, date key, or predicate.',
      table: { category: 'Time' },
    },

    // ── Tooltip ───────────────────────────────────────────────────────────
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on each day cell. Accepts a string, ReactNode or function.',
      table: { category: 'Tooltip' },
    },
    tooltipDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Tooltip show delay in ms.',
      table: { category: 'Tooltip', defaultValue: { summary: '300' } },
    },

    // ── Theme tokens ──────────────────────────────────────────────────────
    theme: {
      control: 'object',
      description: 'CSS custom-property token overrides. See `DatePickerTheme` for all keys.',
      table: { category: 'Theme' },
    },

    // ── Slot overrides ────────────────────────────────────────────────────
    classNames: {
      control: 'object',
      description: 'Per-slot `className` overrides.',
      table: { category: 'Styling' },
    },
    styles: {
      control: 'object',
      description: 'Per-slot inline `style` overrides.',
      table: { category: 'Styling' },
    },
    className: {
      control: 'text',
      description: 'Extra `className` on the root wrapper.',
      table: { category: 'Styling' },
    },

    // ── Custom renderers ──────────────────────────────────────────────────
    renderDay: {
      control: false,
      description: 'Custom day cell renderer `(date, props) => ReactNode`.',
      table: { category: 'Renderers' },
    },
    renderNavButton: {
      control: false,
      description: "Custom nav button renderer `(direction, onClick) => ReactNode`.",
      table: { category: 'Renderers' },
    },
    renderInput: {
      control: false,
      description: 'Custom input trigger renderer.',
      table: { category: 'Renderers' },
    },

    // ── Events ────────────────────────────────────────────────────────────
    onDateChange: {
      action: 'onDateChange',
      description: 'Fired when a single date is selected.',
      table: { category: 'Events' },
    },
    onRangeChange: {
      action: 'onRangeChange',
      description: 'Fired when range start or end changes.',
      table: { category: 'Events' },
    },
    onTimeChange: {
      action: 'onTimeChange',
      description: 'Fired when the time value changes.',
      table: { category: 'Events' },
    },
    onMonthChange: {
      action: 'onMonthChange',
      description: 'Fired when the calendar month is navigated.',
      table: { category: 'Events' },
    },
    onYearChange: {
      action: 'onYearChange',
      description: 'Fired when the calendar year is changed.',
      table: { category: 'Events' },
    },
    onDayHover: {
      action: 'onDayHover',
      description: 'Fired when the pointer hovers over a day.',
      table: { category: 'Events' },
    },
    onOpen: {
      action: 'onOpen',
      description: 'Fired when the popover opens.',
      table: { category: 'Events' },
    },
    onClose: {
      action: 'onClose',
      description: 'Fired when the popover closes.',
      table: { category: 'Events' },
    },
    onClear: {
      action: 'onClear',
      description: 'Fired when the clear button is pressed.',
      table: { category: 'Events' },
    },
    onBeforeSelect: {
      control: false,
      description: 'Fired before a date is committed; return `false` to cancel.',
      table: { category: 'Events' },
    },
    onAfterSelect: {
      action: 'onAfterSelect',
      description: 'Fired after a date is committed.',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TODAY = dayjs();
const NEXT_WEEK = TODAY.add(7, 'day');

// ─── Default ─────────────────────────────────────────────────────────────────

/**
 * The out-of-the-box experience with no props set.
 * Click the input to open the calendar and pick a date.
 */
export const Default: Story = {
  args: {},
};

// ─── Playground ──────────────────────────────────────────────────────────────

/**
 * Full interactive playground — every prop is wired to a Storybook Control.
 * Use the **Controls** panel below to toggle features in real time.
 */
export const Playground: Story = {
  args: {
    mode: 'single',
    placeholder: 'Select date',
    format: 'MMM D, YYYY',
    clearable: true,
    highlightToday: true,
    showAdjacentMonthDays: false,
    inline: false,
    enableTime: false,
    timeStep: 15,
    timeFormat: 'HH:mm',
    minTime: '00:00',
    maxTime: '23:59',
    isDisabled: false,
    readOnly: false,
    numberOfMonths: 1,
    weekStartsOn: 0,
    tooltipDelay: 300,
  },
};

// ─── Inline ───────────────────────────────────────────────────────────────────

/**
 * Renders the calendar inline — no input trigger or popover.
 * Useful for embedding the picker directly in a form or page.
 */
export const Inline: Story = {
  args: {
    inline: true,
  },
};

// ─── Range mode ───────────────────────────────────────────────────────────────

/**
 * Range selection — click a start date then an end date.
 * The `onRangeChange` action logs each selection step.
 */
export const RangeSelection: Story = {
  args: {
    mode: 'range',
    placeholder: ['Check-in', 'Check-out'],
  },
};

// ─── Range inline ─────────────────────────────────────────────────────────────

/**
 * Dual-panel range picker rendered inline — two months side by side.
 */
export const RangeInline: Story = {
  args: {
    mode: 'range',
    inline: true,
    numberOfMonths: 2,
    showAdjacentMonthDays: false,
  },
};

// ─── With time ────────────────────────────────────────────────────────────────

/**
 * Adds a time-slot panel next to the calendar.
 * The step is 30 minutes and the selectable range is 08:00 – 20:00.
 */
export const WithTime: Story = {
  args: {
    enableTime: true,
    timeStep: 30,
    minTime: '08:00',
    maxTime: '20:00',
    placeholder: 'Pick date & time',
  },
};

// ─── With time (inline) ───────────────────────────────────────────────────────

/**
 * Inline calendar with time selector.
 */
export const InlineWithTime: Story = {
  args: {
    inline: true,
    enableTime: true,
    timeStep: 15,
  },
};

// ─── Disabled dates ───────────────────────────────────────────────────────────

/**
 * Demonstrates the `disabled` prop with multiple strategies:
 * - Entire weekends via `predicate`
 * - A specific date list
 * - Before / after bounds
 */
export const DisabledDates: Story = {
  args: {
    disabled: {
      before: TODAY,
      after: TODAY.add(30, 'day'),
      predicate: (d) => d.day() === 0 || d.day() === 6, // block weekends
    },
    placeholder: 'Weekdays only, next 30 days',
  },
};

// ─── Min / max dates ──────────────────────────────────────────────────────────

/**
 * Constrain selection to a specific window using `minDate` + `maxDate`.
 */
export const MinMaxDates: Story = {
  args: {
    minDate: TODAY,
    maxDate: TODAY.add(14, 'day'),
    placeholder: 'Next 2 weeks only',
  },
};

// ─── Pre-selected single ─────────────────────────────────────────────────────

/**
 * Picker with an initial date selected via `defaultValue`.
 */
export const PreSelectedDate: Story = {
  args: {
    defaultValue: NEXT_WEEK,
    format: 'MMMM D, YYYY',
  },
};

// ─── Pre-selected range ───────────────────────────────────────────────────────

/**
 * Range picker with a default range via `defaultRangeValue`.
 */
export const PreSelectedRange: Story = {
  args: {
    mode: 'range',
    defaultRangeValue: { start: TODAY, end: NEXT_WEEK },
    inline: true,
  },
};

// ─── Show adjacent month days ─────────────────────────────────────────────────

/**
 * With `showAdjacentMonthDays: true` the grid is filled with greyed-out
 * days from the previous and next months.
 */
export const ShowAdjacentMonthDays: Story = {
  args: {
    inline: true,
    showAdjacentMonthDays: true,
  },
};

// ─── Week starts on Monday ────────────────────────────────────────────────────

/**
 * `weekStartsOn: 1` shifts the week grid so Monday is the first column.
 */
export const WeekStartsMonday: Story = {
  args: {
    inline: true,
    weekStartsOn: 1,
  },
};

// ─── Multi-month ──────────────────────────────────────────────────────────────

/**
 * `numberOfMonths: 3` renders three consecutive calendar panels at once.
 */
export const MultiMonth: Story = {
  args: {
    mode: 'range',
    inline: true,
    numberOfMonths: 3,
  },
};

// ─── Disabled picker ──────────────────────────────────────────────────────────

/**
 * `isDisabled: true` greys out the input and prevents all interaction.
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: TODAY,
  },
};

// ─── Read-only ────────────────────────────────────────────────────────────────

/**
 * `readOnly: true` shows the value but prevents changes.
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: TODAY,
  },
};

// ─── No clear button ──────────────────────────────────────────────────────────

/**
 * `clearable: false` hides the × button — useful when the field is required.
 */
export const NoClear: Story = {
  args: {
    clearable: false,
    defaultValue: TODAY,
  },
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────

/**
 * A static string tooltip shown on every day cell.
 */
export const WithTooltip: Story = {
  args: {
    inline: true,
    tooltip: 'Book this date',
    tooltipDelay: 200,
  },
};

// ─── Tooltip with function ────────────────────────────────────────────────────

/**
 * Dynamic tooltip using a render function — shows rich contextual info.
 */
export const TooltipWithFunction: Story = {
  args: {
    inline: true,
    tooltip: ({ date, isToday: today, isDisabled: dis }) =>
      today
        ? '🎯 Today'
        : dis
          ? '🚫 Unavailable'
          : `📅 ${date.format('MMMM D')}`,
    tooltipDelay: 100,
  },
};

// ─── Tooltip with nights count (hotel booking) ─────────────────────────────────

/**
 * Hotel-style range tooltip: labels check-in/check-out and shows a live
 * "X nights" count while hovering the candidate end date or once both
 * dates are selected. Uses the `nights`, `isRangeStart`, `isRangeEnd` and
 * `isPreviewRangeEnd` render props.
 */
export const TooltipNights: Story = {
  args: {
    inline: true,
    mode: 'range',
    placeholder: ['Check-in', 'Check-out'],
    tooltip: ({ isRangeStart, isRangeEnd, isPreviewRangeEnd, nights }) => {
      if (nights && (isRangeEnd || isPreviewRangeEnd)) {
        return `${nights} night${nights > 1 ? 's' : ''}`;
      }
      if (isRangeStart) return 'Check-in';
      if (isRangeEnd) return 'Check-out';
      return null;
    },
    tooltipDelay: 100,
  },
};

// ─── Custom theme — teal ──────────────────────────────────────────────────────

/**
 * Override CSS tokens via the `theme` prop to apply a teal accent.
 */
export const ThemeTeal: Story = {
  args: {
    inline: true,
    theme: {
      primary: '#0d9488',
      primaryHover: '#0f766e',
      primaryForeground: '#ffffff',
      muted: '#ccfbf1',
      accentSoft: 'rgba(13, 148, 136, 0.12)',
      borderRadius: '12px',
      dayBorderRadius: '10px',
    },
  },
};

// ─── Custom theme — purple ────────────────────────────────────────────────────

/**
 * Violet / purple brand accent.
 */
export const ThemePurple: Story = {
  args: {
    inline: true,
    theme: {
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      primaryForeground: '#ffffff',
      muted: '#ede9fe',
      accentSoft: 'rgba(124, 58, 237, 0.12)',
      todayColor: '#7c3aed',
      borderRadius: '20px',
      dayBorderRadius: '50%',
    },
  },
};

// ─── Custom theme — rose ──────────────────────────────────────────────────────

/**
 * Rose / red brand accent with a sharp square border radius.
 */
export const ThemeRose: Story = {
  args: {
    inline: true,
    theme: {
      primary: '#e11d48',
      primaryHover: '#be123c',
      primaryForeground: '#fff',
      muted: '#ffe4e6',
      accentSoft: 'rgba(225, 29, 72, 0.1)',
      todayColor: '#e11d48',
      borderRadius: '4px',
      dayBorderRadius: '2px',
    },
  },
};

// ─── Custom theme — amber dark ────────────────────────────────────────────────

/**
 * Dark surface + amber accent — simulates a dark mode.
 */
export const ThemeDark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    inline: true,
    theme: {
      primary: '#f59e0b',
      primaryHover: '#d97706',
      primaryForeground: '#0f172a',
      background: '#1e293b',
      surface: 'rgba(30, 41, 59, 0.95)',
      surfaceStrong: '#1e293b',
      foreground: '#f1f5f9',
      muted: 'rgba(245, 158, 11, 0.15)',
      accentSoft: 'rgba(245, 158, 11, 0.12)',
      mutedForeground: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.18)',
      inputBackground: '#1e293b',
      todayColor: '#f59e0b',
      shadow: '0 24px 64px -24px rgba(0,0,0,0.6)',
    },
  },
};

// ─── Custom day renderer ──────────────────────────────────────────────────────

/**
 * `renderDay` lets you inject any content into each day cell.
 * This example adds a red dot indicator for the next 5 days.
 */
export const CustomDayRenderer: Story = {
  args: {
    inline: true,
    renderDay: (date, { isDisabled: dis }) => {
      const isDotDay = !dis && date.diff(TODAY, 'day') >= 0 && date.diff(TODAY, 'day') < 5;
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {date.date()}
          {isDotDay && (
            <span
              style={{
                position: 'absolute',
                bottom: 3,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--fldp-primary)',
              }}
            />
          )}
        </div>
      );
    },
  },
};

// ─── Custom nav button renderer ───────────────────────────────────────────────

/**
 * `renderNavButton` replaces the default ‹ / › buttons with custom elements.
 */
export const CustomNavButtons: Story = {
  args: {
    inline: true,
    renderNavButton: (direction, onClick) => (
      <button
        onClick={onClick}
        style={{
          background: 'var(--fldp-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          width: 28,
          height: 28,
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {direction === 'prev' ? '←' : '→'}
      </button>
    ),
  },
};

// ─── French locale ────────────────────────────────────────────────────────────

/**
 * The `locale` prop switches day/month labels to French.
 *
 * > **Note**: you must import the dayjs locale in your app:
 * > `import 'dayjs/locale/fr'`
 */
export const LocaleFrench: Story = {
  args: {
    inline: true,
    locale: 'fr',
    weekStartsOn: 1,
  },
};

// ─── Slot className overrides ────────────────────────────────────────────────

/**
 * `classNames` lets you attach custom CSS classes to individual UI slots.
 */
export const SlotClassNames: Story = {
  args: {
    inline: true,
    classNames: {
      calendarHeader: 'my-header',
      day: 'my-day',
    },
  },
};
