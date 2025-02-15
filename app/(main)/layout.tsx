import Header from '@/components/shared/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
      <Header />
      {children}
    </div>
  );
}
