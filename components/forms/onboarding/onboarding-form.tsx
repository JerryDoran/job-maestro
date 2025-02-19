'use client';

import { useState } from 'react';
import logo from '@/public/logo.png';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import UserTypeForm from '@/components/forms/onboarding/user-type-form';
import CompanyForm from '@/components/forms/onboarding/company-form';

export type UserSelectionType = 'company' | 'jobseeker' | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <UserTypeForm onUserTypeSelection={handleUserTypeSelection} />;
      case 2:
        return userType === 'company' ? (
          <CompanyForm />
        ) : (
          <p>User is a jobseeker</p>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className='flex items-center gap-4 mb-10'>
        <Image src={logo} alt='Job Maestro Logo' width={50} height={50} />
        <h1 className='text-4xl font-bold'>
          Job <span className='text-primary'>Maestro</span>
        </h1>
      </div>
      <Card className='max-w-lg w-full'>
        <CardContent className='p-6'>{renderStep()}</CardContent>
      </Card>
    </>
  );
}
