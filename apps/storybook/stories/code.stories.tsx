import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '@repo/ui-web/code';

const meta: Meta<typeof Code> = {
	title: 'UI/Code',
	component: Code,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: 'text',
			description: 'Code content',
		},
		className: {
			control: 'text',
			description: 'CSS classes',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
	args: {
		children: 'console.log("Hello World")',
		className: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono',
	},
};

export const Inline: Story = {
	args: {
		children: 'npm install',
		className: 'bg-gray-900 text-green-400 px-2 py-1 rounded text-sm font-mono',
	},
};

export const JavaScript: Story = {
	args: {
		children: 'const hotel = { name: "Grand Hotel", rooms: 150 }',
		className:
			'bg-blue-50 border border-blue-200 px-3 py-2 rounded font-mono text-sm text-blue-800',
	},
};

export const Command: Story = {
	args: {
		children: 'pnpm dev',
		className: 'bg-black text-white px-3 py-2 rounded font-mono text-sm',
	},
};

export const ErrorMessage: Story = {
	args: {
		children: 'Error: Room not found',
		className:
			'bg-red-50 border border-red-200 px-3 py-2 rounded font-mono text-sm text-red-800',
	},
};

export const Success: Story = {
	args: {
		children: 'Booking confirmed successfully',
		className:
			'bg-green-50 border border-green-200 px-3 py-2 rounded font-mono text-sm text-green-800',
	},
};

export const JSONExample: Story = {
	args: {
		children: '{ "roomId": 101, "status": "available" }',
		className:
			'bg-yellow-50 border border-yellow-200 px-3 py-2 rounded font-mono text-sm text-yellow-800 whitespace-pre',
	},
};

export const Large: Story = {
	args: {
		children:
			'function bookRoom(roomId, guestName) {\n  return api.post("/bookings", { roomId, guestName });\n}',
		className:
			'bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg font-mono text-sm whitespace-pre block',
	},
};
