import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './time-picker';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: false, description: 'Controlled value in `HH:mm` format.' },
    defaultValue: { control: false, description: 'Uncontrolled initial value.' },
    timeStep: { control: { type: 'number', min: 5, max: 60, step: 5 } },
    minTime: { control: 'text' },
    maxTime: { control: 'text' },
    timeFormat: { control: 'text' },
    inline: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default popover ─────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    timeStep: 15,
    minTime: '08:00',
    maxTime: '18:00',
  },
};

// ─── Controlled ──────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: (args) => {
    function ControlledTimePicker() {
      const [value, setValue] = useState('09:00');
      return (
        <div>
          <TimePicker {...args} value={value} onChange={setValue} />
          <p style={{ marginTop: 12, color: '#64748b' }}>Selected: {value || 'none'}</p>
        </div>
      );
    }
    return <ControlledTimePicker />;
  },
  args: {
    timeStep: 30,
    minTime: '08:00',
    maxTime: '20:00',
  },
};

// ─── Inline ──────────────────────────────────────────────────────────────────

export const Inline: Story = {
  args: {
    inline: true,
    timeStep: 15,
    minTime: '09:00',
    maxTime: '17:00',
    defaultValue: '09:00',
  },
};

// ─── Schedule-based slots ───────────────────────────────────────────────────

export const WithSchedule: Story = {
  args: {
    schedule: {
      ranges: [
        { from: '08:00', to: '12:00', step: 15 },
        { from: '14:00', to: '18:00', step: 30 },
      ],
    },
  },
};

export const InlineWithSchedule: Story = {
  args: {
    inline: true,
    schedule: {
      ranges: [
        { from: '08:00', to: '12:00', step: 15 },
        { from: '14:00', to: '16:00', step: 5 },
        { from: '16:00', to: '18:00', step: 10 },
      ],
    },
  },
};

// ─── Disabled time slots ────────────────────────────────────────────────────

export const DisabledSlots: Story = {
  args: {
    inline: true,
    timeStep: 30,
    minTime: '08:00',
    maxTime: '18:00',
    disabledTime: {
      predicate: (_date, time) => {
        const [hour] = time.split(':').map(Number);
        return hour < 9 || hour >= 17;
      },
    },
  },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: '10:00',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: '10:00',
  },
};

export const NoClear: Story = {
  args: {
    clearable: false,
    defaultValue: '09:00',
  },
};

// ─── Formatting & locale ────────────────────────────────────────────────────

export const CustomFormat: Story = {
  args: {
    timeFormat: 'h:mm A',
    timeStep: 30,
    minTime: '08:00',
    maxTime: '18:00',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose a slot…',
  },
};
