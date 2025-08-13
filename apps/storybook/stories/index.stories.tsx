import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Overview',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllComponents: Story = {
  render: () => (
    <div className='space-y-8 p-6'>
      <div>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Hotel Booking UI Components</h2>
        <p className='text-gray-600 mb-8'>A showcase of all available UI components from @repo/ui package.</p>
      </div>

      <section>
        <h3 className='text-xl font-semibold mb-4 text-gray-700'>Buttons</h3>
        <div className='flex flex-wrap gap-4'>
          <Button appName='Hotel Booking' className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
            Primary Button
          </Button>
          <Button appName='Hotel Booking' className='px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors'>
            Secondary Button
          </Button>
          <Button appName='Hotel Booking' className='px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors'>
            Delete
          </Button>
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold mb-4 text-gray-700'>Cards</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card title='Hotel Management' href='https://example.com/hotel-management' className='block p-6 bg-blue-50 border border-blue-200 rounded-lg shadow hover:bg-blue-100 transition-colors'>
            Manage your hotel bookings, rooms, and guest information efficiently.
          </Card>
          <Card title='Room Booking' href='https://example.com/booking' className='block p-6 bg-green-50 border border-green-200 rounded-lg shadow hover:bg-green-100 transition-colors'>
            Book rooms instantly with our real-time availability system.
          </Card>
          <Card title='Analytics Dashboard' href='https://example.com/analytics' className='block p-6 bg-purple-50 border border-purple-200 rounded-lg shadow hover:bg-purple-100 transition-colors'>
            View detailed analytics and reports for your hotel operations.
          </Card>
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold mb-4 text-gray-700'>Code Components</h3>
        <div className='space-y-4'>
          <div>
            <p className='text-gray-600 mb-2'>Inline code example:</p>
            <p>
              Use <Code className='bg-gray-100 px-2 py-1 rounded text-sm font-mono'>pnpm dev</Code> to start the development server.
            </p>
          </div>
          <div>
            <p className='text-gray-600 mb-2'>Code block example:</p>
            <Code className='bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg font-mono text-sm whitespace-pre block'>
              {`function bookRoom(roomId, guestName) {
  return api.post("/bookings", { roomId, guestName });
}`}
            </Code>
          </div>
          <div>
            <p className='text-gray-600 mb-2'>Status messages:</p>
            <div className='flex flex-wrap gap-2'>
              <Code className='bg-green-50 border border-green-200 px-3 py-2 rounded font-mono text-sm text-green-800'>Booking confirmed</Code>
              <Code className='bg-red-50 border border-red-200 px-3 py-2 rounded font-mono text-sm text-red-800'>Error: Room not found</Code>
              <Code className='bg-yellow-50 border border-yellow-200 px-3 py-2 rounded font-mono text-sm text-yellow-800'>Processing...</Code>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
  name: 'All Components Showcase',
};
