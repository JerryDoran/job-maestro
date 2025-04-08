import JobFilters from '@/components/job-filters';
import JobListings from '@/components/job-listings';
import JobListingSkeleton from '@/components/shared/job-listing-skeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* Job Filters */}
      <JobFilters />

      {/* Job List */}
      <div className='col-span-2 flex flex-col gap-6'>
        <JobListingSkeleton />
        <Suspense fallback={<JobListingSkeleton />}>
          {/* <JobListings /> */}
        </Suspense>
      </div>
    </div>
  );
}
