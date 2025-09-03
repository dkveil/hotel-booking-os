import { Card } from '@repo/ui-web';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Card> = {
	title: 'UI/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Card title',
		},
		children: {
			control: 'text',
			description: 'Card content',
		},
		href: {
			control: 'text',
			description: 'Link URL',
		},
		className: {
			control: 'text',
			description: 'CSS classes',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		title: 'Documentation',
		children: 'Find in-depth information about Next.js features and API.',
		href: 'https://nextjs.org/docs',
		className:
			'block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors max-w-sm',
	},
};

export const Hotel: Story = {
	args: {
		title: 'Hotel Management',
		children:
			'Manage your hotel bookings, rooms, and guest information efficiently.',
		href: 'https://example.com/hotel-management',
		className:
			'block p-6 bg-blue-50 border border-blue-200 rounded-lg shadow hover:bg-blue-100 transition-colors max-w-sm',
	},
};

export const Booking: Story = {
	args: {
		title: 'Room Booking',
		children: 'Book rooms instantly with our real-time availability system.',
		href: 'https://example.com/booking',
		className:
			'block p-6 bg-green-50 border border-green-200 rounded-lg shadow hover:bg-green-100 transition-colors max-w-sm',
	},
};

export const Analytics: Story = {
	args: {
		title: 'Analytics Dashboard',
		children: 'View detailed analytics and reports for your hotel operations.',
		href: 'https://example.com/analytics',
		className:
			'block p-6 bg-purple-50 border border-purple-200 rounded-lg shadow hover:bg-purple-100 transition-colors max-w-sm',
	},
};

export const Support: Story = {
	args: {
		title: 'Customer Support',
		children: 'Get help with our 24/7 customer support team.',
		href: 'https://example.com/support',
		className:
			'block p-6 bg-orange-50 border border-orange-200 rounded-lg shadow hover:bg-orange-100 transition-colors max-w-sm',
	},
};

export const Minimal: Story = {
	args: {
		title: 'Simple Card',
		children: 'A minimal card design with basic styling.',
		href: 'https://example.com',
		className:
			'block p-4 border rounded hover:shadow-md transition-shadow max-w-xs',
	},
};
