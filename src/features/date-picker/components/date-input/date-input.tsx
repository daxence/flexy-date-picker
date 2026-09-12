import type { CSSProperties, KeyboardEvent } from 'react';
import { cx } from '../../../../shared/utils/cx';
import type { DatePickerClassNames, DatePickerStyles, DateValue, DateRange, PickerMode, RenderInputProps } from '../../types';

interface DateInputProps {
  mode: PickerMode;
  singleValue: DateValue;
  rangeValue: DateRange;
  format: string;
  locale?: string;
  placeholder: string | [string, string];
  isOpen: boolean;
  isDisabled: boolean;
  readOnly: boolean;
  clearable: boolean;
  classNames: DatePickerClassNames;
  styles: DatePickerStyles;
  onOpen: () => void;
  onClear: () => void;
  renderInput?: (props: RenderInputProps) => React.ReactNode;
}

function CalendarIcon() {
  return (
    <svg
      className="fldp-calendar-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DateInput({
  mode,
  singleValue,
  rangeValue,
  format,
  locale,
  placeholder,
  isOpen,
  isDisabled,
  readOnly,
  clearable,
  classNames,
  styles: slotStyles,
  onOpen,
  onClear,
  renderInput,
}: DateInputProps) {
  const hasValue =
    mode === 'single' ? singleValue != null : rangeValue.start != null;

  const formatDate = (value: DateValue) => (value ? value.locale(locale ?? 'en').format(format) : '');

  const singleDisplayValue = formatDate(singleValue);
  const rangeStartValue = formatDate(rangeValue.start);
  const rangeEndValue = formatDate(rangeValue.end);

  const startPlaceholder = Array.isArray(placeholder) ? placeholder[0] : placeholder;
  const endPlaceholder = Array.isArray(placeholder) ? placeholder[1] : placeholder;

  if (renderInput) {
    const displayValue =
      mode === 'single'
        ? singleDisplayValue
        : [rangeStartValue, rangeEndValue].filter(Boolean).join(' → ');
    return (
      <>
        {renderInput({
          value: displayValue,
          onClick: onOpen,
          onClear,
          isOpen,
          placeholder: startPlaceholder,
          isDisabled,
          readOnly,
        })}
      </>
    );
  }

  const wrapperStyle: CSSProperties = slotStyles.inputWrapper ?? {};

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  }

  return (
    <div
      className={cx(
        'fldp-input-wrapper',
        isOpen && 'fldp-input-wrapper--open',
        isDisabled && 'fldp-input-wrapper--disabled',
        classNames.inputWrapper,
      )}
      style={wrapperStyle}
      onClick={onOpen}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <CalendarIcon />

      <span className="fldp-input-content" aria-hidden="true">
        {mode === 'single' ? (
          <span
            className={cx(
              'fldp-input-value',
              !singleDisplayValue && 'fldp-input-value--placeholder',
              classNames.input,
            )}
            style={slotStyles.input}
          >
            {singleDisplayValue || startPlaceholder}
          </span>
        ) : (
          <>
            <span
              className={cx(
                'fldp-input-value',
                !rangeStartValue && 'fldp-input-value--placeholder',
                classNames.input,
              )}
              style={slotStyles.input}
            >
              {rangeStartValue || startPlaceholder}
            </span>
            <span
              className={cx('fldp-separator', classNames.separator)}
              style={slotStyles.separator}
            >
              →
            </span>
            <span
              className={cx(
                'fldp-input-value',
                !rangeEndValue && 'fldp-input-value--placeholder',
                classNames.input,
              )}
              style={slotStyles.input}
            >
              {rangeEndValue || endPlaceholder}
            </span>
          </>
        )}
      </span>

      {clearable && hasValue && !readOnly && (
        <span
          className={cx('fldp-clear-button', classNames.clearButton)}
          style={slotStyles.clearButton}
          role="button"
          tabIndex={0}
          aria-label="Clear date"
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }
          }}
        >
          <ClearIcon />
        </span>
      )}
    </div>
  );
}
