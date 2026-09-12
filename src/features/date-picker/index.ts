export { DatePicker } from './components/date-picker';
export { Calendar } from './components/calendar';
export { CalendarHeader } from './components/calendar-header';
export { CalendarDay } from './components/calendar-day';
export { Tooltip } from './components/tooltip';
export { CalendarLegend } from './components/calendar-legend';

export { DatePickerContext, useDatePickerContext } from './context';

export {
  isSameDay,
  isBetween,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isDateDisabled,
  generateCalendarDays,
  getWeekdayLabels,
  getMonthNames,
  generateTimeSlots,
  isTimeDisabled,
} from './utils';

export type {
  DatePickerProps,
  DateRange,
  DateValue,
  PickerMode,
  DatePickerClassNames,
  DatePickerStyles,
  DatePickerTheme,
  DatePickerEvents,
  DisabledConfig,
  DisabledTimeConfig,
  TimeRange,
  DateSchedule,
  TooltipContent,
  TooltipRenderProps,
  DateSelectionMeta,
  DateSelectionPhase,
  RenderInputProps,
} from './types';

export type { CalendarLegendProps, LegendItem } from './components/calendar-legend';
