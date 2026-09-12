import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DatePickerContext, type DatePickerContextValue } from '../../context';
import { Calendar } from '../calendar';
import { DateInput } from '../date-input';
import { cx } from '../../../../shared/utils/cx';
import { generateTimeSlots, generateSlotsForSchedule } from '../../utils';
import { buildThemeVars } from '../../styles/theme-vars';
import { TimeSlotList } from '../../../time-picker/components/time-slot-list';
import type {
  DatePickerProps,
  DateValue,
  DateRange,
  DatePickerClassNames,
  DatePickerStyles,
  DateSelectionMeta,
  DateSelectionPhase,
  DateSchedule,
} from '../../types';

dayjs.extend(isToday);
dayjs.extend(localizedFormat);

const DEFAULT_FORMAT = 'MMM D, YYYY';
const DEFAULT_SINGLE_PLACEHOLDER = 'Select date';
const DEFAULT_RANGE_PLACEHOLDER: [string, string] = ['Start date', 'End date'];
const DEFAULT_TIME_STEP = 15;
const DEFAULT_TIME_FORMAT = 'HH:mm';
const DEFAULT_MIN_TIME = '00:00';
const DEFAULT_MAX_TIME = '23:59';

export function DatePicker({
  mode = 'single',
  // Controlled single
  value,
  defaultValue,
  // Controlled range
  rangeValue,
  defaultRangeValue,
  format = DEFAULT_FORMAT,
  locale,
  lang,
  weekStartsOn = 0,
  enableTime = false,
  timeStep = DEFAULT_TIME_STEP,
  timeFormat = DEFAULT_TIME_FORMAT,
  minTime = DEFAULT_MIN_TIME,
  maxTime = DEFAULT_MAX_TIME,
  disabledTime,
  timeSchedule,
  defaultTimeSchedule,
  minDate,
  maxDate,
  placeholder,
  disabled,
  isDisabled = false,
  readOnly = false,
  clearable = true,
  highlightToday = true,
  showAdjacentMonthDays = false,
  showOutsideDays,
  tooltip,
  tooltipDelay = 300,
  theme,
  classNames: classNamesProp = {},
  styles: stylesProp = {},
  className,
  style,
  numberOfMonths = 1,
  showMonthYearSelectors = true,
  inline = false,
  placement = 'auto',
  renderDay,
  renderNavButton,
  renderInput,
  // Events
  onDateChange,
  onRangeChange,
  onTimeChange,
  onMonthChange,
  onYearChange,
  onDayHover,
  onOpen,
  onClose,
  onClear,
  onBeforeSelect,
  onAfterSelect,
}: DatePickerProps) {
  // ─── Single date state ─────────────────────────────────────────────────────
  const isControlledSingle = value !== undefined;
  const [internalSingle, setInternalSingle] = useState<DateValue>(
    defaultValue ?? null,
  );
  const singleValue: DateValue = isControlledSingle ? (value ?? null) : internalSingle;

  // ─── Range state ───────────────────────────────────────────────────────────
  const isControlledRange = rangeValue !== undefined;
  const [internalRange, setInternalRange] = useState<DateRange>(
    defaultRangeValue ?? { start: null, end: null },
  );
  const currentRange: DateRange = useMemo(
    () =>
      isControlledRange
        ? (rangeValue ?? { start: null, end: null })
        : internalRange,
    [isControlledRange, rangeValue, internalRange],
  );

  // ─── Hover state ──────────────────────────────────────────────────────────
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null);

  // ─── Popover state ─────────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // ─── Smart placement ──────────────────────────────────────────────────────
  // Resolved to 'top' or 'bottom'; recalculated whenever the popover opens or
  // the window is resized so the calendar never clips off-screen.
  const [resolvedPlacement, setResolvedPlacement] = useState<'top' | 'bottom'>('bottom');

  const computePlacement = useCallback(() => {
    if (inline || placement !== 'auto') {
      setResolvedPlacement(placement === 'top' ? 'top' : 'bottom');
      return;
    }
    /* v8 ignore next -- defensive guard, ref is always attached once mounted */
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    // Prefer bottom; flip to top only when bottom has less room than top
    setResolvedPlacement(spaceBelow >= spaceAbove ? 'bottom' : 'top');
  }, [inline, placement]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = window.requestAnimationFrame(computePlacement);
    window.addEventListener('resize', computePlacement);
    window.addEventListener('scroll', computePlacement, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', computePlacement);
      window.removeEventListener('scroll', computePlacement, true);
    };
  }, [isOpen, computePlacement]);

  // ─── Calendar navigation ───────────────────────────────────────────────────
  const initialDate =
    mode === 'single'
      ? singleValue ?? dayjs()
      : currentRange.start ?? dayjs();

  const [currentMonth, setCurrentMonth] = useState(initialDate.month());
  const [currentYear, setCurrentYear] = useState(initialDate.year());

  const open = useCallback(() => {
    if (inline || isDisabled || readOnly) return;
    setIsOpen(true);
    onOpen?.();
  }, [inline, isDisabled, readOnly, onOpen]);

  const close = useCallback(() => {
    if (inline) return;
    setIsOpen(false);
    onClose?.();
  }, [inline, onClose]);

  const toggleOpen = useCallback(() => {
    /* v8 ignore next -- only bound to the trigger, which never renders when inline */
    if (inline) return;
    if (isOpen) close(); else open();
  }, [inline, isOpen, close, open]);

  const buildSelectionMeta = useCallback(
    (
      phase: DateSelectionPhase,
      nextValue: DateValue | DateRange,
    ): DateSelectionMeta => ({
      mode,
      phase,
      currentValue: singleValue,
      currentRange,
      nextValue,
    }),
    [mode, singleValue, currentRange],
  );

  // ─── Click outside to close ────────────────────────────────────────────────
  useEffect(() => {
    if (inline) return;
    function handleOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, inline, close]);

  // ─── Escape to close ──────────────────────────────────────────────────────
  useEffect(() => {
    if (inline) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, inline, close]);

  function applyTime(date: Dayjs, time: string): Dayjs {
    const [h, m] = time.split(':').map(Number);
    // Generated slots are always well-formed "HH:mm"; these guard against malformed input.
    /* v8 ignore next */
    const hour = Number.isFinite(h) ? h : 0;
    /* v8 ignore next */
    const minute = Number.isFinite(m) ? m : 0;
    return date.hour(hour).minute(minute).second(0).millisecond(0);
  }

  // ─── Date selection logic ──────────────────────────────────────────────────
  const selectDate = useCallback(
    (date: Dayjs) => {
      let nextValue: DateValue | DateRange;
      let phase: DateSelectionPhase;

      if (mode === 'single') {
        phase = 'single';
        const nextSingle = enableTime && singleValue
          ? date.hour(singleValue.hour()).minute(singleValue.minute())
          : date;
        nextValue = nextSingle;
      } else if (!currentRange.start || (currentRange.start && currentRange.end)) {
        phase = 'range-start';
        const nextStart = enableTime && currentRange.start
          ? date.hour(currentRange.start.hour()).minute(currentRange.start.minute())
          : date;
        nextValue = { start: nextStart, end: null };
      } else {
        phase = 'range-end';
        // currentRange.end is always null here (see the range-start branch above),
        // so the picked date is used as-is with no time to preserve.
        const withTime = date;
        const [start, end] = withTime.isBefore(currentRange.start)
          ? [withTime, currentRange.start]
          : [currentRange.start, withTime];
        nextValue = { start, end };
      }

      const meta = buildSelectionMeta(phase, nextValue);
      if (onBeforeSelect?.(date, meta) === false) {
        return;
      }

      if (mode === 'single') {
        const newSingle = nextValue as Dayjs;
        if (!isControlledSingle) setInternalSingle(newSingle);
        onDateChange?.(newSingle);
      } else if (phase === 'range-start') {
        const newRange = nextValue as DateRange;
        if (!isControlledRange) setInternalRange(newRange);
        onRangeChange?.(newRange);
      } else {
        const newRange = nextValue as DateRange;
        if (!isControlledRange) setInternalRange(newRange);
        onRangeChange?.(newRange);
      }

      onAfterSelect?.(date, meta);

      if (!enableTime && (mode === 'single' || phase === 'range-end')) {
        close();
      }
    },
    [
      mode,
      currentRange,
      singleValue,
      isControlledSingle,
      isControlledRange,
      onBeforeSelect,
      onAfterSelect,
      onDateChange,
      onRangeChange,
      enableTime,
      buildSelectionMeta,
      close,
    ],
  );

  // ─── Clear ─────────────────────────────────────────────────────────────────
  function handleClear() {
    if (mode === 'single') {
      if (!isControlledSingle) setInternalSingle(null);
      onDateChange?.(null);
    } else {
      const empty: DateRange = { start: null, end: null };
      if (!isControlledRange) setInternalRange(empty);
      onRangeChange?.(empty);
    }
    onClear?.();
  }

  // ─── Style merging ─────────────────────────────────────────────────────────
  const classNames: DatePickerClassNames = classNamesProp;
  const styles: DatePickerStyles = stylesProp;
  const themeVars = buildThemeVars(theme);
  const resolvedShowAdjacentMonthDays = showOutsideDays ?? showAdjacentMonthDays;
  const resolvedLocale = lang ?? locale;
  const disabledConfig = disabled && typeof disabled === 'object' ? disabled : undefined;

  const disabledRules = disabled === true
    ? true
    : {
        ...disabledConfig,
        before: minDate
          ? disabledConfig?.before
            ? (disabledConfig.before.isAfter(minDate, 'day') ? disabledConfig.before : minDate)
            : minDate
          : disabledConfig?.before,
        after: maxDate
          ? disabledConfig?.after
            ? (disabledConfig.after.isBefore(maxDate, 'day') ? disabledConfig.after : maxDate)
            : maxDate
          : disabledConfig?.after,
      };

  // ─── Context value ─────────────────────────────────────────────────────────
  const contextValue: DatePickerContextValue & {
    renderDay?: DatePickerProps['renderDay'];
    renderNavButton?: DatePickerProps['renderNavButton'];
  } = {
    mode,
    singleValue,
    rangeValue: currentRange,
    hoveredDate,
    currentYear,
    currentMonth,
    setCurrentYear: (y: number) => { setCurrentYear(y); onYearChange?.(y); },
    setCurrentMonth: (m: number) => { setCurrentMonth(m); },
    selectDate,
    setHoveredDate,
    weekStartsOn,
    locale: resolvedLocale,
    showMonthYearSelectors,
    disabled: disabledRules,
    isDisabled,
    readOnly,
    highlightToday,
    showAdjacentMonthDays: resolvedShowAdjacentMonthDays,
    tooltip,
    tooltipDelay,
    format,
    classNames,
    styles,
    renderDay,
    renderNavButton,
    onDateChange,
    onRangeChange,
    onTimeChange,
    onMonthChange,
    onYearChange,
    onDayHover,
    onOpen,
    onClose,
    onClear,
  };

  const resolvedPlaceholder =
    placeholder ?? (mode === 'single' ? DEFAULT_SINGLE_PLACEHOLDER : DEFAULT_RANGE_PLACEHOLDER);

  const timeTargetDate = mode === 'single'
    ? (singleValue ?? dayjs(new Date(currentYear, currentMonth, 1)))
    : (currentRange.end ?? currentRange.start ?? dayjs(new Date(currentYear, currentMonth, 1)));

  const timeSlots = (() => {
    const dateKey = timeTargetDate.format('YYYY-MM-DD');
    const schedule: DateSchedule | undefined =
      timeSchedule?.[dateKey] ?? defaultTimeSchedule;
    if (schedule) return generateSlotsForSchedule(schedule);
    return generateTimeSlots(timeStep, minTime, maxTime);
  })();

  const selectedTimeValue = timeTargetDate.format('HH:mm');

  function handleSelectTime(slot: string) {
    // `isDisabled` is already enforced by TimeSlotList's own disabled buttons;
    // this guard only matters for direct/programmatic calls.
    /* v8 ignore next -- isDisabled branch unreachable through the rendered UI */
    if (isDisabled || readOnly) return;

    if (mode === 'single') {
      const nextDate = applyTime(timeTargetDate, slot);
      if (!isControlledSingle) setInternalSingle(nextDate);
      onDateChange?.(nextDate);
      onTimeChange?.(nextDate, slot);
      if (!inline) close();
      return;
    }

    if (currentRange.end) {
      const nextEnd = applyTime(currentRange.end, slot);
      const nextRange = { ...currentRange, end: nextEnd };
      if (!isControlledRange) setInternalRange(nextRange);
      onRangeChange?.(nextRange);
      onTimeChange?.(nextEnd, slot);
      if (!inline) close();
      return;
    }

    if (currentRange.start) {
      const nextStart = applyTime(currentRange.start, slot);
      const nextRange = { ...currentRange, start: nextStart };
      if (!isControlledRange) setInternalRange(nextRange);
      onRangeChange?.(nextRange);
      onTimeChange?.(nextStart, slot);
    }
  }

  const rootStyle: CSSProperties = { ...themeVars, ...style };

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        className={cx('fldp-root', className, classNames.root)}
        style={{ ...rootStyle, ...styles.root }}
        data-mode={mode}
        data-open={isOpen}
        data-inline={inline}
      >
        {!inline && (
          <DateInput
            mode={mode}
            singleValue={singleValue}
            rangeValue={currentRange}
            format={format}
            locale={resolvedLocale}
            placeholder={resolvedPlaceholder}
            isOpen={isOpen}
            isDisabled={isDisabled}
            readOnly={readOnly}
            clearable={clearable}
            classNames={classNames}
            styles={styles}
            onOpen={toggleOpen}
            onClear={handleClear}
            renderInput={renderInput}
          />
        )}

        {(inline || isOpen) && (
          <div
            role="dialog"
            aria-label="Date picker"
            aria-modal="false"
            className={cx(
              'fldp-popover',
              inline && 'fldp-popover--inline',
              !inline && `fldp-popover--${resolvedPlacement}`,
              classNames.popover,
            )}
            style={styles.popover}
          >
            {Array.from({ length: numberOfMonths }, (_, i) => (
              <Calendar key={i} panelIndex={i} totalPanels={numberOfMonths} />
            ))}

            {enableTime && (
              <TimeSlotList
                timeSlots={timeSlots}
                selectedTime={selectedTimeValue}
                onSelectTime={handleSelectTime}
                timeFormat={timeFormat}
                locale={resolvedLocale}
                targetDate={timeTargetDate}
                disabledTime={disabledTime}
                isDisabled={isDisabled}
                readOnly={readOnly}
                classNames={classNames}
                styles={styles}
              />
            )}
          </div>
        )}
      </div>
    </DatePickerContext.Provider>
  );
}
