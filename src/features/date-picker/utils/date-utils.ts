import dayjs, { type Dayjs } from 'dayjs';
import type { DateRange, DateSchedule, DisabledConfig, DisabledTimeConfig } from '../types';

export type { Dayjs };

/** Check if two Dayjs values represent the same calendar day */
export function isSameDay(a: Dayjs | null, b: Dayjs | null): boolean {
  if (!a || !b) return false;
  return a.isSame(b, 'day');
}

/** Check if `date` is strictly between `start` and `end` (exclusive) */
export function isBetween(date: Dayjs, start: Dayjs | null, end: Dayjs | null): boolean {
  if (!start || !end) return false;
  const s = start.isBefore(end) ? start : end;
  const e = start.isBefore(end) ? end : start;
  return date.isAfter(s, 'day') && date.isBefore(e, 'day');
}

/** Check if `date` is the start of a range */
export function isRangeStart(date: Dayjs, range: DateRange): boolean {
  if (!range.start) return false;
  const start = range.end && range.start.isAfter(range.end) ? range.end : range.start;
  return isSameDay(date, start);
}

/** Check if `date` is the end of a range */
export function isRangeEnd(date: Dayjs, range: DateRange): boolean {
  if (!range.end) return false;
  const end = range.start && range.start.isAfter(range.end) ? range.start : range.end;
  return isSameDay(date, end);
}

/** Check if `date` falls within a completed range (inclusive) */
export function isInRange(date: Dayjs, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  return isRangeStart(date, range) || isRangeEnd(date, range) || isBetween(date, range.start, range.end);
}

/** Check if `date` is disabled per the DisabledConfig */
export function isDateDisabled(date: Dayjs, disabled?: DisabledConfig | boolean): boolean {
  if (disabled === true) return true;
  if (!disabled) return false;
  if (disabled.before && date.isBefore(disabled.before, 'day')) return true;
  if (disabled.after && date.isAfter(disabled.after, 'day')) return true;
  if (disabled.dates?.some((d) => isSameDay(date, d))) return true;
  if (disabled.predicate?.(date)) return true;
  return false;
}

/** Generate all day cells for a calendar month view (including padding days) */
export function generateCalendarDays(
  year: number,
  month: number,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
): Dayjs[] {
  const firstOfMonth = dayjs(new Date(year, month, 1));
  const lastOfMonth = firstOfMonth.endOf('month');

  // Pad start
  let startPad = firstOfMonth.day() - weekStartsOn;
  if (startPad < 0) startPad += 7;

  // Pad end to complete the last week
  const totalDays = startPad + lastOfMonth.date();
  const endPad = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

  const days: Dayjs[] = [];
  for (let i = startPad; i > 0; i--) {
    days.push(firstOfMonth.subtract(i, 'day'));
  }
  for (let d = 1; d <= lastOfMonth.date(); d++) {
    days.push(dayjs(new Date(year, month, d)));
  }
  for (let i = 1; i <= endPad; i++) {
    days.push(lastOfMonth.add(i, 'day'));
  }
  return days;
}

/** Build ordered weekday labels starting from `weekStartsOn` */
export function getWeekdayLabels(
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  locale?: string,
): string[] {
  const base = dayjs().locale(locale ?? 'en');
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    labels.push(base.day(dayIndex).format('dd'));
  }
  return labels;
}

/** Short month names for a given locale */
export function getMonthNames(locale?: string): string[] {
  const base = dayjs().locale(locale ?? 'en');
  return Array.from({ length: 12 }, (_, i) =>
    base.month(i).format('MMMM'),
  );
}

/** Range of years around the current year */
export function getYearOptions(spread = 50): number[] {
  const current = dayjs().year();
  const years: number[] = [];
  for (let y = current - spread; y <= current + spread; y++) {
    years.push(y);
  }
  return years;
}

function parseTimeToMinutes(time: string): number | null {
  const [rawHour, rawMinute] = time.split(':');
  const hour = Number(rawHour);
  const minute = Number(rawMinute);
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return hour * 60 + minute;
}

/** Generate time slots in HH:mm format between min and max using step minutes */
export function generateTimeSlots(
  stepMinutes = 15,
  minTime = '00:00',
  maxTime = '23:59',
): string[] {
  const min = parseTimeToMinutes(minTime) ?? 0;
  const max = parseTimeToMinutes(maxTime) ?? (24 * 60 - 1);
  const step = Math.max(1, stepMinutes);
  const start = Math.min(min, max);
  const end = Math.max(min, max);

  const slots: string[] = [];
  for (let value = start; value <= end; value += step) {
    const hour = String(Math.floor(value / 60)).padStart(2, '0');
    const minute = String(value % 60).padStart(2, '0');
    slots.push(`${hour}:${minute}`);
  }
  return slots;
}

/**
 * Generate time slots from a `DateSchedule`.
 *
 * - Returns `[]` when `schedule.unavailable` is `true`.
 * - Concatenates slots from each `TimeRange` in `schedule.ranges`.
 *   Gaps between ranges produce no slots — just omit the time window.
 * - Duplicate boundary values (e.g. `to:'12:00'` followed by `from:'12:00'`)
 *   are deduplicated while preserving order.
 */
export function generateSlotsForSchedule(schedule: DateSchedule): string[] {
  if (schedule.unavailable) return [];
  if (!schedule.ranges?.length) return [];

  const seen = new Set<string>();
  const slots: string[] = [];

  for (const range of schedule.ranges) {
    const rangeSlots = generateTimeSlots(range.step, range.from, range.to);
    for (const slot of rangeSlots) {
      if (!seen.has(slot)) {
        seen.add(slot);
        slots.push(slot);
      }
    }
  }

  return slots;
}

/** Check if a time slot should be disabled for a given date */
export function isTimeDisabled(
  date: Dayjs,
  time: string,
  disabledTime?: DisabledTimeConfig,
): boolean {
  if (!disabledTime) return false;

  const weekday = date.day() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const byWeekday = disabledTime.weekdays?.[weekday];
  if (byWeekday?.includes(time)) return true;

  const dateKey = date.format('YYYY-MM-DD');
  const byDate = disabledTime.dates?.[dateKey];
  if (byDate?.includes(time)) return true;

  if (disabledTime.predicate?.(date, time)) return true;

  return false;
}
