import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { auth, signOut } from '@/lib/auth';

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
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button
              variant='outline'
              className='text-white bg-gradient-to-br from-green-600  to-green-500 transition hover:opacity-90'
            >
              Sign Out
            </Button>
          </form>
        ) : (
          <Link
            href='/login'
            // className='text-white bg-gradient-to-br from-green-600 to-green-500 transition hover:opacity-90'
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
            })}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
