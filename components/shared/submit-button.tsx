'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  text: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
  icon?: React.ReactNode;
};

export default function SubmitButton({
  text,
  variant,
  className,
  icon,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} className={className} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className='animate-spin size-4' />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
          <span className='sr-only'>{text}</span>
        </>
      )}
    </Button>
  );
}
