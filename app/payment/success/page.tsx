import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className='w-full min-h-screen flex flex-1 justify-center items-center'>
      <Card className='w-[350px]'>
        <div className='p-6'>
          <div className='w-full flex justify-center'>
            <Check className='size-14 text-primary p-2 bg-green-500/30 rounded-full' />
          </div>
          <div className='mt-3 text-center sm:mt-5 w-full'>
            <h2 className='text-2xl font-semibold'>Payment Successful</h2>
            <p className='mt-1 text-sm text-muted-foreground text-balance'>
              Congratulations, your payment was successful. Your job listing is
              now live
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
