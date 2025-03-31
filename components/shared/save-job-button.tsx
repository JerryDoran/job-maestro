'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button variant='outline' type='submit' disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='animate-spin size-4' /> <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={cn(
              'size-4 transition-colors',
              savedJob ? 'fill-current text-red-600' : ''
            )}
          />
          <span>{savedJob ? 'Saved' : 'Save Job'}</span>
          <span className='sr-only'>Save Job</span>
        </>
      )}
    </Button>
  );
}
