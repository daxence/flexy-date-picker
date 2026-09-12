import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { cx } from '../../../../shared/utils/cx';
import { isTimeDisabled } from '../../../date-picker/utils';
import type {
  DatePickerClassNames,
  DatePickerStyles,
  DisabledTimeConfig,
} from '../../../date-picker/types';

export interface TimeSlotListProps {
  timeSlots: string[];
  selectedTime: string;
  onSelectTime: (slot: string) => void;
  timeFormat: string;
  locale?: string;
  targetDate: Dayjs;
  disabledTime?: DisabledTimeConfig;
  isDisabled: boolean;
  readOnly: boolean;
  classNames?: Partial<DatePickerClassNames>;
  styles?: Partial<DatePickerStyles>;
}

export function TimeSlotList({
  timeSlots,
  selectedTime,
  onSelectTime,
  timeFormat,
  locale,
  targetDate,
  disabledTime,
  isDisabled,
  readOnly,
  classNames = {},
  styles = {},
}: TimeSlotListProps) {
  return (
    <div
      className={cx('fldp-time-picker', classNames.timePicker)}
      style={styles.timePicker}
    >
      <div
        className={cx('fldp-time-title', classNames.timeTitle)}
        style={styles.timeTitle}
      >
        Time
      </div>

      <div
        className={cx('fldp-time-slot-list', classNames.timeSlotList)}
        style={styles.timeSlotList}
      >
        {timeSlots.length === 0 && (
          <span className="fldp-time-empty">No availability</span>
        )}
        {timeSlots.map((slot) => {
          const isSelected = slot === selectedTime;
          const disabledByRule = isTimeDisabled(targetDate, slot, disabledTime);
          const slotLabel = dayjs(`2000-01-01T${slot}`)
            .locale(locale ?? 'en')
            .format(timeFormat);

          return (
            <span
              key={slot}
              role="button"
              tabIndex={disabledByRule || isDisabled || readOnly ? -1 : 0}
              aria-disabled={disabledByRule || isDisabled || readOnly}
              className={cx(
                'fldp-time-slot',
                isSelected && 'fldp-time-slot--selected',
                disabledByRule && 'fldp-time-slot--disabled',
                classNames.timeSlot,
                isSelected && classNames.timeSlotSelected,
                disabledByRule && classNames.timeSlotDisabled,
              )}
              style={{
                ...styles.timeSlot,
                ...(isSelected && styles.timeSlotSelected),
                ...(disabledByRule && styles.timeSlotDisabled),
              }}
              onClick={() => {
                if (!disabledByRule && !isDisabled && !readOnly) {
                  onSelectTime(slot);
                }
              }}
              onKeyDown={(e) => {
                if (
                  (e.key === 'Enter' || e.key === ' ') &&
                  !disabledByRule &&
                  !isDisabled &&
                  !readOnly
                ) {
                  e.preventDefault();
                  onSelectTime(slot);
                }
              }}
            >
              {slotLabel}
            </span>
          );
        })}
      </div>
    </div>
  );
}
