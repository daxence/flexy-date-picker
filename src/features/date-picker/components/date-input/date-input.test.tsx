import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import { DateInput } from './index';

describe('DateInput', () => {
  it('renders single mode and opens on click or keyboard', () => {
    const onOpen = vi.fn();
    render(
      <DateInput
        mode="single"
        singleValue={null}
        rangeValue={{ start: null, end: null }}
        format="MMM D, YYYY"
        placeholder="Pick a date"
        isOpen={false}
        isDisabled={false}
        readOnly={false}
        clearable
        classNames={{}}
        styles={{}}
        onOpen={onOpen}
        onClear={() => undefined}
      />,
    );

    const trigger = screen.getByRole('button', { name: '' });
    expect(screen.getByText('Pick a date')).toBeInTheDocument();

    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Enter' });
    fireEvent.keyDown(trigger, { key: ' ' });

    expect(onOpen).toHaveBeenCalledTimes(3);
  });

  it('renders range mode with values and clear action', () => {
    const onClear = vi.fn();
    render(
      <DateInput
        mode="range"
        singleValue={null}
        rangeValue={{ start: dayjs('2025-06-10'), end: dayjs('2025-06-20') }}
        format="YYYY-MM-DD"
        placeholder={['Start', 'End']}
        isOpen
        isDisabled={false}
        readOnly={false}
        clearable
        classNames={{}}
        styles={{}}
        onOpen={() => undefined}
        onClear={onClear}
      />,
    );

    expect(screen.getByText('2025-06-10')).toBeInTheDocument();
    expect(screen.getByText('2025-06-20')).toBeInTheDocument();

    const clear = screen.getByLabelText('Clear date');
    fireEvent.click(clear);
    fireEvent.keyDown(clear, { key: 'Enter' });
    fireEvent.keyDown(clear, { key: ' ' });
    expect(onClear).toHaveBeenCalledTimes(3);
  });

  it('hides clear button when readOnly or without value', () => {
    const { rerender } = render(
      <DateInput
        mode="single"
        singleValue={null}
        rangeValue={{ start: null, end: null }}
        format="YYYY-MM-DD"
        placeholder="Pick"
        isOpen={false}
        isDisabled={false}
        readOnly={false}
        clearable={false}
        classNames={{}}
        styles={{}}
        onOpen={() => undefined}
        onClear={() => undefined}
      />,
    );
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();

    rerender(
      <DateInput
        mode="single"
        singleValue={dayjs('2025-06-10')}
        rangeValue={{ start: null, end: null }}
        format="YYYY-MM-DD"
        placeholder="Pick"
        isOpen={false}
        isDisabled={false}
        readOnly
        clearable
        classNames={{}}
        styles={{}}
        onOpen={() => undefined}
        onClear={() => undefined}
      />,
    );
    expect(screen.queryByLabelText('Clear date')).not.toBeInTheDocument();
  });

  it('supports custom input rendering', () => {
    const onOpen = vi.fn();
    const onClear = vi.fn();
    render(
      <DateInput
        mode="single"
        singleValue={dayjs('2025-06-10')}
        rangeValue={{ start: null, end: null }}
        format="YYYY-MM-DD"
        locale="en"
        placeholder="Pick"
        isOpen={false}
        isDisabled={false}
        readOnly={false}
        clearable
        classNames={{}}
        styles={{}}
        onOpen={onOpen}
        onClear={onClear}
        renderInput={(props) => (
          <button type="button" onClick={() => { props.onClick(); props.onClear(); }}>
            {props.value}
          </button>
        )}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '2025-06-10' }));
    expect(onOpen).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalled();
  });

  it('renders empty range placeholders and ignores non-activation keys', () => {
    const onOpen = vi.fn();
    const { container } = render(
      <DateInput
        mode="range"
        singleValue={null}
        rangeValue={{ start: null, end: null }}
        format="YYYY-MM-DD"
        placeholder={['Start date', 'End date']}
        isOpen={false}
        isDisabled={false}
        readOnly={false}
        clearable
        classNames={{}}
        styles={{}}
        onOpen={onOpen}
        onClear={() => undefined}
      />,
    );

    expect(screen.getByText('Start date')).toBeInTheDocument();
    expect(screen.getByText('End date')).toBeInTheDocument();

    fireEvent.keyDown(container.querySelector('.fldp-input-wrapper') as HTMLElement, { key: 'Tab' });
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('renders custom input content in range mode', () => {
    render(
      <DateInput
        mode="range"
        singleValue={null}
        rangeValue={{ start: dayjs('2025-06-10'), end: dayjs('2025-06-20') }}
        format="YYYY-MM-DD"
        placeholder={['Start', 'End']}
        isOpen={false}
        isDisabled={false}
        readOnly={false}
        clearable
        classNames={{}}
        styles={{}}
        onOpen={() => undefined}
        onClear={() => undefined}
        renderInput={(props) => <button type="button">{props.value}</button>}
      />,
    );

    expect(screen.getByRole('button', { name: '2025-06-10 → 2025-06-20' })).toBeInTheDocument();
  });

  it('does not clear on non-activation keys', () => {
    const onClear = vi.fn();
    render(
      <DateInput
        mode="single"
        singleValue={dayjs('2025-06-10')}
        rangeValue={{ start: null, end: null }}
        format="YYYY-MM-DD"
        placeholder="Pick"
        isOpen={false}
        isDisabled={false}
        readOnly={false}
        clearable
        classNames={{}}
        styles={{}}
        onOpen={() => undefined}
        onClear={onClear}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText('Clear date'), { key: 'Tab' });
    expect(onClear).not.toHaveBeenCalled();
  });
});
