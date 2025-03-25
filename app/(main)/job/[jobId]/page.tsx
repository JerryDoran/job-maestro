import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function JobDetailsPage() {
  return (
    <div className='grid lg:grid-cols-[1fr, 400px] gap-8 py-4'>
      <div className='space-y-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Software Engineer</h1>
            <div className='flex items-center gap-2 mt-2'>
              <p className='text-lg text-gray-500 font-medium'>Google</p>
              <span className='hidden md:inline text-muted-foreground mt-2'>
                *
              </span>
              <Badge className='rounded-full' variant='secondary'>
                Full-time
              </Badge>
              <span className='hidden md:inline text-muted-foreground mt-2'>
                *
              </span>
              <Badge className='rounded-full' variant='secondary'>
                🇺🇸 United States
              </Badge>
            </div>
          </div>
          <Button variant='outline'>
            <Heart className='size-4' /> Save Job
          </Button>
        </div>
      </div>
    </div>
  );
}
