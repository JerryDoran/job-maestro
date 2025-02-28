import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { auth } from '@/lib/auth';
import UserDropdown from '@/components/shared/user-dropdown';

export default async function Header() {
  const session = await auth();

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

      {/* Desktop Naviagtion */}
      <div className='hidden md:flex items-center gap-4'>
        <ThemeToggle />
        <Link className={buttonVariants({ size: 'default' })} href='/post-job'>
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            className={buttonVariants({ variant: 'outline', size: 'default' })}
            href='/login'
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
