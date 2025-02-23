import OnboardingForm from '@/components/forms/onboarding/onboarding-form';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';
import { redirect } from 'next/navigation';

async function checkIfUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    return redirect('/');
  }

  return user;
}

export default async function OnboardingPage() {
  const session = await requireUser();
  await checkIfUserHasFinishedOnboarding(session.id as string);
  return (
    <div className='min-h-screen w-screen flex flex-col items-center justify-center py-10'>
      <OnboardingForm />
    </div>
  );
}
