import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XIcon } from 'lucide-react';
import Link from 'next/link';

export default function CancelSuccessPage() {
  return (
    <div className='w-full min-h-screen flex flex-1 justify-center items-center'>
      <Card className='w-[350px]'>
        <div className='p-6'>
          <div className='w-full flex justify-center'>
            <XIcon className='size-14 text-red-500 p-2 bg-red-500/30 rounded-full' />
          </div>
          <div className='mt-3 text-center sm:mt-5 w-full'>
            <h2 className='text-2xl font-semibold'>Payment Canceled</h2>
            <p className='mt-1 text-sm text-muted-foreground text-balance'>
              Your payment was successfully canceled. You will not be charged.
            </p>
            <Button asChild className='w-full mt-4'>
              <Link href='/'>Go back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
