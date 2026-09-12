import type { Dayjs } from 'dayjs';
import type { CSSProperties, ReactNode } from 'react';

// ─── Core value types ────────────────────────────────────────────────────────

export type DateValue = Dayjs | null;

export interface DateRange {
  start: DateValue;
  end: DateValue;
}

export type PickerMode = 'single' | 'range';

export type DateSelectionPhase = 'single' | 'range-start' | 'range-end';

export interface DateSelectionMeta {
  mode: PickerMode;
  phase: DateSelectionPhase;
  currentValue: DateValue;
  currentRange: DateRange;
  nextValue: DateValue | DateRange;
}

// ─── Slot class/style overrides ──────────────────────────────────────────────

export interface DatePickerClassNames {
  /** Outermost wrapper */
  root?: string;
  /** The input trigger area */
  inputWrapper?: string;
  /** Individual text input */
  input?: string;
  /** The separator between range inputs (e.g. "→") */
  separator?: string;
  /** Clear button */
  clearButton?: string;
  /** Calendar popover container */
  popover?: string;
  /** Calendar wrapper */
  calendar?: string;
  /** Calendar header row */
  calendarHeader?: string;
  /** Prev/next navigation buttons */
  navButton?: string;
  /** Month/year label */
  monthYearLabel?: string;
  /** Weekday name row */
  weekdays?: string;
  /** Individual weekday label */
  weekday?: string;
  /** Days grid */
  daysGrid?: string;
  /** Individual day cell */
  day?: string;
  /** Today's day */
  dayToday?: string;
  /** Selected single day */
  daySelected?: string;
  /** Range start day */
  dayRangeStart?: string;
  /** Range end day */
  dayRangeEnd?: string;
  /** Days between start and end */
  dayInRange?: string;
  /** Disabled day */
  dayDisabled?: string;
  /** Day outside current month */
  dayOutside?: string;
  /** Day being hovered */
  dayHovered?: string;
  /** Time picker wrapper */
  timePicker?: string;
  /** Time picker title */
  timeTitle?: string;
  /** Time slots list */
  timeSlotList?: string;
  /** Time slot item */
  timeSlot?: string;
  /** Selected time slot */
  timeSlotSelected?: string;
  /** Disabled time slot */
  timeSlotDisabled?: string;
  /** Tooltip container */
  tooltip?: string;
}

export interface DatePickerStyles {
  root?: CSSProperties;
  inputWrapper?: CSSProperties;
  input?: CSSProperties;
  separator?: CSSProperties;
  clearButton?: CSSProperties;
  popover?: CSSProperties;
  calendar?: CSSProperties;
  calendarHeader?: CSSProperties;
  navButton?: CSSProperties;
  monthYearLabel?: CSSProperties;
  weekdays?: CSSProperties;
  weekday?: CSSProperties;
  daysGrid?: CSSProperties;
  day?: CSSProperties;
  dayToday?: CSSProperties;
  daySelected?: CSSProperties;
  dayRangeStart?: CSSProperties;
  dayRangeEnd?: CSSProperties;
  dayInRange?: CSSProperties;
  dayDisabled?: CSSProperties;
  dayOutside?: CSSProperties;
  dayHovered?: CSSProperties;
  timePicker?: CSSProperties;
  timeTitle?: CSSProperties;
  timeSlotList?: CSSProperties;
  timeSlot?: CSSProperties;
  timeSlotSelected?: CSSProperties;
  timeSlotDisabled?: CSSProperties;
  tooltip?: CSSProperties;
}

export interface DisabledTimeConfig {
  /** Disable times for specific weekdays: 0=Sun ... 6=Sat */
  weekdays?: Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, string[]>>;
  /** Disable times for specific dates by YYYY-MM-DD */
  dates?: Record<string, string[]>;
  /** Custom predicate for disabling a time slot */
  predicate?: (date: Dayjs, time: string) => boolean;
}

// ─── Time schedule ────────────────────────────────────────────────────────────

/** A continuous block of time with its own slot interval */
export interface TimeRange {
  /** Start time (inclusive) in HH:mm */
  from: string;
  /** End time (inclusive) in HH:mm */
  to: string;
  /** Slot interval in minutes for this range (e.g. 5, 15, 30) */
  step: number;
}

/**
 * Time availability schedule for a single date.
 *
 * - `ranges`: one or more time blocks, each with its own step interval.
 *   Gaps between ranges are simply absent from the slot list.
 * - `unavailable`: set to `true` to hide the time picker entirely for this date.
 */
export interface DateSchedule {
  ranges?: TimeRange[];
  unavailable?: boolean;
}

export interface DatePickerTheme {
  /** Primary/accent color */
  primary?: string;
  /** Primary hover color */
  primaryHover?: string;
  /** Text on primary background */
  primaryForeground?: string;
  /** Background of the popover/calendar */
  background?: string;
  /** Elevated surface used for trigger and menus */
  surface?: string;
  /** Stronger surface tone for hover/active states */
  surfaceStrong?: string;
  /** Default text color */
  foreground?: string;
  /** Muted background (in-range highlight) */
  muted?: string;
  /** Soft accent background */
  accentSoft?: string;
  /** Muted text */
  mutedForeground?: string;
  /** Border color */
  border?: string;
  /** Input background */
  inputBackground?: string;
  /** Border radius (e.g. "8px") */
  borderRadius?: string;
  /** Day cell border radius */
  dayBorderRadius?: string;
  /** Box shadow for popover */
  shadow?: string;
  /** Font family */
  fontFamily?: string;
  /** Font size base */
  fontSize?: string;
  /** Today indicator color */
  todayColor?: string;
  /** Disabled day opacity */
  disabledOpacity?: string;
  /** Transition duration */
  transitionDuration?: string;
  /** Popover z-index */
  zIndex?: string;
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export interface TooltipRenderProps {
  date: Dayjs;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  /** True while user is selecting the end date in range mode */
  isRangeSelecting?: boolean;
  /** True for days inside the temporary hover preview range */
  isInPreviewRange?: boolean;
  /** True for the hovered candidate end date while selecting a range */
  isPreviewRangeEnd?: boolean;
  /** Range mode only: the committed or in-progress start date */
  rangeStart?: Dayjs | null;
  /** Range mode only: the committed end date, or the hovered candidate end while selecting */
  rangeEnd?: Dayjs | null;
  /**
   * Range mode only: number of nights between `rangeStart` and `rangeEnd`
   * (committed or previewed). `null` until both ends are known.
   * Handy for hotel-style tooltips, e.g. `${nights} night(s)`.
   */
  nights?: number | null;
}

export type TooltipContent =
  | string
  | ReactNode
  | ((props: TooltipRenderProps) => ReactNode);

// ─── Events ──────────────────────────────────────────────────────────────────

export interface DatePickerEvents {
  /** Fired when a single date is selected */
  onDateChange?: (date: DateValue) => void;
  /** Fired when range selection changes */
  onRangeChange?: (range: DateRange) => void;
  /** Fired when the time changes for the current selection */
  onTimeChange?: (date: DateValue, time: string) => void;
  /** Fired before a date or range selection is committed; return false to cancel */
  onBeforeSelect?: (date: Dayjs, meta: DateSelectionMeta) => boolean | void;
  /** Fired after a date or range selection is committed */
  onAfterSelect?: (date: Dayjs, meta: DateSelectionMeta) => void;
  /** Fired when the viewed month changes */
  onMonthChange?: (month: number, year: number) => void;
  /** Fired when the viewed year changes */
  onYearChange?: (year: number) => void;
  /** Fired when a day is hovered */
  onDayHover?: (date: Dayjs | null) => void;
  /** Fired when the picker opens */
  onOpen?: () => void;
  /** Fired when the picker closes */
  onClose?: () => void;
  /** Fired when the picker is cleared */
  onClear?: () => void;
}

// ─── Disable rules ───────────────────────────────────────────────────────────

export interface DisabledConfig {
  /** Disable all dates before this date */
  before?: Dayjs;
  /** Disable all dates after this date */
  after?: Dayjs;
  /** Disable specific dates */
  dates?: Dayjs[];
  /** Custom predicate — return true to disable */
  predicate?: (date: Dayjs) => boolean;
}

// ─── Main component props ────────────────────────────────────────────────────

export interface DatePickerProps extends DatePickerEvents {
  /** Selection mode */
  mode?: PickerMode;

  // — Controlled/uncontrolled single date —
  value?: DateValue;
  defaultValue?: DateValue;

  // — Controlled/uncontrolled range —
  rangeValue?: DateRange;
  defaultRangeValue?: DateRange;

  /** Display format passed to dayjs .format() */
  format?: string;

  /** Locale string for dayjs (e.g. 'fr', 'ar') */
  locale?: string;

  /** Language alias for locale (e.g. 'fr', 'ar') */
  lang?: string;

  /** First day of the week: 0 = Sunday … 6 = Saturday */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /** Enable the time picker panel */
  enableTime?: boolean;

  /** Time slot interval in minutes (e.g. 5, 15, 30) */
  timeStep?: number;

  /** Time display format for slots, default HH:mm */
  timeFormat?: string;

  /** Earliest selectable time in HH:mm */
  minTime?: string;

  /** Latest selectable time in HH:mm */
  maxTime?: string;

  /** Disable specific time slots by weekday/date/predicate */
  disabledTime?: DisabledTimeConfig;

  /**
   * Per-date time schedules — key is `YYYY-MM-DD`.
   * When the selected date has an entry, its schedule overrides
   * `timeStep` / `minTime` / `maxTime`.
   *
   * Example:
   * ```ts
   * timeSchedule={{
   *   '2026-06-15': { unavailable: true },
   *   '2026-06-16': {
   *     ranges: [
   *       { from: '08:00', to: '12:00', step: 15 },
   *       { from: '14:00', to: '16:00', step: 5 },
   *       { from: '16:00', to: '18:00', step: 10 },
   *     ],
   *   },
   * }}
   * ```
   */
  timeSchedule?: Record<string, DateSchedule>;

  /**
   * Default schedule applied to all dates not listed in `timeSchedule`.
   * When provided, overrides `timeStep` / `minTime` / `maxTime`.
   */
  defaultTimeSchedule?: DateSchedule;

  /** Earliest selectable date */
  minDate?: Dayjs;

  /** Latest selectable date */
  maxDate?: Dayjs;

  /** Placeholder for single input or [start, end] for range */
  placeholder?: string | [string, string];

  /** Disable specific dates / ranges */
  disabled?: DisabledConfig | boolean;

  /** Whether the picker is disabled entirely */
  isDisabled?: boolean;

  /** Whether the picker is read-only */
  readOnly?: boolean;

  /** Show a clear button */
  clearable?: boolean;

  /** Show today's date highlight */
  highlightToday?: boolean;

  /** Show day numbers from previous/next months inside the current month grid */
  showAdjacentMonthDays?: boolean;

  /** @deprecated Use showAdjacentMonthDays instead */
  showOutsideDays?: boolean;

  /** Tooltip content for day cells */
  tooltip?: TooltipContent;

  /** Tooltip delay in ms */
  tooltipDelay?: number;

  /** CSS custom-property theme overrides */
  theme?: DatePickerTheme;

  /** Per-slot className overrides */
  classNames?: DatePickerClassNames;

  /** Per-slot inline style overrides */
  styles?: DatePickerStyles;

  /** Additional className on the root wrapper */
  className?: string;

  /** Additional style on the root wrapper */
  style?: CSSProperties;

  /** Number of months to show at once (range pickers often use 2) */
  numberOfMonths?: number;

  /** Show month/year dropdown selectors in header (default: true) */
  showMonthYearSelectors?: boolean;

  /** Render the calendar inline instead of using the trigger/popover UI */
  inline?: boolean;

  /**
   * Preferred popover placement relative to the trigger.
   * - `'bottom'` — always open below
   * - `'top'`    — always open above
   * - `'auto'`   — (default) open below when there is enough room, otherwise
   *                flip to above automatically; re-evaluates on window resize
   */
  placement?: 'top' | 'bottom' | 'auto';

  /** Render a custom day cell content */
  renderDay?: (date: Dayjs, props: TooltipRenderProps) => ReactNode;

  /** Render custom navigation buttons */
  renderNavButton?: (direction: 'prev' | 'next', onClick: () => void) => ReactNode;

  /** Custom input render */
  renderInput?: (props: RenderInputProps) => ReactNode;
}

export interface RenderInputProps {
  value: string;
  onClick: () => void;
  onClear: () => void;
  isOpen: boolean;
  placeholder: string;
  isDisabled: boolean;
  readOnly: boolean;
}
