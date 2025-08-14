import { Button } from '@repo/ui/button';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <h1>Hello World</h1>

      <Button appName='Web' className='bg-black text-white p-3 rounded-md'>
        Click me test
      </Button>
    </main>
  );
}
