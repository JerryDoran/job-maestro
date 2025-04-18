import { prisma } from '@/lib/prisma';
import EmptyState from './empty-state';
import JobCard from './job-card';
import MainPagination from '@/components/shared/main-pagination';
import { JobPostStatus } from '@prisma/client';

async function getJobListings({
  page = 1,
  pageSize = 4,
  jobTypes = [],
  location = '',
}: {
  page: number;
  pageSize: number;
  jobTypes: string[];
  location: string;
}) {
  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && {
      employmentType: {
        in: jobTypes,
      },
    }),
    ...(location &&
      location !== 'worldwide' && {
        location: location,
      }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        title: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.jobPost.count({
      where: {
        status: 'ACTIVE',
      },
    }),
  ]);

  return { jobs: data, totalPages: Math.ceil(totalCount / pageSize) };
}

export default async function JobListings({
  currentPage,
  jobTypes,
  location,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
}) {
  const { jobs, totalPages } = await getJobListings({
    page: currentPage,
    pageSize: 4,
    jobTypes: jobTypes,
    location: location,
  });

  return (
    <>
      {jobs.length > 0 ? (
        <div className='flex flex-col gap-6'>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title='No jobs found'
          description='Try searching with different job parameters'
          buttonText='Clear all filters'
          href='/'
        />
      )}

      <div className='flex justify-center mt-6'>
        <MainPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
