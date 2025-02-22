'use server';

import { z } from 'zod';

import { requireUser } from '@/lib/require-user';
import { companySchema } from '@/lib/zod-schemas';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: 'COMPANY',
      company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect('/');
}
