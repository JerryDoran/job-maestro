import EmptyState from '@/components/empty-state';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/require-user';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  CopyCheckIcon,
  MoreHorizontal,
  PenBoxIcon,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import CopyUrl from '@/components/shared/copy-url';

async function getMyJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: {
      company: {
        userId: userId,
      },
    },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function MyJobsPage() {
  const session = await requireUser();

  const myJobs = await getMyJobs(session.id as string);

  return (
    <>
      {myJobs.length < 0 ? (
        <EmptyState
          title='No job posts found!'
          description='You have not created any job posts yet.'
          buttonText='Create a job post'
          href='/post-job'
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>My Jobs</CardTitle>
            <CardDescription>
              Manage your job listings and applications here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myJobs.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <Image
                        src={listing.company.logo}
                        alt={listing.company.name}
                        width={40}
                        height={40}
                        className='rounded-md size-10'
                      />
                    </TableCell>
                    <TableCell>{listing.company.name}</TableCell>
                    <TableCell>{listing.title}</TableCell>
                    <TableCell>
                      {listing.status === 'ACTIVE' ? (
                        <span className='text-green-500 '>Active</span>
                      ) : (
                        <span className='text-red-500'>Inactive</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(listing.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='size-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild className='cursor-pointer'>
                            <Link href={`/my-jobs/${listing.id}/edit`}>
                              <PenBoxIcon />
                              Edit Job
                            </Link>
                          </DropdownMenuItem>
                          <CopyUrl
                            jobUrl={`${process.env.NEXT_PUBLIC_APP_URL}/job/${listing.id}`}
                          />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild className='cursor-pointer'>
                            <Link
                              href={`/my-jobs/${listing.id}/delete`}
                              className='text-red-500 '
                            >
                              <XCircle />
                              Delete Job
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
