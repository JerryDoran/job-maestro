'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CopyUrl({ jobUrl }: { jobUrl: string }) {
  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success('Job URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy: ', error);
      toast.error('Failed to copy the URL. Please try again.');
    }
  }
  return (
    <DropdownMenuItem onSelect={handleCopyUrl}>
      <Link2 className='size-4' />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
}
