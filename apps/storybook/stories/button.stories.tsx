import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@repo/ui-web/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    appName: {
      control: 'text',
      description: 'App name shown in alert',
    },
    className: {
      control: 'text',
      description: 'CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
    appName: 'Storybook',
    className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    appName: 'Hotel Booking',
    className: 'px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    appName: 'Hotel Booking',
    className: 'px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    appName: 'Hotel Booking',
    className: 'px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    appName: 'Hotel Booking',
    className: 'px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    appName: 'Hotel Booking',
    className: 'px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors',
  },
};
