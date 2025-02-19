import { Button } from '@/components/ui/button';
import { Building2, UserRound } from 'lucide-react';
import { UserSelectionType } from './onboarding-form';

type UserTypeFormProps = {
  onUserTypeSelection: (type: UserSelectionType) => void;
};

export default function UserTypeForm({
  onUserTypeSelection,
}: UserTypeFormProps) {
  return (
    <div className='space-y-8'>
      <div className='text-center space-y-2'>
        <h2 className='text-2xl font-bold'>Welcome! Let&apos;s get started</h2>
        <p className='text-muted-foreground'>
          Choose how you would like to use our platform
        </p>
      </div>
      <div className='grid gap-4'>
        <Button
          variant='outline'
          className='w-full flex justify-start h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary'
          onClick={() => onUserTypeSelection('company')}
        >
          <div className='size-12 rounded-full bg-primary/20 flex items-center justify-center'>
            <Building2 className='text-primary size-6' />
          </div>
          <div className='text-left text-lg font-semibold text-primary'>
            <h3 className='text-lg font-semibold text-primary'>
              Company / Organization
            </h3>
            <p className='text-sm text-muted-foreground'>
              Post jobs and find exceptional talent
            </p>
          </div>
        </Button>
        <Button
          variant='outline'
          className='w-full flex items-center justify-start h-auto p-6 gap-4 border-2 transition-all duration-200 hover:border-primary'
          onClick={() => onUserTypeSelection('jobseeker')}
        >
          <div className='size-12 rounded-full bg-primary/20 flex items-center justify-center'>
            <UserRound className='text-primary size-6' />
          </div>
          <div className='text-left text-lg font-semibold text-primary'>
            <h3 className='text-lg font-semibold text-primary'>Job Seeker</h3>
            <p className='text-sm text-muted-foreground'>
              Find your dream job and grow your career
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
