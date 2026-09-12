import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import { DatePickerContext } from '../../context';
import { createContextValue } from '../../../../test/contextFactory';
import { CalendarDay } from './index';

describe('CalendarDay', () => {
  it('hides outside days when configured', () => {
    const value = createContextValue({ showAdjacentMonthDays: false });
    const { container } = render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-10')} isOutside />
      </DatePickerContext.Provider>,
    );

    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('selects on click and keyboard, and emits hover callbacks', () => {
    const selectDate = vi.fn();
    const setHoveredDate = vi.fn();
    const onDayHover = vi.fn();

    const value = createContextValue({ selectDate, setHoveredDate, onDayHover });
    render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-10')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    const day = screen.getByRole('button', { name: 'June 10, 2025' });
    fireEvent.click(day);
    fireEvent.keyDown(day, { key: 'Enter' });
    fireEvent.keyDown(day, { key: ' ' });
    expect(selectDate).toHaveBeenCalledTimes(3);

    fireEvent.mouseEnter(day);
    fireEvent.mouseLeave(day);
    expect(setHoveredDate).toHaveBeenCalledWith(dayjs('2025-06-10'));
    expect(setHoveredDate).toHaveBeenCalledWith(null);
    expect(onDayHover).toHaveBeenCalledTimes(2);
  });

  it('blocks interaction for disabled or read-only dates', () => {
    const selectDate = vi.fn();
    const value = createContextValue({
      isDisabled: true,
      readOnly: true,
      selectDate,
      disabled: { predicate: () => true },
    });

    render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-10')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    const day = screen.getByRole('button', { name: 'June 10, 2025' });
    fireEvent.click(day);
    expect(selectDate).not.toHaveBeenCalled();
    expect(day).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders custom day content and tooltip', async () => {
    const value = createContextValue({
      tooltip: 'tip',
      tooltipDelay: 0,
      renderDay: (date: Dayjs) => <strong>{date.date()}</strong>,
    } as never);

    render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-10')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    const day = screen.getByRole('button', { name: 'June 10, 2025' });
    expect(screen.getByText('10')).toBeInTheDocument();
    fireEvent.mouseEnter(day);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('tip');
  });

  it('shows outside month days when adjacent days are enabled', () => {
    const value = createContextValue({ showAdjacentMonthDays: true });

    render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-10')} isOutside />
      </DatePickerContext.Provider>,
    );

    const day = screen.getByRole('button', { name: 'June 10, 2025' });
    expect(day).toHaveClass('fldp-day--outside');
    expect(day).not.toHaveAttribute('aria-hidden');
  });

  it('marks range and preview states', () => {
    const value = createContextValue({
      mode: 'range',
      rangeValue: {
        start: dayjs('2025-06-10'),
        end: null,
      },
      hoveredDate: dayjs('2025-06-12'),
      classNames: { dayHovered: 'hovered' },
    });

    const { rerender } = render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-11')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    expect(screen.getByRole('button', { name: 'June 11, 2025' }).className).toContain('hovered');

    rerender(
      <DatePickerContext.Provider
        value={createContextValue({
          mode: 'range',
          rangeValue: { start: dayjs('2025-06-10'), end: dayjs('2025-06-12') },
        })}
      >
        <CalendarDay date={dayjs('2025-06-11')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    expect(screen.getByRole('button', { name: 'June 11, 2025' }).className).toContain('fldp-day--in-range');
  });

  it('ignores non-activation keys and marks same-day range as selected', () => {
    const selectDate = vi.fn();
    const value = createContextValue({
      mode: 'range',
      selectDate,
      rangeValue: { start: dayjs('2025-06-10'), end: dayjs('2025-06-10') },
      classNames: { dayInRange: 'in-range-token', dayHovered: 'hover-token' },
      styles: { dayHovered: { outline: '1px solid red' } },
    });

    render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-10')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    const day = screen.getByRole('button', { name: 'June 10, 2025' });
    fireEvent.keyDown(day, { key: 'Tab' });
    expect(selectDate).not.toHaveBeenCalled();
    expect(day.className).toContain('fldp-day--selected');
  });

  it('includes hovered preview end day in range preview styling', () => {
    const value = createContextValue({
      mode: 'range',
      rangeValue: { start: dayjs('2025-06-10'), end: null },
      hoveredDate: dayjs('2025-06-12'),
      classNames: { dayHovered: 'hovered' },
    });

    render(
      <DatePickerContext.Provider value={value}>
        <CalendarDay date={dayjs('2025-06-12')} isOutside={false} />
      </DatePickerContext.Provider>,
    );

    expect(screen.getByRole('button', { name: 'June 12, 2025' }).className).toContain('hovered');
  });
});
