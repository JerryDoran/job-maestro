import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingJobPage() {
  return (
    <div className='container mx-auto py-8'>
      <div className='grid lg:grid-cols-3 gap-8'>
        <div className='space-y-8 col-span-2'>
          <div className='flex items-start justify-between'>
            <div className=''>
              <Skeleton className='w-[300px] h-9 mb-2' />
              <div className='flex items-center gap-2'>
                <Skeleton className='w-[120px] h-4' />
                <Skeleton className='w-[90px] h-4' />
                <Skeleton className='w-[90px] h-4' />
              </div>
            </div>
          </div>
          <section className='space-y-4'>
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-3/4 h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-5/6 h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-3/4 h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-5/6 h-4' />
            <Skeleton className='w-full h-4' />
          </section>
          <section>
            <Skeleton className='w-[200px] h-6 mb-4' />
            <div className='flex flex-wrap gap-2'>
              {[...Array(15)].map((_, index) => (
                <Skeleton key={index} className='w-[120px] h-8 rounded-full' />
              ))}
            </div>
          </section>
        </div>

        <div className='space-y-6'>
          <Card className='p-6'>
            <div className='space-y-4'>
              <div className=''>
                <Skeleton className='w-[100px] h-4 mb-2' />
                <Skeleton className='w-full h-4 mb-2' />
                <Skeleton className='w-full h-4' />
              </div>
              <Skeleton className='w-full h-10' />
            </div>
          </Card>
          <Card className='p-6'>
            <div className='space-y-4'>
              <Skeleton className='w-[150px] h-6 mb-2' />
              <div className='space-y-2'>
                {[...Array(4)].map((_, index) => (
                  <div key={index} className='flex justify-between'>
                    <Skeleton className='w-[100px] h-4' />
                    <Skeleton className='w-[120px] h-4' />
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card className='p-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <Skeleton className='size-12 rounded-full' />
                <div>
                  <Skeleton className='w-[150px] h-5 mb-2' />
                  <Skeleton className='w-[200px] h-5 mb-2' />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
