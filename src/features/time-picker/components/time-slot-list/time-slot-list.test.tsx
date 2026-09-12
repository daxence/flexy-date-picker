import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import { TimeSlotList } from './index';

describe('TimeSlotList', () => {
  it('renders empty state when no slots are available', () => {
    render(
      <TimeSlotList
        timeSlots={[]}
        selectedTime=""
        onSelectTime={() => undefined}
        timeFormat="HH:mm"
        targetDate={dayjs('2025-06-10')}
        isDisabled={false}
        readOnly={false}
      />,
    );

    expect(screen.getByText('No availability')).toBeInTheDocument();
  });

  it('selects enabled slots and blocks disabled ones', () => {
    const onSelectTime = vi.fn();

    render(
      <TimeSlotList
        timeSlots={['09:00', '10:00', '11:00']}
        selectedTime="10:00"
        onSelectTime={onSelectTime}
        timeFormat="HH:mm"
        targetDate={dayjs('2025-06-10')}
        disabledTime={{ weekdays: { 2: ['10:00'] } }}
        isDisabled={false}
        readOnly={false}
      />,
    );

    const enabledSlot = screen.getByRole('button', { name: '11:00' });
    fireEvent.click(enabledSlot);
    fireEvent.keyDown(enabledSlot, { key: 'Enter' });
    fireEvent.keyDown(enabledSlot, { key: ' ' });
    expect(onSelectTime).toHaveBeenCalledTimes(3);

    const disabledSlot = screen.getByRole('button', { name: '10:00' });
    expect(disabledSlot).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(disabledSlot);
    fireEvent.keyDown(disabledSlot, { key: 'Enter' });
    expect(onSelectTime).toHaveBeenCalledTimes(3);
  });

  it('marks all slots disabled when the picker is disabled or readOnly', () => {
    render(
      <TimeSlotList
        timeSlots={['09:00']}
        selectedTime="09:00"
        onSelectTime={() => undefined}
        timeFormat="HH:mm"
        targetDate={dayjs('2025-06-10')}
        isDisabled
        readOnly
      />,
    );

    const slot = screen.getByRole('button', { name: '09:00' });
    expect(slot).toHaveAttribute('aria-disabled', 'true');
    expect(slot).toHaveAttribute('tabIndex', '-1');
  });
});