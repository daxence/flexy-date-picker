import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import { TimePicker } from './index';

describe('TimePicker', () => {
  it('opens, selects a time, and closes in uncontrolled mode', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const onChange = vi.fn();

    const { container } = render(
      <TimePicker
        defaultValue="08:00"
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}
        timeStep={60}
        minTime="08:00"
        maxTime="10:00"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '08:00' }));
    expect(onOpen).toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: 'Time picker' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '09:00' }));
    expect(onChange).toHaveBeenCalledWith('09:00');
    expect(onClose).toHaveBeenCalled();
    expect(screen.queryByRole('dialog', { name: 'Time picker' })).not.toBeInTheDocument();
    expect(container.querySelector('.fldp-input-value')).toHaveTextContent('09:00');
  });

  it('renders inline mode and respects disabled rules', () => {
    const onChange = vi.fn();

    render(
      <TimePicker
        inline
        defaultValue="09:00"
        onChange={onChange}
        timeStep={60}
        minTime="09:00"
        maxTime="11:00"
        disabledTime={{ weekdays: { 2: ['10:00'] } }}
      />,
    );

    expect(screen.getByRole('region', { name: 'Time picker' })).toBeInTheDocument();
    expect(document.querySelector('.fldp-input-wrapper')).toBeNull();

    const disabledSlot = screen.getByRole('button', { name: '10:00' });
    expect(disabledSlot).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(disabledSlot);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports clearing the selected time in controlled mode', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();

    const { rerender } = render(
      <TimePicker value="09:00" onChange={onChange} onClear={onClear} />,
    );

    const trigger = screen.getByRole('button', { name: '09:00' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByLabelText('Clear time'));

    expect(onChange).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalled();

    rerender(<TimePicker value="" onChange={onChange} onClear={onClear} />);
    expect(screen.getByRole('button', { name: 'Select time' })).toBeInTheDocument();
  });

  it('uses schedule-based slots when provided', () => {
    render(
      <TimePicker
        inline
        schedule={{
          ranges: [
            { from: '08:00', to: '08:30', step: 30 },
            { from: '09:00', to: '09:30', step: 30 },
          ],
        }}
      />,
    );

    expect(screen.getByRole('button', { name: '08:00' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '09:30' })).toBeInTheDocument();
  });

  it('opens with keyboard and closes on escape and outside click', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();

    render(
      <TimePicker
        defaultValue="08:00"
        onOpen={onOpen}
        onClose={onClose}
        timeStep={60}
        minTime="08:00"
        maxTime="10:00"
      />,
    );

    const trigger = screen.getByRole('button', { name: '08:00' });
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(onOpen).toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: 'Time picker' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(trigger);
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('formats disabled selected times', () => {
    render(
      <TimePicker
        value="10:00"
        date={dayjs('2025-06-10')}
        disabledTime={{ weekdays: { 2: ['10:00'] } }}
      />,
    );

    expect(screen.getByRole('button', { name: '10:00' })).toBeInTheDocument();
  });

  it('does not open when disabled, readOnly, or inline and ignores non-activation keys', () => {
    const onOpen = vi.fn();

    const { rerender } = render(
      <TimePicker value="09:00" onOpen={onOpen} isDisabled />,
    );

    const trigger = screen.getByRole('button', { name: '09:00' });
    fireEvent.click(trigger);
    expect(screen.queryByRole('dialog', { name: 'Time picker' })).not.toBeInTheDocument();

    rerender(<TimePicker value="09:00" onOpen={onOpen} readOnly />);
    fireEvent.click(screen.getByRole('button', { name: '09:00' }));
    expect(screen.queryByRole('dialog', { name: 'Time picker' })).not.toBeInTheDocument();

    rerender(<TimePicker value="09:00" onOpen={onOpen} />);
    fireEvent.keyDown(screen.getByRole('button', { name: '09:00' }), { key: 'Tab' });
    expect(screen.queryByRole('dialog', { name: 'Time picker' })).not.toBeInTheDocument();

    rerender(<TimePicker inline value="09:00" onOpen={onOpen} />);
    expect(screen.getByRole('region', { name: 'Time picker' })).toBeInTheDocument();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('clears internal value in uncontrolled mode', () => {
    const onChange = vi.fn();

    render(
      <TimePicker defaultValue="09:00" onChange={onChange} onClear={() => undefined} />,
    );

    fireEvent.click(screen.getByRole('button', { name: '09:00' }));
    fireEvent.click(screen.getByLabelText('Clear time'));

    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByRole('button', { name: 'Select time' })).toBeInTheDocument();
  });

  it('toggles the popover closed when clicking an already-open trigger', () => {
    const onClose = vi.fn();

    render(<TimePicker defaultValue="09:00" onClose={onClose} />);

    const trigger = screen.getByRole('button', { name: '09:00' });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Time picker' })).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(onClose).toHaveBeenCalled();
    expect(screen.queryByRole('dialog', { name: 'Time picker' })).not.toBeInTheDocument();
  });
});