import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

export default function CreateJobForm() {
  return (
    <Form {...form} className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <CardTitle>Job Form</CardTitle>
      </CardHeader>
    </Form>
  );
}
