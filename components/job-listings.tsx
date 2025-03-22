import { prisma } from '@/lib/prisma';
import EmptyState from './empty-state';
import JobCard from './job-card';

async function getJobListings() {
  const data = await prisma.jobPost.findMany({
    where: {
      status: 'ACTIVE',
    },
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
  });

  return data;
}

export default async function JobListings() {
  const listings = await getJobListings();

  return (
    <>
      {listings.length > 0 ? (
        <div className='flex flex-col gap-6'>
          {listings.map((job) => (
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
    </>
  );
}
