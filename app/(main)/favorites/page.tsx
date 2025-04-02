import EmptyState from '@/components/empty-state';
import JobCard from '@/components/job-card';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';

async function getFavorites(userId: string) {
  const favorites = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      JobPost: {
        select: {
          id: true,
          title: true,
          salaryFrom: true,
          salaryTo: true,
          location: true,
          employmentType: true,
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
      },
    },
  });
  return favorites;
}

export default async function FavoritesJob() {
  const user = await requireUser();
  const favoritesData = await getFavorites(user?.id!);

  if (favoritesData.length === 0) {
    return (
      <EmptyState
        title='No favorites found!'
        description='You have not saved any favorite jobs yet.'
        buttonText='Find Jobs'
        href='/'
      />
    );
  }
  return (
    <div className='grid grid-cols-1 gap-4 mt-5'>
      {favoritesData.map((favorite) => (
        <JobCard key={favorite.JobPost.id} job={favorite.JobPost} />
      ))}
    </div>
  );
}
