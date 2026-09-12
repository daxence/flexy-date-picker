import { useState } from 'react';
import { DatePicker, CalendarLegend } from '../features/date-picker';
import { TimePicker } from '../features/time-picker';
import type { DateValue, DateRange, DateSchedule } from '../features/date-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';
import { CodeBlock } from './code-block';

const langOptions = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Arabic', value: 'ar' },
] as const;

const weekStartOptions = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Saturday', value: 6 },
] as const;

const rangeBoundOptions = [
  { label: 'Open', value: 'open' },
  { label: 'Last 7 days to +30 days', value: 'balanced' },
  { label: 'This month only', value: 'month' },
] as const;

const timeStepOptions = [
  { label: '5 min', value: 5 },
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
] as const;

const timeDisableRuleOptions = [
  { label: 'No disabled time', value: 'none' },
  { label: 'Weekend mornings blocked', value: 'weekend-morning' },
  { label: 'Specific date blocked', value: 'specific-date' },
] as const;

const contentMap: Record<string, { label: string; tone?: 'accent' | 'muted' }> = {
  '2026-06-05': { label: 'Today', tone: 'muted' },
  '2026-06-07': { label: 'Booked', tone: 'muted' },
  '2026-06-11': { label: 'Offer', tone: 'accent' },
  '2026-06-14': { label: 'Event', tone: 'muted' },
  '2026-06-18': { label: 'Room 2', tone: 'accent' },
  '2026-06-20': { label: '500 $', tone: 'accent' },
  '2026-06-24': { label: 'Sold out', tone: 'muted' },
  '2026-06-28': { label: 'Low', tone: 'muted' },
  '2026-07-02': { label: '420 $', tone: 'accent' },
  '2026-07-04': { label: 'Note', tone: 'muted' },
};

// ─── Copy-pasteable snippets shown under each demo section ───────────────────

const SNIPPETS = {
  playground: `
<DatePicker
  inline
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  numberOfMonths={2}
  showMonthYearSelectors={false}
  lang="en" // or "fr", "ar"...
  weekStartsOn={1} // 0 = Sunday
  minDate={dayjs().subtract(7, 'day')}
  maxDate={dayjs().add(30, 'day')}
  clearable
  tooltip={({ isRangeStart, isRangeEnd, isInRange, date }) => {
    if (isRangeStart) return 'Start';
    if (isRangeEnd) return 'End';
    if (isInRange) return date.format('MMM D');
    return null;
  }}
/>`,

  hotelBooking: `
<DatePicker
  inline
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  numberOfMonths={2}
  tooltip={({ isRangeStart, isRangeEnd, isPreviewRangeEnd, nights }) => {
    if (nights && (isRangeEnd || isPreviewRangeEnd)) {
      return nights + (nights > 1 ? ' nights' : ' night');
    }
    if (isRangeStart) return 'Check-in';
    if (isRangeEnd) return 'Check-out';
    return null;
  }}
  renderDay={(date) => {
    const price = prices[date.format('YYYY-MM-DD')];
    return (
      <>
        <span className="fldp-day-number">{date.date()}</span>
        {price && <span className="fldp-day-price">{price} CHF</span>}
      </>
    );
  }}
/>

<CalendarLegend
  items={[
    { label: 'Selected', className: 'fldp-legend-box--selected' },
    { label: 'Available', className: 'fldp-legend-box--available' },
    { label: 'Unavailable', className: 'fldp-legend-box--unavailable' },
  ]}
/>`,

  dayContent: `
<DatePicker
  inline
  mode="single"
  theme={{ dayBorderRadius: '18px' }} // or "8px" for rectangle
  renderDay={(date) => {
    const content = contentMap[date.format('YYYY-MM-DD')];
    return (
      <div className="my-day-cell">
        <span>{date.date()}</span>
        {content && <span className="my-day-badge">{content.label}</span>}
      </div>
    );
  }}
  tooltip={({ date, isSelected }) => {
    if (isSelected) return 'Selected';
    return contentMap[date.format('YYYY-MM-DD')]?.label ?? null;
  }}
/>`,

  noContent: `
<DatePicker
  inline
  mode="single"
  theme={{ dayBorderRadius: '8px' }}
  tooltip="Plain day cell"
/>`,

  dateTime: `
<DatePicker
  mode="single"
  value={meetingDate}
  onDateChange={setMeetingDate}
  onTimeChange={(date) => setMeetingDate(date)}
  enableTime
  timeStep={15} // or 5, 30...
  timeFormat="HH:mm"
  minTime="08:00"
  maxTime="20:00"
  disabledTime={{
    // block weekend mornings
    weekdays: { 0: morningSlots, 6: morningSlots },
  }}
  clearable
  tooltip={({ date }) => 'Meeting on ' + date.format('MMM D')}
/>`,

  perDateSchedule: `
const meetingTimeSchedule = {
  '2026-06-15': { unavailable: true },
  '2026-06-16': {
    ranges: [
      { from: '08:00', to: '12:00', step: 15 },
      { from: '14:00', to: '16:00', step: 5 },
      { from: '16:00', to: '18:00', step: 10 },
    ],
  },
};

const defaultMeetingSchedule = {
  ranges: [{ from: '09:00', to: '17:00', step: 30 }],
};

<DatePicker
  mode="single"
  value={value}
  onDateChange={setValue}
  onTimeChange={(date) => setValue(date)}
  enableTime
  timeSchedule={meetingTimeSchedule}
  defaultTimeSchedule={defaultMeetingSchedule}
  clearable
/>`,

  standaloneTimePicker: `
// Popover mode
<TimePicker
  value={time}
  onChange={setTime}
  schedule={{
    ranges: [
      { from: '08:00', to: '12:00', step: 30 },
      { from: '13:00', to: '18:00', step: 15 },
    ],
  }}
  clearable
/>

// Inline mode
<TimePicker
  value={time}
  onChange={setTime}
  minTime="09:00"
  maxTime="17:00"
  timeStep={30}
  inline
/>`,

  singleDate: `
<DatePicker
  mode="single"
  value={single}
  onDateChange={setSingle}
  tooltip={({ date }) => 'Click to select ' + date.format('MMM D')}
  highlightToday
  clearable
/>`,

  inlineRange: `
const [range, setRange] = useState({ start: null, end: null });
const [show, setShow] = useState(false);

<button onClick={() => setShow((v) => !v)}>Toggle picker</button>

{show && (
  <DatePicker
    inline
    mode="range"
    rangeValue={range}
    onRangeChange={setRange}
    numberOfMonths={2}
    clearable
  />
)}`,

  alwaysOpenRange: `
<DatePicker
  inline
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  numberOfMonths={2}
  minDate={dayjs().subtract(7, 'day')}
  maxDate={dayjs().add(30, 'day')}
  clearable
/>`,

  multilingual: `
<DatePicker mode="single" lang="fr" weekStartsOn={1} tooltip="Choisissez une date" />

<DatePicker mode="single" lang="ar" weekStartsOn={6} tooltip="اختر تاريخًا" />`,

  customTheme: `
<DatePicker
  mode="single"
  theme={{
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    muted: '#ede9fe',
    borderRadius: '12px',
    dayBorderRadius: '50%',
  }}
  tooltip="Pick a day"
/>`,

  disabledWeekends: `
<DatePicker
  mode="single"
  disabled={{
    predicate: (date) => date.day() === 0 || date.day() === 6,
  }}
  tooltip={({ isDisabled }) => (isDisabled ? 'Weekend' : undefined)}
/>`,

  classNamesStyles: `
<style>{\`
  .my-cal { border: 2px dashed #f59e0b; }
  .my-day-selected { outline: 3px solid #f59e0b; outline-offset: 2px; }
\`}</style>

<DatePicker
  mode="single"
  classNames={{ calendar: 'my-cal', daySelected: 'my-day-selected' }}
  styles={{ popover: { background: '#fefce8' } }}
/>`,

  readOnly: `
<DatePicker mode="single" value={dayjs()} readOnly />`,
} as const;

const sectionStyle: React.CSSProperties = {
  marginBottom: 40,
  padding: '24px',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 1px 4px rgba(0,0,0,.08)',
};

const inlineSurfaceStyle: React.CSSProperties = {
  marginTop: 16,
  padding: 16,
  borderRadius: 20,
  border: '1px solid #dbe4ee',
  background: 'linear-gradient(180deg, #ffffff, #f8fafc)',
  boxShadow: '0 18px 40px -28px rgba(15, 23, 42, 0.35)',
  width: '100%',
};

export function Demo() {
  const [single, setSingle] = useState<DateValue>(null);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [showInlineRange, setShowInlineRange] = useState(false);
  const [dayShape, setDayShape] = useState<'rectangle' | 'rounded'>('rectangle');
  const [meetingDate, setMeetingDate] = useState<DateValue>(dayjs().hour(10).minute(0));
  const [timeStepMinutes, setTimeStepMinutes] = useState<5 | 15 | 30>(15);
  const [timeDisableRule, setTimeDisableRule] = useState<'none' | 'weekend-morning' | 'specific-date'>('weekend-morning');
  const [timePickerDisabled, setTimePickerDisabled] = useState(false);
  const [useCustomTimeStyle, setUseCustomTimeStyle] = useState(true);
  const [pickerLang, setPickerLang] = useState('en');
  const [pickerWeekStartsOn, setPickerWeekStartsOn] = useState<0 | 1 | 6>(0);
  const [rangeBounds, setRangeBounds] = useState<'open' | 'balanced' | 'month'>('balanced');

  const minDate =
    rangeBounds === 'balanced'
      ? dayjs().subtract(7, 'day')
      : rangeBounds === 'month'
        ? dayjs().startOf('month')
        : undefined;

  const maxDate =
    rangeBounds === 'balanced'
      ? dayjs().add(30, 'day')
      : rangeBounds === 'month'
        ? dayjs().endOf('month')
        : undefined;

  const filteredLabel = `${langOptions.find((option) => option.value === pickerLang)?.label ?? pickerLang} · ${weekStartOptions.find((option) => option.value === pickerWeekStartsOn)?.label ?? pickerWeekStartsOn} · ${rangeBoundOptions.find((option) => option.value === rangeBounds)?.label ?? rangeBounds}`;
  const calendarBorderRadius = dayShape === 'rectangle' ? '8px' : '18px';
  const dayCellStyle = dayShape === 'rectangle'
    ? {
        aspectRatio: '1 / 1',
      }
    : undefined;

  function createTimeRange(startHour: number, endHour: number, step: number): string[] {
    const slots: string[] = [];
    for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += step) {
      const hour = String(Math.floor(minutes / 60)).padStart(2, '0');
      const minute = String(minutes % 60).padStart(2, '0');
      slots.push(`${hour}:${minute}`);
    }
    return slots;
  }

  const morningSlots = createTimeRange(8, 12, timeStepMinutes);
  const specialDate = dayjs().add(2, 'day').format('YYYY-MM-DD');

  const disabledTimeConfig =
    timeDisableRule === 'none'
      ? undefined
      : timeDisableRule === 'weekend-morning'
        ? {
            weekdays: {
              0: morningSlots,
              6: morningSlots,
            } as const,
          }
        : {
            dates: {
              [specialDate]: createTimeRange(9, 14, timeStepMinutes),
            },
          };

  const timePickerStyles = useCustomTimeStyle
    ? {
        timePicker: {
          background: 'linear-gradient(180deg, #ffffff, #ecfeff)',
          borderRadius: 14,
          padding: 12,
          border: '1px solid #bae6fd',
        },
        timeSlot: {
          borderRadius: 6,
        },
        timeSlotSelected: {
          background: '#0f766e',
          color: '#ffffff',
        },
      }
    : undefined;

  function renderOptionGroup<T extends string | number>(
    options: readonly { label: string; value: T }[],
    value: T,
    onChange: (nextValue: T) => void,
  ) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map((option) => (
          <span
            key={String(option.value)}
            role="button"
            tabIndex={0}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onChange(option.value);
              }
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 999,
              border: `1px solid ${value === option.value ? '#0f766e' : '#cbd5e1'}`,
              background: value === option.value ? '#0f766e' : '#fff',
              color: value === option.value ? '#fff' : '#0f172a',
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: 14,
            }}
          >
            {option.label}
          </span>
        ))}
      </div>
    );
  }

  function renderDayWithContent(date: dayjs.Dayjs) {
    const key = date.format('YYYY-MM-DD');
    const content = contentMap[key];

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 0 5px',
          gap: 4,
          lineHeight: 1,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700 }}>
          {date.date()}
        </span>
        {content ? (
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: 999,
              background: content.tone === 'accent' ? '#0f766e' : '#e2e8f0',
              color: content.tone === 'accent' ? '#fff' : '#334155',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {content.label}
          </span>
        ) : (
          <span style={{ height: 14 }} />
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 40, fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: 32 }}>🗓 flexy-date-picker demos</h1>

      {/* ── Playground filters ── */}
      <div style={sectionStyle}>
        <h2>Live playground filters</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Change the picker props here and watch the calendar update.
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <h3 style={{ marginBottom: 8 }}>Language</h3>
            {renderOptionGroup(langOptions, pickerLang, setPickerLang)}
          </div>

          <div>
            <h3 style={{ marginBottom: 8 }}>Week starts on</h3>
            {renderOptionGroup(weekStartOptions, pickerWeekStartsOn, setPickerWeekStartsOn)}
          </div>

          <div>
            <h3 style={{ marginBottom: 8 }}>Date bounds</h3>
            {renderOptionGroup(rangeBoundOptions, rangeBounds, setRangeBounds)}
          </div>
        </div>

        <p style={{ marginTop: 16, color: '#64748b' }}>{filteredLabel}</p>

        <div
          style={{
            ...inlineSurfaceStyle,
          }}
        >
          <DatePicker
            inline
            mode="range"
            rangeValue={range}
            onRangeChange={setRange}
            numberOfMonths={2}
            showMonthYearSelectors={false}
            lang={pickerLang}
            weekStartsOn={pickerWeekStartsOn}
            minDate={minDate}
            maxDate={maxDate}
            clearable
            tooltip={({ date, isRangeStart, isRangeEnd, isInRange }) => {
              if (isRangeStart) return '📌 Start';
              if (isRangeEnd) return '🏁 End';
              if (isInRange) return `${date.format('MMM D')}`;
              return null;
            }}
          />
        </div>
        <CodeBlock code={SNIPPETS.playground} />
      </div>

      {/* ── Hotel booking calendar ── */}
      <div style={sectionStyle}>
        <h2>Hotel booking calendar</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Calendar styled for hotel bookings with pricing, availability states, and a legend.
          Hover while picking a range to see check-in/check-out labels and a live &quot;X nights&quot; tooltip.
        </p>

        <div
          style={{
            ...inlineSurfaceStyle,
          }}
        >
          <DatePicker
            inline
            mode="range"
            rangeValue={range}
            onRangeChange={setRange}
            numberOfMonths={2}
            showMonthYearSelectors={false}
            lang="en"
            weekStartsOn={0}
            clearable
            tooltip={({ isRangeStart, isRangeEnd, isPreviewRangeEnd, nights }) => {
              if (nights && (isRangeEnd || isPreviewRangeEnd)) {
                return `${nights} night${nights > 1 ? 's' : ''}`;
              }
              if (isRangeStart) return 'Check-in';
              if (isRangeEnd) return 'Check-out';
              return null;
            }}
            renderDay={(date) => {
              // Sample pricing data - in real app, this would come from API
              const prices: Record<string, string> = {
                '2026-06-01': '299',
                '2026-06-02': '299',
                '2026-06-03': '319',
                '2026-06-04': '319',
                '2026-06-05': '334',
                '2026-06-06': '334',
                '2026-06-07': '399',
                '2026-06-08': '299',
                '2026-06-09': '299',
                '2026-06-10': '319',
                '2026-06-11': '319',
                '2026-06-12': '334',
                '2026-06-13': '334',
                '2026-06-14': '399',
              };
              
              const key = date.format('YYYY-MM-DD');
              const price = prices[key];
              
              return (
                <>
                  <span className="fldp-day-number">{date.date()}</span>
                  {price && <span className="fldp-day-price">{price} CHF</span>}
                </>
              );
            }}
          />
          
          <CalendarLegend
            items={[
              { label: 'Dates Sélectionnées', className: 'fldp-legend-box--selected' },
              { label: 'Disponibilité', className: 'fldp-legend-box--available' },
              { label: 'Pas De Disponibilité', className: 'fldp-legend-box--unavailable' },
              { label: 'Séjour Minimal', className: 'fldp-legend-box--minimal-stay' },
              { label: "Pas D'Arrivée", className: 'fldp-legend-box--no-arrival' },
            ]}
          />
        </div>
        <CodeBlock code={SNIPPETS.hotelBooking} />
      </div>

      {/* ── Day content injection ── */}
      <div style={sectionStyle}>
        <h2>Calendar with day content</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Days can show extra content below the number. Some dates have pricing or labels, some have nothing.
        </p>

        <div style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>Day shape</h3>
          {renderOptionGroup(
            [
              { label: 'Rectangle', value: 'rectangle' },
              { label: 'Rounded', value: 'rounded' },
            ] as const,
            dayShape,
            setDayShape,
          )}
        </div>

        <div
          style={{
            ...inlineSurfaceStyle,
          }}
        >
          <DatePicker
            inline
            mode="single"
            lang="en"
            weekStartsOn={0}
            styles={dayCellStyle ? { day: dayCellStyle } : undefined}
            theme={{ dayBorderRadius: calendarBorderRadius }}
            renderDay={renderDayWithContent}
            tooltip={({ date, isSelected }) => {
              const content = contentMap[date.format('YYYY-MM-DD')];
              if (isSelected) return 'Selected';
              if (!content) return null;
              return content.label;
            }}
          />
        </div>
        <CodeBlock code={SNIPPETS.dayContent} />
      </div>

      {/* ── No content, rectangular ── */}
      <div style={sectionStyle}>
        <h2>No content, rectangle option</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Same calendar, but with no injected content and rectangular cells.
        </p>

        <div style={inlineSurfaceStyle}>
          <DatePicker
            inline
            mode="single"
            lang="en"
            weekStartsOn={0}
            styles={dayCellStyle ? { day: dayCellStyle } : undefined}
            theme={{ dayBorderRadius: calendarBorderRadius }}
            tooltip="Plain day cell"
          />
        </div>
        <CodeBlock code={SNIPPETS.noContent} />
      </div>

      {/* ── Date + time picker ── */}
      <div style={sectionStyle}>
        <h2>Date + time picker</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Configure time slots, disable times by weekdays or exact dates, and override time styles.
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <h3 style={{ marginBottom: 8 }}>Time slot interval</h3>
            {renderOptionGroup(timeStepOptions, timeStepMinutes, setTimeStepMinutes)}
          </div>

          <div>
            <h3 style={{ marginBottom: 8 }}>Disabled time rules</h3>
            {renderOptionGroup(timeDisableRuleOptions, timeDisableRule, setTimeDisableRule)}
          </div>

          <div>
            <h3 style={{ marginBottom: 8 }}>Feature toggles</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => setTimePickerDisabled((value) => !value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setTimePickerDisabled((value) => !value);
                  }
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: `1px solid ${timePickerDisabled ? '#b91c1c' : '#cbd5e1'}`,
                  background: timePickerDisabled ? '#fee2e2' : '#fff',
                  color: timePickerDisabled ? '#991b1b' : '#0f172a',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: 14,
                }}
              >
                {timePickerDisabled ? 'Picker disabled' : 'Picker enabled'}
              </span>

              <span
                role="button"
                tabIndex={0}
                onClick={() => setUseCustomTimeStyle((value) => !value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setUseCustomTimeStyle((value) => !value);
                  }
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: `1px solid ${useCustomTimeStyle ? '#0f766e' : '#cbd5e1'}`,
                  background: useCustomTimeStyle ? '#ccfbf1' : '#fff',
                  color: useCustomTimeStyle ? '#115e59' : '#0f172a',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: 14,
                }}
              >
                {useCustomTimeStyle ? 'Custom style on' : 'Custom style off'}
              </span>
            </div>
          </div>
        </div>

        <p style={{ color: '#64748b' }}>
          {timeDisableRule === 'specific-date'
            ? `Blocked date: ${specialDate}`
            : timeDisableRule === 'weekend-morning'
              ? 'Rule: weekend morning slots blocked'
              : 'No time slots are disabled'}
        </p>

        <div style={inlineSurfaceStyle}>
          <DatePicker
            mode="single"
            value={meetingDate}
            onDateChange={setMeetingDate}
            onTimeChange={(date) => setMeetingDate(date)}
            enableTime
            timeStep={timeStepMinutes}
            timeFormat="HH:mm"
            minTime="08:00"
            maxTime="20:00"
            disabledTime={disabledTimeConfig}
            isDisabled={timePickerDisabled}
            clearable
            styles={timePickerStyles}
            tooltip={({ date }) => `Meeting on ${date.format('MMM D')}`}
          />
        </div>

        <p>
          Selected date-time: {meetingDate ? meetingDate.format('YYYY-MM-DD HH:mm') : 'none'}
        </p>
        <CodeBlock code={SNIPPETS.dateTime} />
      </div>

      {/* ── Per-date time schedule ── */}
      <PerDateScheduleDemo />

      {/* ── Standalone TimePicker ── */}
      <StandaloneTimePickerDemo />

      {/* ── Single date ── */}
      <div style={sectionStyle}>
        <h2>Single date</h2>
        <DatePicker
          mode="single"
          value={single}
          onDateChange={setSingle}
          tooltip={({ date }) => `Click to select ${date.format('MMM D')}`}
          highlightToday
          clearable
        />
        <p>Selected: {single ? single.format('MMMM D, YYYY') : 'none'}</p>
        <CodeBlock code={SNIPPETS.singleDate} />
      </div>

      {/* ── Inline range picker ── */}
      <div style={sectionStyle}>
        <h2>Inline range picker</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Click the button to mount the picker directly inside the card.
        </p>
        <button
          type="button"
          onClick={() => setShowInlineRange((value) => !value)}
          style={{
            border: '1px solid #cbd5e1',
            background: '#fff',
            borderRadius: 999,
            padding: '10px 14px',
            font: 'inherit',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          {showInlineRange ? 'Hide inline range picker' : 'Open inline range picker'}
        </button>

        {showInlineRange && (
          <div
            style={{
              padding: 16,
              borderRadius: 20,
              border: '1px solid #dbe4ee',
              background: 'linear-gradient(180deg, #ffffff, #f8fafc)',
              boxShadow: '0 18px 40px -28px rgba(15, 23, 42, 0.35)',
              width: 'fit-content',
            }}
          >
            <DatePicker
              inline
              mode="range"
              rangeValue={range}
              onRangeChange={setRange}
              numberOfMonths={2}
              clearable
              tooltip={({ date, isRangeStart, isRangeEnd, isInRange }) => {
                if (isRangeStart) return '📌 Start';
                if (isRangeEnd) return '🏁 End';
                if (isInRange) return `${date.format('MMM D')}`;
                return null;
              }}
            />
          </div>
        )}

        <p>
          Range:{' '}
          {range.start ? range.start.format('MMM D') : '—'} →{' '}
          {range.end ? range.end.format('MMM D, YYYY') : '—'}
        </p>
        <CodeBlock code={SNIPPETS.inlineRange} />
      </div>

      {/* ── Always open inline range picker ── */}
      <div style={sectionStyle}>
        <h2>Always open inline range picker</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          This one is rendered directly in the card with no opener at all.
        </p>
        <div
          style={{
            ...inlineSurfaceStyle,
          }}
        >
          <DatePicker
            inline
            mode="range"
            rangeValue={range}
            onRangeChange={setRange}
            numberOfMonths={2}
            minDate={dayjs().subtract(7, 'day')}
            maxDate={dayjs().add(30, 'day')}
            clearable
            tooltip={({ date, isRangeStart, isRangeEnd, isInRange }) => {
              if (isRangeStart) return '📌 Start';
              if (isRangeEnd) return '🏁 End';
              if (isInRange) return `${date.format('MMM D')}`;
              return null;
            }}
          />
        </div>
        <CodeBlock code={SNIPPETS.alwaysOpenRange} />
      </div>

      {/* ── Multilingual support ── */}
      <div style={sectionStyle}>
        <h2>Multilingual picker</h2>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Same picker, different language and week start settings.
        </p>

        <div style={{ display: 'grid', gap: 24 }}>
          <div>
            <h3 style={{ marginBottom: 12 }}>French, Monday start</h3>
            <DatePicker
              mode="single"
              lang="fr"
              weekStartsOn={1}
              tooltip="Choisissez une date"
            />
          </div>

          <div>
            <h3 style={{ marginBottom: 12 }}>Arabic, Saturday start</h3>
            <DatePicker
              mode="single"
              lang="ar"
              weekStartsOn={6}
              tooltip="اختر تاريخًا"
            />
          </div>
        </div>
        <CodeBlock code={SNIPPETS.multilingual} />
      </div>

      {/* ── Custom theme ── */}
      <div style={sectionStyle}>
        <h2>Custom purple theme</h2>
        <DatePicker
          mode="single"
          theme={{
            primary: '#7c3aed',
            primaryHover: '#6d28d9',
            muted: '#ede9fe',
            borderRadius: '12px',
            dayBorderRadius: '50%',
          }}
          tooltip="Pick a day ✨"
        />
        <CodeBlock code={SNIPPETS.customTheme} />
      </div>

      {/* ── Disabled dates ── */}
      <div style={sectionStyle}>
        <h2>Disabled (weekends)</h2>
        <DatePicker
          mode="single"
          disabled={{
            predicate: (d) => d.day() === 0 || d.day() === 6,
          }}
          tooltip={({ isDisabled }) => isDisabled ? '🚫 Weekend' : undefined}
        />
        <CodeBlock code={SNIPPETS.disabledWeekends} />
      </div>

      {/* ── Custom classNames injection ── */}
      <div style={sectionStyle}>
        <h2>Custom classNames + inline styles injection</h2>
        <style>{`
          .my-cal { border: 2px dashed #f59e0b; }
          .my-day-selected { outline: 3px solid #f59e0b; outline-offset: 2px; }
        `}</style>
        <DatePicker
          mode="single"
          classNames={{
            calendar: 'my-cal',
            daySelected: 'my-day-selected',
          }}
          styles={{
            popover: { background: '#fefce8' },
          }}
        />
        <CodeBlock code={SNIPPETS.classNamesStyles} />
      </div>

      {/* ── Read-only ── */}
      <div style={sectionStyle}>
        <h2>Read-only</h2>
        <DatePicker
          mode="single"
          value={dayjs()}
          readOnly
        />
        <CodeBlock code={SNIPPETS.readOnly} />
      </div>
    </div>
  );
}

// ─── Per-date time schedule demo ─────────────────────────────────────────────

const TODAY = dayjs();
const june15 = TODAY.year(TODAY.year()).month(5).date(15).format('YYYY-MM-DD'); // YYYY-06-15
const june16 = TODAY.year(TODAY.year()).month(5).date(16).format('YYYY-MM-DD'); // YYYY-06-16

/**
 * Demonstrates `timeSchedule` and `defaultTimeSchedule` props:
 *
 * - June 15: fully unavailable (no slots shown)
 * - June 16: three distinct ranges with different step intervals;
 *            12:00–14:00 gap has no slots
 * - All other dates: default schedule 09:00–17:00 at 30 min
 */
const meetingTimeSchedule: Record<string, DateSchedule> = {
  [june15]: { unavailable: true },
  [june16]: {
    ranges: [
      { from: '08:00', to: '12:00', step: 15 },
      // 12:00–14:00 gap: no slots
      { from: '14:00', to: '16:00', step: 5 },
      { from: '16:00', to: '18:00', step: 10 },
    ],
  },
};

const defaultMeetingSchedule: DateSchedule = {
  ranges: [{ from: '09:00', to: '17:00', step: 30 }],
};

function PerDateScheduleDemo() {
  const [value, setValue] = useState<DateValue>(null);

  return (
    <div style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0' }}>
      <h2>Per-date time schedule</h2>
      <p style={{ color: '#64748b', marginBottom: 12 }}>
        <strong>June 15</strong>: no availability &nbsp;|&nbsp;
        <strong>June 16</strong>: 08–12 (15 min), gap 12–14, 14–16 (5 min), 16–18 (10 min) &nbsp;|&nbsp;
        <strong>All other dates</strong>: 09–17 (30 min default)
      </p>
      <DatePicker
        mode="single"
        value={value}
        onDateChange={setValue}
        onTimeChange={(d) => setValue(d)}
        enableTime
        timeFormat="HH:mm"
        timeSchedule={meetingTimeSchedule}
        defaultTimeSchedule={defaultMeetingSchedule}
        clearable
      />
      <p>
        Selected: {value ? value.format('YYYY-MM-DD HH:mm') : 'none'}
      </p>
      <CodeBlock code={SNIPPETS.perDateSchedule} />
    </div>
  );
}

// ─── Standalone TimePicker demo ───────────────────────────────────────────────

const appointmentSchedule: DateSchedule = {
  ranges: [
    { from: '08:00', to: '12:00', step: 30 },
    { from: '13:00', to: '18:00', step: 15 },
  ],
};

function StandaloneTimePickerDemo() {
  const [popoverTime, setPopoverTime] = useState<string>('');
  const [inlineTime, setInlineTime] = useState<string>('');

  return (
    <div style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0' }}>
      <h2>Standalone TimePicker</h2>

      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Popover mode */}
        <div>
          <p style={{ color: '#64748b', marginBottom: 8 }}>
            <strong>Popover</strong> — schedule: 08–12 (30 min), 13–18 (15 min)
          </p>
          <TimePicker
            value={popoverTime}
            onChange={setPopoverTime}
            schedule={appointmentSchedule}
            timeFormat="HH:mm"
            placeholder="Pick a time"
            clearable
          />
          <p>Selected: {popoverTime || 'none'}</p>
        </div>

        {/* Inline mode */}
        <div style={{ minWidth: 160 }}>
          <p style={{ color: '#64748b', marginBottom: 8 }}>
            <strong>Inline</strong> — 09:00–17:00 at 30 min
          </p>
          <TimePicker
            value={inlineTime}
            onChange={setInlineTime}
            minTime="09:00"
            maxTime="17:00"
            timeStep={30}
            inline
            clearable
          />
          <p>Selected: {inlineTime || 'none'}</p>
        </div>

        {/* Disabled */}
        <div>
          <p style={{ color: '#64748b', marginBottom: 8 }}>
            <strong>Disabled</strong>
          </p>
          <TimePicker
            value="10:00"
            timeStep={30}
            minTime="08:00"
            maxTime="18:00"
            isDisabled
          />
        </div>

        {/* Read-only */}
        <div>
          <p style={{ color: '#64748b', marginBottom: 8 }}>
            <strong>Read-only</strong>
          </p>
          <TimePicker
            value="14:30"
            timeStep={30}
            minTime="08:00"
            maxTime="18:00"
            readOnly
          />
        </div>
      </div>
      <CodeBlock code={SNIPPETS.standaloneTimePicker} />
    </div>
  );
}
