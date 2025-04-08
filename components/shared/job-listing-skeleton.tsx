import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobListingSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      {[...Array(10)].map((_, index) => (
        <Card className='p-6' key={index}>
          <div className='flex items-start gap-4'>
            <Skeleton className='size-14 rounded' />
            <div className='flex-1 space-y-3'>
              <Skeleton className='w-[200px] h-4 ' />

              <div className='flex mt-4 gap-4'>
                <Skeleton className='w-[100px] h-4 ' />
                <Skeleton className='w-[100px] h-4 ' />
                <Skeleton className='w-[100px] h-4 ' />
                <Skeleton className='w-[100px] h-4 ' />
              </div>
              <div className=''>
                <Skeleton className='w-[500px] h-4 ' />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
