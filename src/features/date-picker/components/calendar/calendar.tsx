import dayjs from 'dayjs';
import { useDatePickerContext } from '../../context';
import { CalendarHeader } from '../calendar-header';
import { CalendarDay } from '../calendar-day';
import { cx } from '../../../../shared/utils/cx';
import { generateCalendarDays, getWeekdayLabels } from '../../utils';

interface CalendarProps {
  /** For multi-month views, the offset index (0 = first month shown) */
  panelIndex?: number;
  totalPanels?: number;
}

export function Calendar({ panelIndex = 0, totalPanels = 1 }: CalendarProps) {
  const { currentYear, currentMonth, weekStartsOn, locale, classNames, styles } =
    useDatePickerContext();

  // Offset month for multi-panel display
  const rawMonth = currentMonth + panelIndex;
  const displayYear = currentYear + Math.floor(rawMonth / 12);
  const displayMonth = rawMonth % 12;

  const days = generateCalendarDays(displayYear, displayMonth, weekStartsOn);
  const weekdayLabels = getWeekdayLabels(weekStartsOn, locale);

  return (
    <div
      role="grid"
      aria-label={`${dayjs(new Date(displayYear, displayMonth)).locale(locale ?? 'en').format('MMMM YYYY')}`}
      className={cx('fldp-calendar', classNames.calendar)}
      style={styles.calendar}
    >
      <CalendarHeader panelIndex={panelIndex} totalPanels={totalPanels} />

      <div
        role="row"
        className={cx('fldp-weekdays', classNames.weekdays)}
        style={styles.weekdays}
      >
        {weekdayLabels.map((label) => (
          <div
            key={label}
            role="columnheader"
            aria-label={label}
            className={cx('fldp-weekday', classNames.weekday)}
            style={styles.weekday}
          >
            {label}
          </div>
        ))}
      </div>

      <div
        role="rowgroup"
        className={cx('fldp-days-grid', classNames.daysGrid)}
        style={styles.daysGrid}
      >
        {days.map((date) => {
          const isOutside = date.month() !== displayMonth || date.year() !== displayYear;
          return (
            <CalendarDay
              key={date.format('YYYY-MM-DD')}
              date={date}
              isOutside={isOutside}
            />
          );
        })}
      </div>
    </div>
  );
}
