'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { countryList } from '@/lib/countries';
import { jobSchema } from '@/lib/zod-schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import SalaryRangeSelector from '@/components/salary-range-selector';
import JobDescriptionEditor from '@/components/rich-text-editor/job-editor';
import BenefitsSelector from '../benefits-selector';
import { Textarea } from '../ui/textarea';
import { UploadDropzone } from '@/components/shared/uploadthing';
import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { editJobPost } from '@/actions';

type EditJobFormProps = {
  jobPost: {
    id: string;
    company: {
      name: string;
      location: string;
      about: string;
      logo: string;
      website: string;
      xAccount: string | null;
    };
    title: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    jobDescription: string;
    listingDuration: number;
    benefits: string[];
  };
};

export default function EditJobForm({ jobPost }: EditJobFormProps) {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: jobPost.title,
      employmentType: jobPost.employmentType,
      location: jobPost.location,
      salaryFrom: jobPost.salaryFrom,
      salaryTo: jobPost.salaryTo,
      jobDescription: jobPost.jobDescription,
      listingDuration: jobPost.listingDuration,
      benefits: jobPost.benefits,
      companyName: jobPost.company.name,
      companyLocation: jobPost.company.location,
      companyLogo: jobPost.company.logo,
      companyWebsite: jobPost.company.website,
      companyXAccount: jobPost.company.xAccount || '',
      companyDescription: jobPost.company.about,
    },
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    try {
      setPending(true);
      await editJobPost(values, jobPost.id);
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
      <form
        className='col-span-1 lg:col-span-2 flex flex-col gap-8'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Job Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='i.e. Software Engineer' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='employmentType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Employment Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          <SelectItem value='full-time'>Full Time</SelectItem>
                          <SelectItem value='part-time'>Part Time</SelectItem>
                          <SelectItem value='contract'>Contract</SelectItem>
                          <SelectItem value='internship'>Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Location' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Worldwide</SelectLabel>
                          <SelectItem value='worldwide'>
                            <span className='pr-2'>🌍</span>
                            <span>Worldwide / Remote</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <span>{country.flagEmoji}</span>
                              <span className='pl-2'>{country.name}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    minSalary={10000}
                    maxSalary={1000000}
                    step={2000}
                  />
                </FormControl>
              </FormItem>
            </div>
            <FormField
              control={form.control}
              name='jobDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='benefits'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Company Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='i.e. Google' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='companyLocation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Location' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Worldwide</SelectLabel>
                          <SelectItem value='worldwide'>
                            <span className='pr-2'>🌍</span>
                            <span>Worldwide / Remote</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <span>{country.flagEmoji}</span>
                              <span className='pl-2'>{country.name}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
              <FormField
                control={form.control}
                name='companyWebsite'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='i.e. https://google.com' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='companyXAccount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company X Account</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='i.e. @google' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='companyDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='i.e. Search engine for the next generation...'
                      className='min-h-[120px]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='companyLogo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className='relative w-fit'>
                          <Image
                            src={field.value}
                            alt='logo'
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
                          endpoint='imageUploader'
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
          </CardContent>
        </Card>

        <Button
          type='submit'
          className='w-full text-base text-white font-bold'
          disabled={pending}
        >
          {pending ? 'Editing Job...' : 'Edit Job'}
        </Button>
      </form>
    </Form>
  );
}
