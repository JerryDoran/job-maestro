'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { jobseekerSchema } from '@/lib/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadDropzone } from '@/components/shared/uploadthing';

import { XIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createJobseeker } from '@/actions';
import pdfImage from '@/public/pdf.png';

export default function JobSeekerForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof jobseekerSchema>>({
    resolver: zodResolver(jobseekerSchema),
    defaultValues: {
      name: '',
      about: '',
      resume: '',
    },
  });

  async function onSubmit(values: z.infer<typeof jobseekerSchema>) {
    try {
      setPending(true);
      await createJobseeker(values);
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.log('[ERROR]: Something went wrong!');
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='about'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea placeholder='Tell us about yourself...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='resume'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className='relative w-fit'>
                      <Image
                        src={pdfImage}
                        alt='pdf resume'
                        width={100}
                        height={100}
                        className='object-contain rounded-lg'
                      />
                      <Button
                        type='button'
                        variant='destructive'
                        size='icon'
                        className='absolute -top-2 -right-2'
                        onClick={() => field.onChange('')}
                      >
                        <XIcon className='size-2' />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint='resumeUploader'
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        field.onChange(res[0].ufsUrl);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                      className='ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/80 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary'
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={pending}
          className='w-full text-white font-semibold text-base'
        >
          {pending ? (
            <>
              <Loader2 className='animate-spin size-4' />
              <span>Submitting...</span>
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </Form>
  );
}
