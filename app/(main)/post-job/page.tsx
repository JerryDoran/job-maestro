import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/require-user';
import arcjetLogo from '@/public/arcjet.jpg';
import inngestLogo from '@/public/inngest.png';
import appleLogo from '@/public/apple.jpg';
import amazonLogo from '@/public/amazon.png';
import nvidiaLogo from '@/public/nvidia.png';
import nikeLogo from '@/public/nike.png';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateJobForm from '@/components/forms/create-job-form';

const companies = [
  {
    id: 0,
    name: 'Arcjet',
    logo: arcjetLogo,
  },
  {
    id: 1,
    name: 'Inngest',
    logo: inngestLogo,
  },
  {
    id: 3,
    name: 'Apple',
    logo: appleLogo,
  },
  {
    id: 4,
    name: 'Amazon',
    logo: amazonLogo,
  },
  {
    id: 5,
    name: 'Nvidia',
    logo: nvidiaLogo,
  },
  {
    id: 6,
    name: 'Nike',
    logo: nikeLogo,
  },
];

const testimonials = [
  {
    quote:
      'Job Maestro has been a game-changer for us. We have been able to find the best talent in the industry.',
    author: 'Sara Chen',
    company: 'TechCorp',
  },
  {
    quote:
      'We found the perfect candidate for our company in less than a week. Job Maestro is the real deal.',
    author: 'Jonas Schmedtmann',
    company: 'DevWorks',
  },

  {
    quote:
      'I can’t believe how easy it is to find the best talent with Job Maestro. It’s a must-have for any company.',
    author: 'Mark Zimmerman',
    company: 'AnalyticsPro',
  },
];

const stats = [
  { id: 0, value: '10k+', label: 'Monthly active job seekers' },
  { id: 1, value: '48h', label: 'Average time to hire' },
  { id: 2, value: '95%', label: 'Employer satisfaction rate' },
  { id: 3, value: '500+', label: 'Companies hiring remotely' },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      logo: true,
      about: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect('/');
  }

  return data;
}

export default async function PostJobPage() {
  const session = await requireUser();
  const data = await getCompany(session.id as string);
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
      <CreateJobForm
        companyDescription={data.about}
        companyName={data.name}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />
      <div className=''>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies who trust Job Maestro to find the best
              talent.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Companies */}
            <div className='grid grid-cols-3 gap-4'>
              {companies.map((company) => (
                <div key={company.id} className=''>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className='rounded-lg opacity-75 transition-opacity hover:opacity-100'
                  />
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className='space-y-5'>
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className='border-l-2 border-primary pl-4'
                >
                  <p className='text-sm text-muted-foreground italic'>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <footer className='mt-2'>
                    <p className='text-sm font-medium text-foreground'>
                      - {testimonial.author}, {testimonial.company}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-4'>
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className='flex flex-col items-center rounded-lg p-4 bg-muted bg-opacity-10'
                >
                  <h4 className='text-2xl font-bold text-primary'>
                    {stat.value}
                  </h4>
                  <p className='text-sm text-muted-foreground'>{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
