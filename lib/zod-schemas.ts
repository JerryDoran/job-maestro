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

export const jobSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters long'),
  employmentType: z.string().min(1, 'Please select an employment type'),
  location: z.string().min(1, 'Please select a location'),
  salaryFrom: z.number().min(1, 'Salary from is required'),
  salaryTo: z.number().min(1, 'Salary to is required'),
  jobDescription: z.string().min(1, 'Job description is required'),
  listingDuration: z.number().min(1, 'Please enter a listing duration'),
  benefits: z.array(z.string()).min(1, 'Please select at least one benefit'),
  companyName: z.string().min(1, 'Company name is required'),
  companyLocation: z.string().min(1, 'Company location is required'),
  companyLogo: z.string().min(1, 'Company logo is required'),
  companyWebsite: z.string().min(1, 'Company website is required'),
  companyXAccount: z.string().optional(),
  companyDescription: z.string().min(1, 'Company description is required'),
});
