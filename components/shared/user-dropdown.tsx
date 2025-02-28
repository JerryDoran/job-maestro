import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, Heart, Layers2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '@/lib/auth';

type UserDropdownProps = {
  email: string;
  name: string;
  image: string;
};

export default function UserDropdown({
  email,
  name,
  image,
}: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-auto p-0 hover:bg-transparent'>
          <Avatar>
            <AvatarImage src={image} alt='Profile Image' />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className='ml-1 opacity-80' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-48 rounded-lg shadow-lg p-2 mt-2'
        align='end'
      >
        <DropdownMenuLabel className='flex flex-col gap-1'>
          <span className='text-sm font-medium text-foreground'>{name}</span>
          <span className='text-xs text-muted-foreground'>{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/favorites'>
              <Heart size={16} strokeWidth={2} className='opacity-60' />
              <span className=''>Favorite jobs</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/my-jobs'>
              <Layers2 size={16} strokeWidth={2} className='opacity-60' />
              <span className=''>My job listings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button className='text-red-500 w-full flex items-center gap-1'>
              <LogOut size={16} strokeWidth={2} />
              <span className=''>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
