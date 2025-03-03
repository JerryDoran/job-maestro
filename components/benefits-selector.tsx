import { benefits } from '@/lib/benefits-list';
import { Badge } from '@/components/ui/badge';
import { ControllerRenderProps } from 'react-hook-form';

type BenefitsSelectorProps = {
  field: ControllerRenderProps;
};

// The field prop is a ControllerRenderProps object that contains the field's onChange, onBlur, value, and name properties.  It acts as a bridge between the form state and the input element.
export default function BenefitsSelector({ field }: BenefitsSelectorProps) {
  function toggleBenefit(benefit: string) {
    const currentBenefits = field.value || [];
    const updatedBenefits = currentBenefits.includes(benefit)
      ? currentBenefits.filter((b: string) => b !== benefit)
      : [...currentBenefits, benefit];
    field.onChange(updatedBenefits);
  }

  return (
    <>
      <div className='flex flex-wrap gap-3'>
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);
          return (
            <Badge
              key={benefit.id}
              variant={isSelected ? 'default' : 'secondary'}
              className='cursor-pointer px-4 py-1.5 border border-zinc-700 transition active:scale-95 text-xs rounded-full'
              onClick={() => toggleBenefit(benefit.id)}
            >
              <span className='flex items-center gap-2 '>
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
      </div>
      <div className='pt-4 text-sm text-muted-foreground'>
        Selected benefites:{' '}
        <span className='text-primary'>{(field.value || []).length}</span>
      </div>
    </>
  );
}
