'use client';

import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/format-currency';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';

type SalaryRangeSelectorProps = {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
};

export default function SalaryRangeSelector({
  control,
  minSalary,
  maxSalary,
  step,
}: SalaryRangeSelectorProps) {
  const { field: fromField } = useController({
    name: 'salaryFrom',
    control,
  });

  const { field: toField } = useController({
    name: 'salaryTo',
    control,
  });

  // create a tuple
  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  function handleSalaryChange(value: number[]) {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);

    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  }

  return (
    <div className='w-full space-y-4'>
      <Slider
        onValueChange={handleSalaryChange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className='flex justify-between text-sm '>
        <span>{formatCurrency(range[0])}</span>
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
}
