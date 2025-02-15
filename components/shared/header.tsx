import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export default function Header() {
  return (
    <nav className='flex items-center justify-between py-5'>
      <Link href='/' className='font-bold flex items-center gap-2'>
        <Image src='/logo.png' width={40} height={40} alt='logo' />
        <h1 className='text-2xl font-bold'>
          Job{' '}
          <span className='text-transparent bg-gradient-to-br from-green-500  to-green-600 bg-clip-text font-bold'>
            Maestro
          </span>
        </h1>
      </Link>
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <Button className='text-white bg-gradient-to-br from-green-600  to-green-500 transition hover:opacity-90'>
          Sign In
        </Button>
      </div>
    </nav>
  );
}
