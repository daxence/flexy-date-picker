import type { Dayjs } from 'dayjs';
import type { KeyboardEvent, ReactNode } from 'react';
import { useDatePickerContext } from '../../context';
import { Tooltip } from '../tooltip';
import { cx } from '../../../../shared/utils/cx';
import {
  isSameDay,
  isDateDisabled,
  isRangeStart,
  isRangeEnd,
  isBetween,
} from '../../utils';
import type { TooltipRenderProps } from '../../types';

interface CalendarDayProps {
  date: Dayjs;
  isOutside: boolean;
}

export function CalendarDay({ date, isOutside }: CalendarDayProps) {
  const {
    mode,
    singleValue,
    rangeValue,
    hoveredDate,
    selectDate,
    setHoveredDate,
    disabled,
    isDisabled,
    readOnly,
    highlightToday,
    showAdjacentMonthDays,
    locale,
    tooltip,
    tooltipDelay,
    classNames,
    styles,
    renderDay,
    onDayHover,
  } = useDatePickerContext() as ReturnType<typeof useDatePickerContext> & {
    renderDay?: (date: Dayjs, props: TooltipRenderProps) => ReactNode;
  };

  const today = date.isToday?.() ?? date.isSame(new Date(), 'day');
  const isDisabledDate = isDisabled || isDateDisabled(date, disabled);
  const isSel =
    mode === 'single'
      ? isSameDay(date, singleValue)
      : (isSameDay(date, rangeValue.start) && isSameDay(date, rangeValue.end));

  const isStart = mode === 'range' ? isRangeStart(date, rangeValue) : false;
  const isEnd = mode === 'range' ? isRangeEnd(date, rangeValue) : false;
  const inRange =
    mode === 'range'
      ? isBetween(date, rangeValue.start, rangeValue.end)
      : false;

  const previewRange =
    mode === 'range' && rangeValue.start && !rangeValue.end && hoveredDate
      ? { start: rangeValue.start, end: hoveredDate }
      : null;

  const inPreview = previewRange
    ? isBetween(date, previewRange.start, previewRange.end) || isSameDay(date, previewRange.end)
    : false;

  const isHoveredPreviewStart = previewRange ? isSameDay(date, previewRange.start) : false;
  const isHoveredPreviewEnd = previewRange ? isSameDay(date, previewRange.end) : false;

  const nightsRangeEnd = mode === 'range' ? (rangeValue.end ?? previewRange?.end ?? null) : null;
  const nights =
    mode === 'range' && rangeValue.start && nightsRangeEnd
      ? nightsRangeEnd.diff(rangeValue.start, 'day') || null
      : null;

  const renderProps: TooltipRenderProps = {
    date,
    isToday: today,
    isSelected: isSel || isStart || isEnd,
    isDisabled: isDisabledDate,
    isRangeStart: isStart,
    isRangeEnd: isEnd,
    isInRange: inRange || inPreview,
    isRangeSelecting: mode === 'range' && !!rangeValue.start && !rangeValue.end,
    isInPreviewRange: inPreview,
    isPreviewRangeEnd: isHoveredPreviewEnd,
    rangeStart: mode === 'range' ? (rangeValue.start ?? null) : null,
    rangeEnd: nightsRangeEnd,
    nights,
  };

  if (isOutside && !showAdjacentMonthDays) {
    return <div className="fldp-day fldp-day--outside" aria-hidden="true" />;
  }

  function handleClick() {
    if (isDisabledDate || readOnly) return;
    selectDate(date);
  }

  function handleMouseEnter() {
    setHoveredDate(date);
    onDayHover?.(date);
  }

  function handleMouseLeave() {
    setHoveredDate(null);
    onDayHover?.(null);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  const dayEl = (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      aria-pressed={isSel || isStart || isEnd}
      aria-disabled={isDisabledDate}
      aria-label={date.locale(locale ?? 'en').format('MMMM D, YYYY')}
      role="button"
      tabIndex={isDisabledDate ? -1 : 0}
      className={cx(
        'fldp-day',
        today && highlightToday && 'fldp-day--today',
        isSel && 'fldp-day--selected',
        isStart && !isEnd && 'fldp-day--range-start',
        isEnd && !isStart && 'fldp-day--range-end',
        isStart && isEnd && 'fldp-day--selected',
        inRange && 'fldp-day--in-range',
        (inPreview || isHoveredPreviewStart) && !inRange && !isStart && !isEnd && 'fldp-day--hovered-range',
        isDisabledDate && 'fldp-day--disabled',
        isOutside && 'fldp-day--outside',
        (inPreview || isHoveredPreviewStart) && classNames.dayHovered,
        classNames.day,
        today && classNames.dayToday,
        isSel && classNames.daySelected,
        isStart && classNames.dayRangeStart,
        isEnd && classNames.dayRangeEnd,
        inRange && classNames.dayInRange,
        isDisabledDate && classNames.dayDisabled,
        isOutside && classNames.dayOutside,
      )}
      style={{
        ...styles.day,
        ...(today && styles.dayToday),
        ...(isSel && styles.daySelected),
        ...(isStart && styles.dayRangeStart),
        ...(isEnd && styles.dayRangeEnd),
        ...(inRange && styles.dayInRange),
        ...(isDisabledDate && styles.dayDisabled),
        ...(isOutside && styles.dayOutside),
        ...((inPreview || isHoveredPreviewStart) && styles.dayHovered),
      }}
    >
      {renderDay ? (
        renderDay(date, renderProps)
      ) : (
        <span className="fldp-day-number">{date.date()}</span>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip
        content={tooltip}
        renderProps={renderProps}
        delay={tooltipDelay}
        classNames={classNames}
        styles={styles}
      >
        {dayEl}
      </Tooltip>
    );
  }

  return dayEl;
}
