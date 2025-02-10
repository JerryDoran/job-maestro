import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <nav className='flex items-center justify-between py-5'>
      <Link href='/' className='font-bold flex items-center gap-2'>
        <Image src='/job-logo.png' width={40} height={40} alt='logo' />
        <h1 className='text-2xl font-bold'>
          Job{' '}
          <span className='text-transparent bg-gradient-to-br from-blue-500  to-indigo-200 bg-clip-text font-bold'>
            Maestro
          </span>
        </h1>
      </Link>
      <Button className='text-white bg-gradient-to-br from-blue-700  to-indigo-400 transition hover:opacity-90'>
        Sign In
      </Button>
    </nav>
  );
}
