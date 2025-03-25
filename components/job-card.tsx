import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/format-currency';
import { MapPin } from 'lucide-react';
import { formatDays } from '@/lib/format-days';

type JobCardProps = {
  job: {
    title: string;
    id: string;
    createdAt: Date;
    company: {
      name: string;
      location: string;
      about: string;
      logo: string;
    };
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
  };
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className='hover:shadow-md transition-all duration-300 hover:shadow-green-700'>
        <CardHeader>
          <div className='flex flex-col md:flex-row gap-4'>
            <Image
              src={job.company.logo}
              width={50}
              height={50}
              alt={job.company.name}
              className='size-12 rounded-lg'
            />
            <div>
              <h1 className='text-lg md:text-xl font-semibold'>{job.title}</h1>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='text-muted-foreground text-sm'>
                  {job.company.name}
                </p>
                <span className='hidden md:inline text-muted-foreground'>
                  *
                </span>
                <Badge className='rounded-full' variant='secondary'>
                  {job.employmentType}
                </Badge>
                <span className='hidden md:inline text-muted-foreground'>
                  *
                </span>

                <Badge className='rounded-full flex items-center gap-2'>
                  <MapPin className='size-4' />
                  {job.location}
                </Badge>

                <span className='hidden md:inline text-muted-foreground'>
                  *
                </span>
                <p className='text-muted-foreground text-sm'>
                  {formatCurrency(job.salaryFrom)} -{' '}
                  {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>
            <div className='md:ml-auto'>
              {/* <div className='flex items-center gap-2'>
                <MapPin className='size-5 text-muted-foreground' />
                <h1>{job.location}</h1>
              </div> */}
              <p className='text-muted-foreground text-xs md:text-right'>
                {formatDays(job.createdAt)}
              </p>
            </div>
          </div>

          <p className='text-base text-muted-foreground line-clamp-2 !mt-4'>
            {job.company.about}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
