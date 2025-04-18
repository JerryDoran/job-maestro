'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { XIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { countryList } from '@/lib/countries';

const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // get current filters from url
  const currentJobTypes = searchParams.get('jobTypes')?.split(',') || [];

  const currentLocation = searchParams.get('location') || '';

  function clearFilters() {
    router.push('/');
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  function handleJobTypeChange(jobType: string, checked: boolean) {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }

    const newValue = Array.from(current).join(',');

    router.push(`?${createQueryString('jobTypes', newValue)}`);
  }

  function handleLocationChange(location: string) {
    router.push(`?${createQueryString('location', location)}`);
  }
  return (
    <Card className='col-span-2 lg:col-span-1 h-fit'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='text-2xl font-semibold'>Job Filters</CardTitle>
        <Button
          size='sm'
          variant='destructive'
          className='h-8'
          onClick={clearFilters}
        >
          <span>Clear all</span>
          <XIcon className='size-4 text-white' />
        </Button>
      </CardHeader>
      <Separator className='mb-4' />
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <Label className='text-lg font-semibold'>Job Type</Label>
          <div className='grid grid-cols-2 gap-4'>
            {jobTypes.map((jobType, index) => (
              <div className='flex items-center space-x-2 ' key={index}>
                <Checkbox
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(jobType, checked as boolean)
                  }
                  id={jobType}
                  checked={currentJobTypes.includes(jobType)}
                />
                <Label htmlFor={jobType} className='text-sm font-medium'>
                  {jobType}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        <div className='space-y-2'>
          <Label className='text-lg font-semibold'>Location</Label>
          <Select
            value={currentLocation}
            onValueChange={(location) => handleLocationChange(location)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a location' />
            </SelectTrigger>
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
        </div>
      </CardContent>
    </Card>
  );
}
