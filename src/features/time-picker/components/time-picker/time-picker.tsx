import { useRef, useState, useEffect, useCallback, type CSSProperties } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { cx } from '../../../../shared/utils/cx';
import { generateTimeSlots, generateSlotsForSchedule, isTimeDisabled } from '../../../date-picker/utils';
import type { DateSchedule, DisabledTimeConfig } from '../../../date-picker/types';
import { TimeSlotList } from '../time-slot-list';

export interface TimePickerProps {
  // ─── Value ─────────────────────────────────────────────────────────────────
  /** Controlled value in `HH:mm` (24-hour) format */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  /** Called with the selected `HH:mm` string, or `''` after clear */
  onChange?: (time: string) => void;

  // ─── Slot generation ───────────────────────────────────────────────────────
  /** Uniform interval in minutes (default 15). Ignored when `schedule` is set. */
  timeStep?: number;
  /** Earliest slot in `HH:mm` (default `'00:00'`). Ignored when `schedule` is set. */
  minTime?: string;
  /** Latest slot in `HH:mm` (default `'23:59'`). Ignored when `schedule` is set. */
  maxTime?: string;
  /**
   * Schedule-based slot generation. Each range has its own step interval.
   * Gaps between ranges produce no slots.
   * Overrides `timeStep` / `minTime` / `maxTime` when provided.
   *
   * @example
   * schedule={{
   *   ranges: [
   *     { from: '08:00', to: '12:00', step: 15 },
   *     { from: '14:00', to: '17:00', step: 30 },
   *   ],
   * }}
   */
  schedule?: DateSchedule;

  // ─── Display ───────────────────────────────────────────────────────────────
  /** dayjs format string for slot labels and input display (default `'HH:mm'`) */
  timeFormat?: string;
  /** Placeholder shown in the input when no time is selected */
  placeholder?: string;
  /** dayjs locale string (e.g. `'fr'`, `'ar'`) */
  locale?: string;

  // ─── Disabled time ─────────────────────────────────────────────────────────
  /**
   * Reference date used by `disabledTime` predicates.
   * Defaults to today when omitted.
   */
  date?: Dayjs;
  /** Disable specific slots by weekday / date / predicate */
  disabledTime?: DisabledTimeConfig;

  // ─── Layout ────────────────────────────────────────────────────────────────
  /**
   * Render the slot list directly inside the element (no input trigger,
   * no popover). Useful when embedding in a custom layout.
   */
  inline?: boolean;

  // ─── State ─────────────────────────────────────────────────────────────────
  /** Disable all interaction */
  isDisabled?: boolean;
  /** Prevent selection while still showing the picker */
  readOnly?: boolean;
  /** Show a clear (×) button when a time is selected */
  clearable?: boolean;

  // ─── Events ────────────────────────────────────────────────────────────────
  onOpen?: () => void;
  onClose?: () => void;
  onClear?: () => void;

  // ─── Style ─────────────────────────────────────────────────────────────────
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_TIME_FORMAT = 'HH:mm';
const DEFAULT_PLACEHOLDER = 'Select time';

export function TimePicker({
  value,
  defaultValue,
  onChange,
  timeStep = 15,
  minTime = '00:00',
  maxTime = '23:59',
  schedule,
  timeFormat = DEFAULT_TIME_FORMAT,
  placeholder = DEFAULT_PLACEHOLDER,
  locale,
  date,
  disabledTime,
  inline = false,
  isDisabled = false,
  readOnly = false,
  clearable = true,
  onOpen,
  onClose,
  onClear,
  className,
  style,
}: TimePickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(defaultValue ?? '');
  // `value` is guaranteed defined here since isControlled checks `value !== undefined`.
  const selected = isControlled ? (value as string) : internal;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    if (inline || isDisabled || readOnly) return;
    setIsOpen(true);
    onOpen?.();
  }, [inline, isDisabled, readOnly, onOpen]);

  // Only invoked from popover-mode call sites, so `inline` is always false here.
  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggleOpen = useCallback(() => {
    if (isOpen) close(); else open();
  }, [isOpen, close, open]);

  const targetDate = date ?? dayjs();

  const timeSlots = schedule
    ? generateSlotsForSchedule(schedule)
    : generateTimeSlots(timeStep, minTime, maxTime);

  // ─── Click outside → close ─────────────────────────────────────────────────
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

  // ─── Escape → close ────────────────────────────────────────────────────────
  useEffect(() => {
    if (inline) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, inline, close]);

  function handleSelect(slot: string) {
    if (!isControlled) setInternal(slot);
    onChange?.(slot);
    if (!inline) close();
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isControlled) setInternal('');
    onChange?.('');
    onClear?.();
  }

  const displayValue =
    selected && !isTimeDisabled(targetDate, selected, disabledTime)
      ? dayjs(`2000-01-01T${selected}`).locale(locale ?? 'en').format(timeFormat)
      : selected
        ? dayjs(`2000-01-01T${selected}`).locale(locale ?? 'en').format(timeFormat)
        : '';

  const slotList = (
    <TimeSlotList
      timeSlots={timeSlots}
      selectedTime={selected}
      onSelectTime={handleSelect}
      timeFormat={timeFormat}
      locale={locale}
      targetDate={targetDate}
      disabledTime={disabledTime}
      isDisabled={isDisabled}
      readOnly={readOnly}
    />
  );

  // ─── Inline mode: render slot list directly ────────────────────────────────
  if (inline) {
    return (
      <div
        ref={rootRef}
        className={cx('fldp-root fldp-root--time-only', className)}
        style={style}
        data-inline="true"
      >
        <div
          role="region"
          aria-label="Time picker"
          className="fldp-popover fldp-popover--inline fldp-popover--time-only"
        >
          {slotList}
        </div>
      </div>
    );
  }

  // ─── Popover mode: input trigger + floating slot list ─────────────────────
  return (
    <div
      ref={rootRef}
      className={cx('fldp-root fldp-root--time-only', className)}
      style={style}
      data-open={isOpen}
    >
      {/* Input trigger */}
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-label={displayValue || placeholder}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cx(
          'fldp-input-wrapper',
          isDisabled && 'fldp-input-wrapper--disabled',
          readOnly && 'fldp-input-wrapper--readonly',
          isOpen && 'fldp-input-wrapper--open',
        )}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleOpen();
          }
        }}
      >
        {/* Clock icon */}
        <svg
          className="fldp-clock-icon"
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>

        <span className={cx('fldp-input-value', !displayValue && 'fldp-input-value--placeholder')}>
          {displayValue || placeholder}
        </span>

        {clearable && selected && !isDisabled && !readOnly && (
          <button
            type="button"
            aria-label="Clear time"
            className="fldp-clear-button"
            tabIndex={-1}
            onClick={handleClear}
          >
            ×
          </button>
        )}

        {/* Chevron */}
        <svg
          className={cx('fldp-input-chevron', isOpen && 'fldp-input-chevron--open')}
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Floating popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Time picker"
          aria-modal="false"
          className="fldp-popover fldp-popover--time-only"
        >
          {slotList}
        </div>
      )}
    </div>
  );
}

