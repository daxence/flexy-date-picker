import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import {
  generateSlotsForSchedule,
  generateCalendarDays,
  generateTimeSlots,
  getMonthNames,
  getWeekdayLabels,
  getYearOptions,
  isBetween,
  isDateDisabled,
  isInRange,
  isRangeEnd,
  isRangeStart,
  isSameDay,
  isTimeDisabled,
} from './date-utils';

describe('dateUtils', () => {
  it('handles same-day checks and null inputs', () => {
    expect(isSameDay(dayjs('2025-06-10'), dayjs('2025-06-10'))).toBe(true);
    expect(isSameDay(dayjs('2025-06-10'), dayjs('2025-06-11'))).toBe(false);
    expect(isSameDay(null, dayjs('2025-06-10'))).toBe(false);
    expect(isSameDay(dayjs('2025-06-10'), null)).toBe(false);
  });

  it('checks between and range edges with swapped bounds', () => {
    const start = dayjs('2025-06-10');
    const end = dayjs('2025-06-20');
    expect(isBetween(dayjs('2025-06-15'), start, end)).toBe(true);
    expect(isBetween(dayjs('2025-06-15'), end, start)).toBe(true);
    expect(isBetween(dayjs('2025-06-10'), start, end)).toBe(false);
    expect(isBetween(dayjs('2025-06-20'), start, end)).toBe(false);
    expect(isBetween(dayjs('2025-06-15'), null, end)).toBe(false);
  });

  it('detects range start/end/in-range even when user picked reverse order', () => {
    const range = { start: dayjs('2025-06-20'), end: dayjs('2025-06-10') };
    expect(isRangeStart(dayjs('2025-06-10'), range)).toBe(true);
    expect(isRangeStart(dayjs('2025-06-20'), range)).toBe(false);
    expect(isRangeEnd(dayjs('2025-06-20'), range)).toBe(true);
    expect(isRangeEnd(dayjs('2025-06-10'), range)).toBe(false);
    expect(isInRange(dayjs('2025-06-15'), range)).toBe(true);
    expect(isInRange(dayjs('2025-06-10'), range)).toBe(true);
    expect(isInRange(dayjs('2025-06-20'), range)).toBe(true);
  });

  it('returns false for incomplete ranges', () => {
    expect(isRangeStart(dayjs('2025-06-10'), { start: null, end: dayjs('2025-06-20') })).toBe(false);
    expect(isRangeEnd(dayjs('2025-06-20'), { start: dayjs('2025-06-10'), end: null })).toBe(false);
    expect(isInRange(dayjs('2025-06-15'), { start: dayjs('2025-06-10'), end: null })).toBe(false);
  });

  it('applies date disabled rules', () => {
    const target = dayjs('2025-06-10');
    expect(isDateDisabled(target, true)).toBe(true);
    expect(isDateDisabled(target, undefined)).toBe(false);
    expect(isDateDisabled(target, { before: dayjs('2025-06-11') })).toBe(true);
    expect(isDateDisabled(target, { after: dayjs('2025-06-09') })).toBe(true);
    expect(isDateDisabled(target, { dates: [dayjs('2025-06-10')] })).toBe(true);
    expect(isDateDisabled(target, { predicate: (d) => d.date() === 10 })).toBe(true);
    expect(isDateDisabled(target, { before: dayjs('2025-06-01'), after: dayjs('2025-06-30') })).toBe(false);
  });

  it('generates month grid with start and end padding', () => {
    const days = generateCalendarDays(2025, 5, 1);
    expect(days.length % 7).toBe(0);
    expect(days[0].isBefore(dayjs('2025-06-01'), 'day')).toBe(true);
    expect(days[days.length - 1].isAfter(dayjs('2025-06-30'), 'day')).toBe(true);
  });

  it('builds localized weekday labels and month names', () => {
    const weekdayLabels = getWeekdayLabels(0, 'en');
    expect(weekdayLabels).toHaveLength(7);
    expect(weekdayLabels[0]).toMatch(/Su|Mo|Tu|We|Th|Fr|Sa/);

    const monthNames = getMonthNames('en');
    expect(monthNames).toHaveLength(12);
    expect(monthNames[0]).toBe('January');
  });

  it('returns a centered year list', () => {
    const years = getYearOptions(1);
    const now = dayjs().year();
    expect(years).toEqual([now - 1, now, now + 1]);
  });

  it('generates time slots with parsing safeguards and swapped bounds', () => {
    expect(generateTimeSlots(15, '00:00', '00:30')).toEqual(['00:00', '00:15', '00:30']);
    expect(generateTimeSlots(0, '00:10', '00:12')).toEqual(['00:10', '00:11', '00:12']);
    expect(generateTimeSlots(30, '10:00', '09:00')).toEqual(['09:00', '09:30', '10:00']);
    expect(generateTimeSlots(60, 'x', '01:00')).toEqual(['00:00', '01:00']);
    expect(generateTimeSlots(60, '24:00', '01:00')).toEqual(['00:00', '01:00']);
    expect(generateTimeSlots(60, '00:00', '12:99')).toContain('23:00');
    expect(generateTimeSlots(60, '00:00', 'y')).toContain('23:00');
  });

  it('generates scheduled slots and respects unavailable schedules', () => {
    expect(generateSlotsForSchedule({ unavailable: true })).toEqual([]);
    expect(generateSlotsForSchedule({ ranges: [] })).toEqual([]);
    expect(
      generateSlotsForSchedule({
        ranges: [
          { from: '08:00', to: '09:00', step: 30 },
          { from: '09:00', to: '10:00', step: 30 },
        ],
      }),
    ).toEqual(['08:00', '08:30', '09:00', '09:30', '10:00']);
  });

  it('applies disabled time rules by weekday/date/predicate', () => {
    const date = dayjs('2025-06-10');
    expect(isTimeDisabled(date, '10:00', undefined)).toBe(false);
    expect(isTimeDisabled(date, '10:00', { weekdays: { 2: ['10:00'] } })).toBe(true);
    expect(isTimeDisabled(date, '11:00', { dates: { '2025-06-10': ['11:00'] } })).toBe(true);
    const predicate = vi.fn(() => true);
    expect(isTimeDisabled(date, '12:00', { predicate })).toBe(true);
    expect(predicate).toHaveBeenCalledWith(date, '12:00');
    expect(isTimeDisabled(date, '13:00', { weekdays: { 1: ['13:00'] } })).toBe(false);
  });
});
