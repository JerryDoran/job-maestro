import { prisma } from '@/lib/prisma';
import EmptyState from './empty-state';
import JobCard from './job-card';
import MainPagination from '@/components/shared/main-pagination';

async function getJobListings(page: number = 1, pageSize: number = 4) {
  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: {
        status: 'ACTIVE',
      },
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
}: {
  currentPage: number;
}) {
  const { jobs, totalPages } = await getJobListings(currentPage);

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
