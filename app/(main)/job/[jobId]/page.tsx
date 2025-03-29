import JsonToHtml from '@/components/json-to-html';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import arcjet, { detectBot } from '@/lib/arcjet';
import { benefits } from '@/lib/benefits-list';
import { getFlagEmoji } from '@/lib/countries';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import { tokenBucket } from '@/lib/arcjet';
import { request } from '@arcjet/next';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: 'DRY_RUN',
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: 'DRY_RUN',
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
}

async function getJob(jobId: string) {
  const jobData = await prisma.jobPost.findUnique({
    where: {
      status: 'ACTIVE',
      id: jobId,
    },
    select: {
      title: true,
      jobDescription: true,
      location: true,
      employmentType: true,
      benefits: true,
      createdAt: true,
      listingDuration: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
  });

  if (!jobData) {
    return notFound();
  }

  return jobData;
}

type Params = Promise<{ jobId: string }>;

export default async function JobDetailsPage({ params }: { params: Params }) {
  const { jobId } = await params;

  const session = await auth();
  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error('Access denied');
  }

  const job = await getJob(jobId);

  const locationFlag = getFlagEmoji(job.location);

  return (
    <div className='grid lg:grid-cols-3 gap-8 py-4'>
      <div className='space-y-8 col-span-2'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>{job.title}</h1>
            <div className='flex items-center gap-2 mt-2'>
              <p className='text-lg text-gray-500 font-medium'>
                {job.company.name}
              </p>
              <span className='hidden md:inline text-muted-foreground mt-2'>
                *
              </span>
              <Badge className='rounded-full' variant='secondary'>
                {job.employmentType}
              </Badge>
              <span className='hidden md:inline text-muted-foreground mt-2'>
                *
              </span>
              <Badge className='rounded-full' variant='secondary'>
                {locationFlag && <span className='mr-1'>{locationFlag}</span>}{' '}
                {job.location}
              </Badge>
            </div>
          </div>

          {session?.user ? (
            <form></form>
          ) : (
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href='/login'
            >
              <Heart className='size-4' /> Save Job
            </Link>
          )}
        </div>

        <section className=''>
          <JsonToHtml json={JSON.parse(job.jobDescription)} />
        </section>
        <section>
          <h3 className='font-semibold mb-4'>
            Benefits
            <span className='text-muted-foreground text-xs ml-2 font-normal'>
              (green means offered)
            </span>
          </h3>
          <div className='flex flex-wrap gap-3'>
            {benefits.map((benefit) => {
              const isOffered = job.benefits.includes(benefit.id);
              return (
                <Badge
                  key={benefit.id}
                  variant={isOffered ? 'default' : 'secondary'}
                  className={cn(
                    isOffered ? '' : 'opactiy-75 cursor-not-allowed',
                    'px-4 py-1.5 border text-xs rounded-full'
                  )}
                >
                  <span className='flex items-center gap-2 '>
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      <section className='space-y-6'>
        <Card className='p-6'>
          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold'>Apply now</h3>
              <p className='text-muted-foreground mt-2 text-sm'>
                Please let {job.company.name} know you found this job on Job
                Maestro. This helps us get more companies to post here!
              </p>
            </div>
            <Button className='w-full'>Apply now</Button>
          </div>
        </Card>
        <Card className='p-6'>
          <h3 className='font-semibold'>About the job</h3>
          <div className='space-y-2 mt-2'>
            <div className='flex justify-between items-center gap-2'>
              <span className='text-muted-foreground text-sm'>
                Apply before:
              </span>
              <span className='text-sm text-muted-foreground'>
                {new Date(
                  job.createdAt.getTime() +
                    job.listingDuration * 24 * 60 * 60 * 100
                ).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Posted on:</span>
              <span className='text-sm text-muted-foreground'>
                {job.createdAt.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>
                Employment Type:
              </span>
              <span className='text-sm text-muted-foreground'>
                {job.employmentType}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Location:</span>
              <span className='text-sm text-muted-foreground'>
                {locationFlag && <span className='mr-1'>{locationFlag}</span>}{' '}
                {job.location}
              </span>
            </div>
          </div>
        </Card>
        {/* Company info card */}
        <Card className='p-6'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <Image
                src={job.company.logo}
                alt={job.company.name}
                width={48}
                height={48}
                className='rounded-full size-12'
              />
              <div className='flex flex-col'>
                <h3 className='font-semibold'>{job.company.name}</h3>
                <p className='text-sm text-muted-foreground line-clamp-3'>
                  {job.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
