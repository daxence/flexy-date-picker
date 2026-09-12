import { createContext, useContext } from 'react';
import type { Dayjs } from 'dayjs';
import type {
  DateValue,
  DateRange,
  PickerMode,
  DisabledConfig,
  DatePickerClassNames,
  DatePickerStyles,
  TooltipContent,
  DatePickerEvents,
} from '../types';

export interface DatePickerContextValue extends DatePickerEvents {
  // Selection state
  mode: PickerMode;
  singleValue: DateValue;
  rangeValue: DateRange;
  hoveredDate: Dayjs | null;

  // Calendar navigation
  currentYear: number;
  currentMonth: number;
  setCurrentYear: (y: number) => void;
  setCurrentMonth: (m: number) => void;

  // Interactions
  selectDate: (date: Dayjs) => void;
  setHoveredDate: (date: Dayjs | null) => void;

  // Config
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: string;  showMonthYearSelectors?: boolean;  disabled?: DisabledConfig | boolean;
  isDisabled: boolean;
  readOnly: boolean;
  highlightToday: boolean;
  showAdjacentMonthDays: boolean;
  tooltip?: TooltipContent;
  tooltipDelay: number;
  format: string;

  // Styling
  classNames: DatePickerClassNames;
  styles: DatePickerStyles;
}

const DatePickerContext = createContext<DatePickerContextValue | null>(null);

export function useDatePickerContext(): DatePickerContextValue {
  const ctx = useContext(DatePickerContext);
  if (!ctx) {
    throw new Error('useDatePickerContext must be used inside <DatePicker>');
  }
  return ctx;
}

export { DatePickerContext };
