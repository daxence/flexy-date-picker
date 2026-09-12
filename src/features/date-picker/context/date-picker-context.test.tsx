import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DatePickerContext, useDatePickerContext } from './date-picker-context';
import { createContextValue } from '../../../test/contextFactory';

function Consumer() {
  const ctx = useDatePickerContext();
  return <div>{ctx.mode}</div>;
}

describe('DatePickerContext', () => {
  it('throws outside provider', () => {
    expect(() => render(<Consumer />)).toThrowError('useDatePickerContext must be used inside <DatePicker>');
  });

  it('returns context inside provider', () => {
    const value = createContextValue({ mode: 'range' });
    const { getByText } = render(
      <DatePickerContext.Provider value={value}>
        <Consumer />
      </DatePickerContext.Provider>,
    );
    expect(getByText('range')).toBeInTheDocument();
  });
});
