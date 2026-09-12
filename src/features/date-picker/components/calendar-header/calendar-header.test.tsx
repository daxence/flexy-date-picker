import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CalendarHeader } from './index';
import { createContextValue, withDatePickerContext } from '../../../../test/contextFactory';

describe('CalendarHeader', () => {
  it('moves to previous and next month', () => {
    const setMonth = vi.fn();
    const setYear = vi.fn();
    const onMonthChange = vi.fn();

    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 0,
      setCurrentMonth: setMonth,
      setCurrentYear: setYear,
      onMonthChange,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    fireEvent.click(screen.getByLabelText('Previous month'));
    fireEvent.keyDown(screen.getByLabelText('Next month'), { key: 'Enter' });

    expect(setMonth).toHaveBeenCalled();
    expect(setYear).toHaveBeenCalled();
    expect(onMonthChange).toHaveBeenCalled();
  });

  it('opens month menu and selects a month', () => {
    const setMonth = vi.fn();
    const setYear = vi.fn();
    const onMonthChange = vi.fn();

    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
      setCurrentMonth: setMonth,
      setCurrentYear: setYear,
      onMonthChange,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    fireEvent.click(screen.getByRole('button', { name: /june/i }));
    fireEvent.click(screen.getByRole('option', { name: /january/i }));

    expect(setMonth).toHaveBeenCalled();
    expect(setYear).toHaveBeenCalled();
    expect(onMonthChange).toHaveBeenCalledWith(0, 2025);
  });

  it('opens year menu, selects year, and closes on outside click', () => {
    const onYearChange = vi.fn();
    const setMonth = vi.fn();
    const setYear = vi.fn();

    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
      setCurrentMonth: setMonth,
      setCurrentYear: setYear,
      onYearChange,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    fireEvent.click(screen.getByRole('button', { name: '2025' }));
    fireEvent.keyDown(screen.getByRole('option', { name: '2025' }), { key: 'Enter' });
    expect(onYearChange).toHaveBeenCalledWith(2025);

    fireEvent.click(screen.getByRole('button', { name: '2025' }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox', { name: 'Select year' })).not.toBeInTheDocument();
  });

  it('supports custom nav renderer and hides side controls on middle panels', () => {
    const renderNavButton = vi.fn((direction: 'prev' | 'next', onClick: () => void) => (
      <button type="button" onClick={onClick}>{direction}</button>
    ));

    const value = createContextValue({ renderNavButton } as never);
    const { rerender } = render(withDatePickerContext(value, <CalendarHeader panelIndex={0} totalPanels={2} />));
    expect(renderNavButton).toHaveBeenCalledWith('prev', expect.any(Function));
    expect(screen.queryByRole('button', { name: 'next' })).not.toBeInTheDocument();

    rerender(withDatePickerContext(value, <CalendarHeader panelIndex={1} totalPanels={2} />));
    expect(renderNavButton).toHaveBeenCalledWith('next', expect.any(Function));
    expect(screen.queryByRole('button', { name: 'prev' })).not.toBeInTheDocument();
  });

  it('ignores non-activation keys and renders middle panels without side controls', () => {
    const setMonth = vi.fn();
    const setYear = vi.fn();

    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
      setCurrentMonth: setMonth,
      setCurrentYear: setYear,
    });

    render(withDatePickerContext(value, <CalendarHeader panelIndex={1} totalPanels={3} />));

    expect(screen.queryByLabelText('Previous month')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next month')).not.toBeInTheDocument();

    const monthButton = screen.getByRole('button', { name: /july/i });
    fireEvent.keyDown(monthButton, { key: 'Tab' });
    expect(screen.queryByRole('listbox', { name: 'Select month' })).not.toBeInTheDocument();

    fireEvent.keyDown(monthButton, { key: ' ' });
    expect(screen.getByRole('listbox', { name: 'Select month' })).toBeInTheDocument();
  });

  it('keeps menu open for inside clicks and toggles month/year triggers', () => {
    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    const monthButton = screen.getByRole('button', { name: /june/i });
    fireEvent.click(monthButton);
    expect(screen.getByRole('listbox', { name: 'Select month' })).toBeInTheDocument();

    fireEvent.mouseDown(monthButton);
    expect(screen.getByRole('listbox', { name: 'Select month' })).toBeInTheDocument();

    fireEvent.click(monthButton);
    expect(screen.queryByRole('listbox', { name: 'Select month' })).not.toBeInTheDocument();

    const yearButton = screen.getByRole('button', { name: '2025' });
    fireEvent.click(yearButton);
    expect(screen.getByRole('listbox', { name: 'Select year' })).toBeInTheDocument();
    fireEvent.click(yearButton);
    expect(screen.queryByRole('listbox', { name: 'Select year' })).not.toBeInTheDocument();
  });

  it('supports keyboard selection for nav and option menus', () => {
    const setMonth = vi.fn();
    const setYear = vi.fn();
    const onYearChange = vi.fn();
    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
      setCurrentMonth: setMonth,
      setCurrentYear: setYear,
      onYearChange,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    fireEvent.keyDown(screen.getByLabelText('Previous month'), { key: ' ' });
    fireEvent.keyDown(screen.getByLabelText('Next month'), { key: ' ' });

    fireEvent.keyDown(screen.getByRole('button', { name: /june/i }), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('option', { name: /january/i }), { key: ' ' });

    fireEvent.keyDown(screen.getByRole('button', { name: '2025' }), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('option', { name: '2025' }), { key: ' ' });

    expect(setMonth).toHaveBeenCalled();
    expect(setYear).toHaveBeenCalled();
    expect(onYearChange).toHaveBeenCalled();
  });

  it('renders a compact label instead of selectors when showMonthYearSelectors is false', () => {
    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
      showMonthYearSelectors: false,
    } as never);

    render(withDatePickerContext(value, <CalendarHeader />));

    expect(screen.getByText('JUNE 2025')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /june/i })).not.toBeInTheDocument();
  });

  it('selects a year by clicking an option', () => {
    const setYear = vi.fn();
    const onYearChange = vi.fn();

    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
      setCurrentYear: setYear,
      onYearChange,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    fireEvent.click(screen.getByRole('button', { name: '2025' }));
    fireEvent.click(screen.getByRole('option', { name: '2026' }));

    expect(setYear).toHaveBeenCalledWith(2026);
    expect(onYearChange).toHaveBeenCalledWith(2026);
  });

  it('closes the month and year menus via keyboard toggle', () => {
    const value = createContextValue({
      currentYear: 2025,
      currentMonth: 5,
    });

    render(withDatePickerContext(value, <CalendarHeader />));

    const monthButton = screen.getByRole('button', { name: /june/i });
    fireEvent.keyDown(monthButton, { key: 'Enter' });
    expect(screen.getByRole('listbox', { name: 'Select month' })).toBeInTheDocument();
    fireEvent.keyDown(monthButton, { key: 'Enter' });
    expect(screen.queryByRole('listbox', { name: 'Select month' })).not.toBeInTheDocument();

    const yearButton = screen.getByRole('button', { name: '2025' });
    fireEvent.keyDown(yearButton, { key: ' ' });
    expect(screen.getByRole('listbox', { name: 'Select year' })).toBeInTheDocument();
    fireEvent.keyDown(yearButton, { key: ' ' });
    expect(screen.queryByRole('listbox', { name: 'Select year' })).not.toBeInTheDocument();
  });
});
