import EditJobForm from '@/components/forms/edit-job-form';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';
import { notFound } from 'next/navigation';

async function getJobData(jobId: string, userId: string) {
  // Fetch the job post data from the database
  // using the jobId and userId to ensure the user has access to the job post
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      company: {
        userId: userId,
      },
    },
    select: {
      id: true,
      title: true,
      benefits: true,
      jobDescription: true,
      location: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      listingDuration: true,
      company: {
        select: {
          name: true,
          about: true,
          location: true,
          website: true,
          xAccount: true,
          logo: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

type Params = Promise<{
  jobId: string;
}>;

export default async function EditJobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  const user = await requireUser();

  const jobData = await getJobData(jobId, user.id as string);

  return <EditJobForm jobPost={jobData} />;
}
