'use server';

import { z } from 'zod';

import { requireUser } from '@/lib/require-user';
import { companySchema, jobSchema, jobseekerSchema } from '@/lib/zod-schemas';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import arcjet, { detectBot, shield } from '@/lib/arcjet';
import { request } from '@arcjet/next';

const aj = arcjet
  .withRule(
    shield({
      mode: 'LIVE',
    })
  )
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();
  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

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

export async function createJobseeker(data: z.infer<typeof jobseekerSchema>) {
  const session = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const validateData = jobseekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id as string,
    },
    data: {
      onboardingCompleted: true,
      userType: 'JOB_SEEKER',
      jobseeker: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect('/');
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();
  const req = await request();

  // arcjet
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const validatedData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!company?.id) {
    return redirect('/');
  }
  console.log('[COMPANY]', company);

  await prisma.jobPost.create({
    data: {
      companyId: company.id,
      jobDescription: validatedData.jobDescription,
      title: validatedData.title,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
    },
  });

  return redirect('/');
}
