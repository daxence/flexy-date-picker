import { describe, expect, it } from 'vitest';
import * as lib from './index';

describe('public exports', () => {
  it('exposes component and utility APIs', () => {
    expect(lib.DatePicker).toBeTypeOf('function');
    expect(lib.Calendar).toBeTypeOf('function');
    expect(lib.CalendarHeader).toBeTypeOf('function');
    expect(lib.CalendarDay).toBeTypeOf('function');
    expect(lib.Tooltip).toBeTypeOf('function');
    expect(lib.useDatePickerContext).toBeTypeOf('function');
    expect(lib.generateCalendarDays).toBeTypeOf('function');
    expect(lib.generateTimeSlots).toBeTypeOf('function');
    expect(lib.isTimeDisabled).toBeTypeOf('function');
  });
});
