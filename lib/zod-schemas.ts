import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  location: z.string().min(1, 'Location is required'),
  about: z
    .string()
    .min(10, 'Please provide some information about your company'),
  logo: z.string().min(1, 'Please upload a logo'),
  website: z.string().url('Please provide a valid website URL'),
  xAccount: z.string().optional(),
});

export const jobseekerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  resume: z.string().min(1, 'Please upload your resume'),
  about: z.string().min(10, 'Please provide some information about yourself'),
});
