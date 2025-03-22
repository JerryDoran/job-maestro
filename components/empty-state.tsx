import { Ban, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8'>
      <div className='flex size-20 items-center justify-center rounded-full bg-primary/20'>
        <Ban className='size-10 text-primary' />
      </div>
      <h2 className='text-xl font-semibold mt-4'>{title}</h2>
      <p className='text-sm text-muted-foreground mt-2 mb-8 leading-tight max-w-sm text-balance'>
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle className='size-4' />
        {buttonText}
      </Link>
    </div>
  );
}
