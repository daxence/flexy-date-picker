import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './index';

function getTrigger(container: HTMLElement): HTMLElement {
  const trigger = container.querySelector('.fldp-input-wrapper');
  if (!trigger) throw new Error('Missing date input trigger');
  return trigger as HTMLElement;
}

describe('DatePicker', () => {
  it('opens and closes popover in non-inline mode', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();

    const { container } = render(<DatePicker defaultValue={dayjs('2025-06-10')} onOpen={onOpen} onClose={onClose} />);

    fireEvent.click(getTrigger(container));
    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalled();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders inline picker without input trigger', () => {
    render(<DatePicker inline defaultValue={dayjs('2025-06-10')} />);

    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
  });

  it('handles single selection hooks and clear', () => {
    const onBeforeSelect = vi.fn(() => false);
    const onAfterSelect = vi.fn();
    const onDateChange = vi.fn();
    const onClear = vi.fn();

    const { container } = render(
      <DatePicker
        defaultValue={dayjs('2025-06-10')}
        onBeforeSelect={onBeforeSelect}
        onAfterSelect={onAfterSelect}
        onDateChange={onDateChange}
        onClear={onClear}
      />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByRole('button', { name: 'June 11, 2025' }));

    expect(onBeforeSelect).toHaveBeenCalled();
    expect(onAfterSelect).not.toHaveBeenCalled();
    expect(onDateChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Clear date'));
    expect(onDateChange).toHaveBeenCalledWith(null);
    expect(onClear).toHaveBeenCalled();
  });

  it('handles range selection and reorders end before start', () => {
    const onRangeChange = vi.fn();

    const { container } = render(
      <DatePicker
        mode="range"
        defaultRangeValue={{ start: dayjs('2025-06-15'), end: dayjs('2025-06-15') }}
        onRangeChange={onRangeChange}
      />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByRole('button', { name: 'June 20, 2025' }));
    fireEvent.click(screen.getByRole('button', { name: 'June 10, 2025' }));

    const first = onRangeChange.mock.calls[0][0];
    const second = onRangeChange.mock.calls[1][0];
    expect(first.start?.format('YYYY-MM-DD')).toBe('2025-06-20');
    expect(first.end).toBeNull();
    expect(second.start?.format('YYYY-MM-DD')).toBe('2025-06-10');
    expect(second.end?.format('YYYY-MM-DD')).toBe('2025-06-20');
  });

  it('supports time picker slot selection in single mode', () => {
    const onDateChange = vi.fn();
    const onTimeChange = vi.fn();

    const { container } = render(
      <DatePicker
        defaultValue={dayjs('2025-06-10T08:00')}
        enableTime
        timeStep={60}
        minTime="08:00"
        maxTime="10:00"
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
      />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByRole('button', { name: '09:00' }));

    expect(onTimeChange).toHaveBeenCalled();
    expect(onDateChange).toHaveBeenCalled();
    expect(screen.queryByRole('dialog', { name: 'Date picker' })).not.toBeInTheDocument();
  });

  it('supports time picker in range mode and disabled time rules', () => {
    const onRangeChange = vi.fn();
    const onTimeChange = vi.fn();

    render(
      <DatePicker
        mode="range"
        defaultRangeValue={{ start: dayjs('2025-06-10T09:00'), end: dayjs('2025-06-12T09:00') }}
        enableTime
        inline
        timeStep={60}
        minTime="09:00"
        maxTime="11:00"
        disabledTime={{ dates: { '2025-06-12': ['10:00'] } }}
        onRangeChange={onRangeChange}
        onTimeChange={onTimeChange}
      />,
    );

    const disabledSlot = screen.getByRole('button', { name: '10:00' });
    expect(disabledSlot).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(disabledSlot);
    expect(onTimeChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: '11:00' }));
    expect(onRangeChange).toHaveBeenCalled();
    expect(onTimeChange).toHaveBeenCalled();
  });

  it('applies min and max date rules', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs('2025-06-15')}
        minDate={dayjs('2025-06-10')}
        maxDate={dayjs('2025-06-20')}
      />,
    );

    fireEvent.click(getTrigger(container));
    expect(screen.getByRole('button', { name: 'June 9, 2025' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'June 21, 2025' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('combines minDate/maxDate with disabled.before/after, keeping the more restrictive bound', () => {
    const { container, rerender } = render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-15')}
        minDate={dayjs('2025-06-10')}
        maxDate={dayjs('2025-06-20')}
        disabled={{ before: dayjs('2025-06-05'), after: dayjs('2025-06-25') }}
      />,
    );

    // minDate/maxDate are stricter than disabled.before/after, so they win.
    expect(screen.getByRole('button', { name: 'June 9, 2025' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'June 21, 2025' })).toHaveAttribute('aria-disabled', 'true');

    rerender(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-15')}
        minDate={dayjs('2025-06-10')}
        maxDate={dayjs('2025-06-20')}
        disabled={{ before: dayjs('2025-06-12'), after: dayjs('2025-06-18') }}
      />,
    );

    // disabled.before/after are stricter than minDate/maxDate here, so they win instead.
    expect(screen.getByRole('button', { name: 'June 11, 2025' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'June 19, 2025' })).toHaveAttribute('aria-disabled', 'true');
    expect(container).toBeTruthy();
  });

  it('resolves an explicit top/bottom placement asynchronously', async () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs('2025-06-10')} placement="top" />,
    );

    fireEvent.click(getTrigger(container));
    await waitFor(() => {
      expect(document.querySelector('.fldp-popover')).toHaveClass('fldp-popover--top');
    });
  });

  it('measures available space to auto-resolve placement', async () => {
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({
        bottom: 700,
        top: 650,
        left: 0,
        right: 0,
        width: 0,
        height: 50,
        x: 0,
        y: 650,
        toJSON: () => ({}),
      } as DOMRect);
    Object.defineProperty(window, 'innerHeight', { value: 700, configurable: true });

    const { container } = render(
      <DatePicker defaultValue={dayjs('2025-06-10')} />,
    );

    fireEvent.click(getTrigger(container));
    await waitFor(() => {
      expect(document.querySelector('.fldp-popover')).toHaveClass('fldp-popover--top');
    });

    rectSpy.mockRestore();
  });

  it('supports controlled value and ignores open when disabled/readOnly', () => {
    const onDateChange = vi.fn();
    const { container, rerender } = render(
      <DatePicker value={dayjs('2025-06-10')} onDateChange={onDateChange} isDisabled />,
    );

    fireEvent.click(getTrigger(container));
    expect(screen.queryByRole('dialog', { name: 'Date picker' })).not.toBeInTheDocument();

    rerender(<DatePicker value={dayjs('2025-06-10')} onDateChange={onDateChange} readOnly />);
    fireEvent.click(getTrigger(container));
    expect(screen.queryByRole('dialog', { name: 'Date picker' })).not.toBeInTheDocument();
  });

  it('renders multiple months and applies custom theme variables', () => {
    render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-10')}
        numberOfMonths={2}
        theme={{ primary: '#123456', zIndex: '999' }}
      />,
    );

    expect(screen.getAllByRole('grid')).toHaveLength(2);
    expect(screen.queryByText('Select time')).not.toBeInTheDocument();
    const root = screen.getByRole('dialog', { name: 'Date picker' }).parentElement as HTMLElement;
    expect(root.style.getPropertyValue('--fldp-primary')).toBe('#123456');
    expect(root.style.getPropertyValue('--fldp-z-index')).toBe('999');
  });

  it('disables all dates when disabled is true', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs('2025-06-15')}
        disabled
      />,
    );

    fireEvent.click(getTrigger(container));
    expect(screen.getByRole('button', { name: 'June 10, 2025' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('uses date-specific and default time schedules', () => {
    render(
      <DatePicker
        inline
        enableTime
        defaultValue={dayjs('2025-06-10T08:00')}
        timeSchedule={{
          '2025-06-10': {
            ranges: [{ from: '08:00', to: '09:00', step: 30 }],
          },
        }}
        defaultTimeSchedule={{
          ranges: [{ from: '10:00', to: '11:00', step: 60 }],
        }}
      />,
    );

    expect(screen.getByRole('button', { name: '08:30' })).toBeInTheDocument();
  });

  it('falls back to the default time schedule when no date-specific schedule exists', () => {
    render(
      <DatePicker
        inline
        enableTime
        defaultValue={dayjs('2025-06-11T10:00')}
        defaultTimeSchedule={{
          ranges: [{ from: '10:00', to: '11:00', step: 60 }],
        }}
      />,
    );

    expect(screen.getByRole('button', { name: '11:00' })).toBeInTheDocument();
  });

  it('updates the start time in range mode when the end is not set', () => {
    const onRangeChange = vi.fn();
    const onTimeChange = vi.fn();

    render(
      <DatePicker
        mode="range"
        inline
        enableTime
        defaultRangeValue={{ start: dayjs('2025-06-10T09:00'), end: null }}
        timeStep={60}
        minTime="09:00"
        maxTime="11:00"
        onRangeChange={onRangeChange}
        onTimeChange={onTimeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '10:00' }));

    const nextRange = onRangeChange.mock.calls[0][0];
    expect(nextRange.start?.format('HH:mm')).toBe('10:00');
    expect(nextRange.end).toBeNull();
    expect(onTimeChange).toHaveBeenCalledWith(expect.anything(), '10:00');
  });

  it('shows outside days when the legacy prop is enabled', () => {
    render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-07-10')}
        showOutsideDays
      />,
    );

    expect(screen.getByRole('button', { name: 'June 30, 2025' })).toBeInTheDocument();
  });

  it('keeps time parts when selecting dates in time-enabled modes', () => {
    const onDateChange = vi.fn();
    const onRangeChange = vi.fn();

    const { container, unmount } = render(
      <DatePicker
        enableTime
        defaultValue={dayjs('2025-06-10T08:45')}
        onDateChange={onDateChange}
      />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByRole('button', { name: 'June 11, 2025' }));
    expect(onDateChange).toHaveBeenCalled();
    expect(onDateChange.mock.calls[0][0].format('HH:mm')).toBe('08:45');

    unmount();

    render(
      <DatePicker
        mode="range"
        inline
        enableTime
        defaultRangeValue={{ start: dayjs('2025-06-10T07:30'), end: dayjs('2025-06-12T09:15') }}
        onRangeChange={onRangeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'June 20, 2025' }));
    fireEvent.click(screen.getByRole('button', { name: 'June 22, 2025' }));

    const firstRange = onRangeChange.mock.calls[0][0];
    const secondRange = onRangeChange.mock.calls[1][0];
    expect(firstRange.start?.format('HH:mm')).toBe('07:30');
    expect(secondRange.end?.format('HH:mm')).toBe('00:00');
  });

  it('handles clear in range mode and supports controlled range fallback', () => {
    const onRangeChange = vi.fn();
    const { container } = render(
      <DatePicker
        mode="range"
        defaultRangeValue={{ start: dayjs('2025-06-10'), end: dayjs('2025-06-12') }}
        onRangeChange={onRangeChange}
      />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByLabelText('Clear date'));
    expect(onRangeChange).toHaveBeenCalledWith({ start: null, end: null });

    render(
      <DatePicker
        mode="range"
        inline
        rangeValue={null as never}
        onRangeChange={onRangeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'June 10, 2025' }));
    expect(onRangeChange).toHaveBeenCalled();
  });

  it('does not open when inline and ignores time selection when readOnly', () => {
    const onOpen = vi.fn();
    const onTimeChange = vi.fn();

    const { container } = render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-10')}
        onOpen={onOpen}
      />,
    );

    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
    expect(container.querySelector('.fldp-input-wrapper')).toBeNull();
    expect(onOpen).not.toHaveBeenCalled();

    render(
      <DatePicker
        mode="range"
        inline
        readOnly
        enableTime
        defaultRangeValue={{ start: dayjs('2025-06-10T09:00'), end: null }}
        timeStep={60}
        minTime="09:00"
        maxTime="10:00"
        onTimeChange={onTimeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '10:00' }));
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  it('closes after selecting end time in non-inline range mode', () => {
    const { container } = render(
      <DatePicker
        mode="range"
        enableTime
        defaultRangeValue={{ start: dayjs('2025-06-10T09:00'), end: dayjs('2025-06-12T09:00') }}
        timeStep={60}
        minTime="09:00"
        maxTime="10:00"
      />,
    );

    fireEvent.click(getTrigger(container));
    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '10:00' }));
    expect(screen.queryByRole('dialog', { name: 'Date picker' })).not.toBeInTheDocument();
  });

  it('closes on outside click and updates month/year through calendar navigation', () => {
    const onClose = vi.fn();
    const onMonthChange = vi.fn();
    const onYearChange = vi.fn();
    const { container, rerender } = render(
      <DatePicker
        defaultValue={dayjs('2025-06-10')}
        onClose={onClose}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />,
    );

    fireEvent.click(getTrigger(container));
    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();

    rerender(
      <DatePicker
        defaultValue={dayjs('2025-01-10')}
        onClose={onClose}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByLabelText('Previous month'));
    expect(onMonthChange).toHaveBeenCalled();
    expect(onYearChange).toHaveBeenCalled();
  });

  it('treats an explicit null controlled value as empty', () => {
    const { container } = render(<DatePicker value={null} />);

    fireEvent.click(getTrigger(container));
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
    expect(container.querySelector('.fldp-input-value--placeholder')).toBeInTheDocument();
  });

  it('applies disabled.before/after without minDate/maxDate set', () => {
    const { container } = render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-15')}
        disabled={{ before: dayjs('2025-06-10'), after: dayjs('2025-06-20') }}
      />,
    );

    expect(screen.getByRole('button', { name: 'June 9, 2025' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'June 21, 2025' })).toHaveAttribute('aria-disabled', 'true');
    expect(container).toBeTruthy();
  });

  it('resolves an explicit bottom placement', async () => {
    const { container, rerender } = render(
      <DatePicker defaultValue={dayjs('2025-06-10')} placement="top" />,
    );

    fireEvent.click(getTrigger(container));
    await waitFor(() => {
      expect(document.querySelector('.fldp-popover')).toHaveClass('fldp-popover--top');
    });

    rerender(<DatePicker defaultValue={dayjs('2025-06-10')} placement="bottom" />);
    await waitFor(() => {
      expect(document.querySelector('.fldp-popover')).toHaveClass('fldp-popover--bottom');
    });
  });

  it('auto-resolves to bottom when there is more room below than above', async () => {
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue({
        bottom: 700,
        top: 650,
        left: 0,
        right: 0,
        width: 0,
        height: 50,
        x: 0,
        y: 650,
        toJSON: () => ({}),
      } as DOMRect);
    Object.defineProperty(window, 'innerHeight', { value: 700, configurable: true });

    const { container } = render(<DatePicker defaultValue={dayjs('2025-06-10')} />);

    fireEvent.click(getTrigger(container));
    await waitFor(() => {
      expect(document.querySelector('.fldp-popover')).toHaveClass('fldp-popover--top');
    });

    rectSpy.mockReturnValue({
      bottom: 100,
      top: 50,
      left: 0,
      right: 0,
      width: 0,
      height: 50,
      x: 0,
      y: 50,
      toJSON: () => ({}),
    } as DOMRect);
    fireEvent.resize(window);
    await waitFor(() => {
      expect(document.querySelector('.fldp-popover')).toHaveClass('fldp-popover--bottom');
    });

    rectSpy.mockRestore();
  });

  it('toggles the popover closed when the trigger is clicked again', () => {
    const { container } = render(<DatePicker defaultValue={dayjs('2025-06-10')} />);

    fireEvent.click(getTrigger(container));
    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();

    fireEvent.click(getTrigger(container));
    expect(screen.queryByRole('dialog', { name: 'Date picker' })).not.toBeInTheDocument();
  });

  it('keeps an inline picker open after selecting a date', () => {
    const onClose = vi.fn();

    render(<DatePicker inline defaultValue={dayjs('2025-06-10')} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'June 11, 2025' }));

    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close the popover after selecting a date while time is enabled', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs('2025-06-10T09:00')} enableTime timeStep={60} />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByRole('button', { name: 'June 11, 2025' }));

    expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeInTheDocument();
  });

  it('ignores time slot selection while read-only', () => {
    const onTimeChange = vi.fn();

    render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-10T09:00')}
        enableTime
        timeStep={60}
        readOnly
        onTimeChange={onTimeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '09:00' }));
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  it('ignores time slot selection while the whole picker is disabled', () => {
    const onTimeChange = vi.fn();

    render(
      <DatePicker
        inline
        defaultValue={dayjs('2025-06-10T09:00')}
        enableTime
        timeStep={60}
        isDisabled
        onTimeChange={onTimeChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '09:00' }));
    expect(onTimeChange).not.toHaveBeenCalled();
  });

  it('invokes onAfterSelect once a selection is committed', () => {
    const onAfterSelect = vi.fn();

    const { container } = render(
      <DatePicker defaultValue={dayjs('2025-06-10')} onAfterSelect={onAfterSelect} />,
    );

    fireEvent.click(getTrigger(container));
    fireEvent.click(screen.getByRole('button', { name: 'June 11, 2025' }));

    expect(onAfterSelect).toHaveBeenCalledWith(
      expect.objectContaining({ format: expect.any(Function) }),
      expect.objectContaining({ mode: 'single' }),
    );
  });
});
