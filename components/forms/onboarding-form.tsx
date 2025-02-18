'use client';

import { useState } from 'react';
import logo from '@/public/logo.png';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function OnboardingForm() {
  const [] = useState(1);
  return (
    <>
      <div className='flex items-center gap-4 mb-10'>
        <Image src={logo} alt='Job Maestro Logo' width={50} height={50} />
        <h1 className='text-4xl font-bold'>
          Job <span className='text-primary'>Maestro</span>
        </h1>
      </div>
      <Card className='max-w-lg w-full'>
        <CardContent></CardContent>
      </Card>
    </>
  );
}
