'use server';

import { z } from 'zod';

import { requireUser } from '@/lib/require-user';
import { companySchema, jobSchema, jobseekerSchema } from '@/lib/zod-schemas';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import arcjet, { detectBot, shield } from '@/lib/arcjet';
import { request } from '@arcjet/next';
import { stripe } from '@/lib/stripe';
import { jobListingDurationPricing } from '@/lib/pricing-tiers';
import { inngest } from '@/lib/inngest/client';
import { revalidatePath } from 'next/cache';

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
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect('/');
  }

  // check if user has a stripe customer id
  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email as string,
      name: user.name as string,
    });

    // we get the customer id from stripe
    stripeCustomerId = customer.id;

    // update the user with the stripe customer id
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: stripeCustomerId,
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
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
    select: {
      id: true,
    },
  });

  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validatedData.listingDuration
  );

  if (!pricingTier) {
    throw new Error('Pricing tier not found');
  }

  // trigger inngest event
  await inngest.send({
    name: 'job/created',
    data: {
      jobId: jobPost.id,
      expirationDays: validatedData.listingDuration,
    },
  });

  // create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Job Posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              'https://w19mrb4744.ufs.sh/f/mXraol2CawoQK7LjYmxRnhuCfgH6P4J3jqspwi9bLz1KYZ7X',
            ],
          },
          unit_amount: pricingTier.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobId: jobPost.id,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
  });

  return redirect(session.url as string);
}

export async function saveJobPost(jobId: string) {
  const user = await requireUser();

  // arcjet
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  await prisma.savedJobPost.create({
    data: {
      jobPostId: jobId,
      userId: user.id as string,
    },
  });

  revalidatePath(`/job/${jobId}`);
}

export async function unSaveJobPost(savedJobPostId: string) {
  const user = await requireUser();

  // arcjet
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const data = await prisma.savedJobPost.delete({
    where: {
      id: savedJobPostId,
      userId: user.id,
    },
    select: {
      jobPostId: true,
    },
  });

  revalidatePath(`/job/${data.jobPostId}`);
}

export async function editJobPost(
  data: z.infer<typeof jobSchema>,
  jobId: string
) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  const validateData = jobSchema.parse(data);

  await prisma.jobPost.update({
    where: {
      id: jobId,
      company: {
        userId: user.id,
      },
    },
    data: {
      jobDescription: validateData.jobDescription,
      title: validateData.title,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
    },
  });

  return redirect('/my-jobs');
}

export async function deleteJobPost(jobId: string) {
  const user = await requireUser();

  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error('Forbidden');
  }

  await prisma.jobPost.delete({
    where: {
      id: jobId,
      company: {
        userId: user.id,
      },
    },
  });

  await inngest.send({
    name: 'job/cancel.expiration',
    data: {
      jobId: jobId,
    },
  });

  return redirect('/my-jobs');
}
