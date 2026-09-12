import type { Meta, StoryObj } from '@storybook/react';
import { CalendarLegend } from './calendar-legend';

const meta = {
  title: 'Components/CalendarLegend',
  component: CalendarLegend,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomItems: Story = {
  args: {
    items: [
      { label: 'Available', className: 'fldp-legend-box--available' },
      { label: 'Selected', className: 'fldp-legend-box--selected' },
      { label: 'Unavailable', className: 'fldp-legend-box--unavailable' },
    ],
  },
};

export const WithCustomStyling: Story = {
  args: {
    className: 'custom-legend',
    style: {
      background: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Selected Dates', className: 'fldp-legend-box--selected' },
    ],
  },
};

export const WithReactNodeLabels: Story = {
  args: {
    items: [
      { 
        label: <span><strong>Selected</strong> dates</span>, 
        className: 'fldp-legend-box--selected' 
      },
      { 
        label: <span style={{ fontStyle: 'italic' }}>Available</span>, 
        className: 'fldp-legend-box--available' 
      },
    ],
  },
};
