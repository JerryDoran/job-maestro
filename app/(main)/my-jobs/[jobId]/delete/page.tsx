import { deleteJobPost } from '@/actions';
import SubmitButton from '@/components/shared/submit-button';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { requireUser } from '@/lib/require-user';
import { ArrowLeft, Trash } from 'lucide-react';
import Link from 'next/link';

type Params = Promise<{ jobId: string }>;

export default async function DeleteJobPage({ params }: { params: Params }) {
  const { jobId } = await params;
  await requireUser();
  return (
    <div>
      <Card className='max-w-lg mx-auto mt-72'>
        <CardHeader>
          <CardTitle>Delete Job</CardTitle>
          <CardDescription>
            Are you sure you want to delete this job? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-between'>
          <Link
            href='/my-jobs'
            className={buttonVariants({ variant: 'secondary' })}
          >
            <ArrowLeft className='size-4' />
            Cancel
          </Link>
          <form
            action={async () => {
              'use server';
              await deleteJobPost(jobId);
            }}
          >
            <SubmitButton
              text='Delete Job'
              variant='destructive'
              icon={<Trash />}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
