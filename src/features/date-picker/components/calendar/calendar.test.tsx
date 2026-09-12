import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DatePickerContext } from '../../context';
import { createContextValue } from '../../../../test/contextFactory';
import { Calendar } from './index';

vi.mock('../calendar-header', () => ({
  CalendarHeader: ({ panelIndex }: { panelIndex?: number }) => <div data-testid={`header-${panelIndex ?? 0}`} />,
}));

vi.mock('../calendar-day', () => ({
  CalendarDay: ({ date, isOutside }: { date: { format: (s: string) => string }; isOutside: boolean }) => (
    <div data-testid="day-cell">{`${date.format('YYYY-MM-DD')}:${String(isOutside)}`}</div>
  ),
}));

describe('Calendar', () => {
  it('renders calendar grid, labels, and day cells', () => {
    const value = createContextValue({ currentYear: 2025, currentMonth: 5, weekStartsOn: 1, locale: 'en' });

    render(
      <DatePickerContext.Provider value={value}>
        <Calendar />
      </DatePickerContext.Provider>,
    );

    expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'June 2025');
    expect(screen.getByTestId('header-0')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(7);
    expect(screen.getAllByTestId('day-cell').length).toBeGreaterThan(27);
  });

  it('supports month panel offset', () => {
    const value = createContextValue({ currentYear: 2025, currentMonth: 11, weekStartsOn: 0, locale: 'en' });

    render(
      <DatePickerContext.Provider value={value}>
        <Calendar panelIndex={1} totalPanels={2} />
      </DatePickerContext.Provider>,
    );

    expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'January 2026');
    expect(screen.getByTestId('header-1')).toBeInTheDocument();
  });
});
