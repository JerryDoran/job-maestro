import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { jobListingDurationPricing } from '@/lib/pricing-tiers';
import { ControllerRenderProps } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ListingDurationSelectorProps = {
  field: ControllerRenderProps;
};

export default function ListingDurationSelector({
  field,
}: ListingDurationSelectorProps) {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
      <div className='flex flex-col gap-4'>
        {jobListingDurationPricing.map((pricing) => (
          <div className='relative' key={pricing.days}>
            <RadioGroupItem
              value={pricing.days.toString()}
              id={pricing.days.toString()}
              className='sr-only'
            />
            <Label
              className='cursor-pointer flex flex-col'
              htmlFor={pricing.days.toString()}
            >
              <Card
                className={cn(
                  field.value === pricing.days
                    ? 'border-primary bg-primary/10'
                    : 'hover:bg-secondary/50',
                  'p-4 border-2 '
                )}
              >
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold text-lg'>{pricing.days} days</p>
                    <p className='text-muted-foreground text-sm'>
                      {pricing.description}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-lg'>${pricing.price}</p>
                    <p className='text-sm text-muted-foreground'>
                      ${(pricing.price / pricing.days).toFixed(2)}/day
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
