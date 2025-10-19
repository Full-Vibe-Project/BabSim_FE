'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const healthConditions = ['고혈압', '당뇨', '고지혈증', '해당사항 없음'];
const allergies = ['견과류', '갑각류', '유제품', '해당사항 없음'];

const HealthInfoForm = () => {
  const { control, setValue, getValues } = useFormContext();

  const handleCheckboxChange = (field: any, value: string, isNone: boolean) => {
    const currentValues = getValues(field.name) || [];
    if (isNone) {
      field.onChange([value]);
    } else {
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value && v !== '해당사항 없음')
        : [...currentValues.filter((v: string) => v !== '해당사항 없음'), value];
      field.onChange(newValues);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">기저질환 (중복 선택 가능)</h3>
        <Controller
          name="healthConditions"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-4">
              {healthConditions.map((condition) => (
                <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id={`cond-${condition}`}
                    className="hidden"
                    checked={field.value?.includes(condition)}
                    onChange={() => handleCheckboxChange(field, condition, condition === '해당사항 없음')}
                  />
                  <span className={`px-4 py-2 rounded-md border w-full text-center ${field.value?.includes(condition) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    {condition}
                  </span>
                </label>
              ))}
            </div>
          )}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">식품 알레르기 (중복 선택 가능)</h3>
        <Controller
          name="allergies"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-4">
              {allergies.map((allergy) => (
                <label key={allergy} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id={`allergy-${allergy}`}
                    className="hidden"
                    checked={field.value?.includes(allergy)}
                    onChange={() => handleCheckboxChange(field, allergy, allergy === '해당사항 없음')}
                  />
                  <span className={`px-4 py-2 rounded-md border w-full text-center ${field.value?.includes(allergy) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    {allergy}
                  </span>
                </label>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default HealthInfoForm;
