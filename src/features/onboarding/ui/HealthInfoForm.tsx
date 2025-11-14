'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { OnboardingData } from '../model/onboarding.schema';

const CHRONIC_DISEASE_OPTIONS = ['당뇨병', '고혈압', '고지혈증', '갑상선 질환', '통풍', '신장 질환'] as const;
const ALLERGY_OPTIONS = [
  '우유/유제품',
  '계란',
  '땅콩',
  '갑각류',
  '견과류',
  '밀',
  '콩',
  '생선',
] as const;
const NONE_OPTION = '해당사항 없음';

type CheckboxGroupProps = {
  name: 'healthConditions.chronicDiseases' | 'healthConditions.allergies';
  label: string;
  options: readonly string[];
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, label, options }) => {
  const { control, setValue, getValues } = useFormContext<OnboardingData>();

  const handleSelection = (option: string) => {
    const currentValue = getValues(name) || [];
    let newValue: string[];

    if (option === NONE_OPTION) {
      newValue = currentValue.includes(NONE_OPTION) ? [] : [NONE_OPTION];
    } else {
      if (currentValue.includes(option)) {
        newValue = currentValue.filter((item) => item !== option);
      } else {
        newValue = [...currentValue.filter((item) => item !== NONE_OPTION), option];
      }
    }
    setValue(name, newValue, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-stone-700">{label}</label>
          <div className="grid grid-cols-3 gap-3">
            {options.map((option) => (
              <label
                key={option}
                className={`flex items-center cursor-pointer bg-white p-3.5 px-5 rounded-lg shadow-sm transition-all duration-200
                  ${
                    field.value?.includes(option) && !field.value?.includes(NONE_OPTION)
                      ? 'ring-2 ring-custom-brown-dark text-custom-brown-dark font-semibold'
                      : 'text-stone-700'
                  }
                  ${field.value?.includes(NONE_OPTION) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                `}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={field.value?.includes(option) || false}
                  onChange={() => handleSelection(option)}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          <label
            className={`flex items-center cursor-pointer bg-white p-3.5 px-5 rounded-lg shadow-sm transition-all duration-200
              ${field.value?.includes(NONE_OPTION) ? 'ring-2 ring-custom-brown-dark text-custom-brown-dark font-semibold' : 'text-stone-700'}
            `}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={field.value?.includes(NONE_OPTION) || false}
              onChange={() => handleSelection(NONE_OPTION)}
            />
            <span className="text-sm">{NONE_OPTION}</span>
          </label>
        </div>
      )}
    />
  );
};

const HealthInfoForm = () => {
  const { register } = useFormContext<OnboardingData>();

  return (
    <main className="flex-grow pt-8 pb-12">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-stone-900">건강 정보</h1>
          <p className="text-stone-600">안전한 식단 관리를 위해 건강 상태를 알려주세요.</p>
        </div>

        <div className="space-y-8">
          <CheckboxGroup name="healthConditions.chronicDiseases" label="기저질환" options={CHRONIC_DISEASE_OPTIONS} />
          <CheckboxGroup name="healthConditions.allergies" label="식품 알레르기" options={ALLERGY_OPTIONS} />

          <div>
            <label htmlFor="medication" className="block text-sm font-medium text-stone-700 mb-2">
              현재 복용 중인 약
            </label>
            <textarea
              id="medication"
              rows={4}
              placeholder="복용 중인 약이나 영양제가 있다면 입력해주세요 (선택사항)"
              className="bg-white rounded-lg w-full p-4 text-stone-900 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-brown-light resize-none"
              {...register('healthConditions.medication')}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HealthInfoForm;