import JobFilters from '@/components/job-filters';
import JobListings from '@/components/job-listings';
import JobListingSkeleton from '@/components/shared/job-listing-skeleton';
import { Suspense } from 'react';

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(',') || [];
  const location = params.location || '';

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* Job Filters */}
      <JobFilters />

      {/* Job List */}
      <div className='col-span-2 flex flex-col gap-6'>
        {/* <JobListingSkeleton /> */}
        <Suspense fallback={<JobListingSkeleton />} key={currentPage}>
          <JobListings
            currentPage={currentPage}
            jobTypes={jobTypes}
            location={location}
          />
        </Suspense>
      </div>
    </div>
  );
}
