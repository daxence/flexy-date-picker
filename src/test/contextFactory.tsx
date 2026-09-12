import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';
import { DatePickerContext, type DatePickerContextValue } from '../features/date-picker/context';

export function createContextValue(overrides: Partial<DatePickerContextValue> = {}): DatePickerContextValue {
  return {
    mode: 'single',
    singleValue: null,
    rangeValue: { start: null, end: null },
    hoveredDate: null,
    currentYear: 2025,
    currentMonth: 5,
    setCurrentYear: () => undefined,
    setCurrentMonth: () => undefined,
    selectDate: () => undefined,
    setHoveredDate: () => undefined,
    weekStartsOn: 0,
    locale: 'en',
    disabled: undefined,
    isDisabled: false,
    readOnly: false,
    highlightToday: true,
    showAdjacentMonthDays: false,
    tooltip: undefined,
    tooltipDelay: 0,
    format: 'MMM D, YYYY',
    classNames: {},
    styles: {},
    onDateChange: () => undefined,
    onRangeChange: () => undefined,
    onTimeChange: () => undefined,
    onMonthChange: () => undefined,
    onYearChange: () => undefined,
    onDayHover: () => undefined,
    onOpen: () => undefined,
    onClose: () => undefined,
    onClear: () => undefined,
    ...overrides,
  };
}

export function withDatePickerContext(value: DatePickerContextValue, children: ReactNode) {
  return <DatePickerContext.Provider value={value}>{children}</DatePickerContext.Provider>;
}

export function d(input: string): Dayjs {
  return dayjs(input);
}
