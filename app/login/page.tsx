import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

export default function Login() {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href='/'>
          <Image src={logo} alt='logo' className='size-10' />
        </Link>
      </div>
    </div>
  );
}
