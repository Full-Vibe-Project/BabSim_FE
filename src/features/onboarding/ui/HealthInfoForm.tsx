'use client';

import React from 'react';
import { useFormContext, Controller, Control } from 'react-hook-form';
import { OnboardingData } from '../model/onboarding.schema';

const ALLERGY_OPTIONS = ['갑각류', '견과류', '유제품', '밀', '해당사항 없음'];
const CHRONIC_DISEASE_OPTIONS = ['당뇨', '고혈압', '신장질환', '해당사항 없음'];
const DIET_PREFERENCE_OPTIONS = ['저탄수화물', '고단백', '저지방', '채식', '해당사항 없음'];

interface HealthOptionsProps {
  name: keyof OnboardingData['healthConditions'];
  label: string;
  options: readonly string[];
}

const HealthOptions: React.FC<HealthOptionsProps> = ({ name, label, options }) => {
  const { control } = useFormContext<OnboardingData>();

  const handleSelection = (currentValue: string[], option: string, onChange: (value: string[]) => void) => {
    const NONE_OPTION = '해당사항 없음';
    let newSelection: string[];

    if (option === NONE_OPTION) {
      newSelection = currentValue.includes(NONE_OPTION) ? [] : [NONE_OPTION];
    } else {
      if (currentValue.includes(option)) {
        newSelection = currentValue.filter((item) => item !== option);
      } else {
        newSelection = [...currentValue.filter((item) => item !== NONE_OPTION), option];
      }
    }
    onChange(newSelection);
  };

  return (
    <Controller
      name={`healthConditions.${name}`}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</legend>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelection(field.value || [], option, field.onChange)}
                className={`px-4 py-2 rounded-full border ${
                  (field.value || []).includes(option)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    />
  );
};

const HealthInfoForm = () => {
  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">건강 정보 입력</h1>
        <p className="text-gray-500 dark:text-gray-400">맞춤 식단 추천을 위해 알려주세요</p>
      </div>

      <div className="space-y-6">
        <HealthOptions name="allergies" label="알러지" options={ALLERGY_OPTIONS} />
        <HealthOptions name="chronicDiseases" label="만성 질환" options={CHRONIC_DISEASE_OPTIONS} />
        <HealthOptions name="dietPreferences" label="식단 선호" options={DIET_PREFERENCE_OPTIONS} />
      </div>
    </div>
  );
};

export default HealthInfoForm;