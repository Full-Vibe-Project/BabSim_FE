'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const ALLERGY_OPTIONS = ['갑각류', '견과류', '유제품', '밀', '해당사항 없음'];
const CHRONIC_DISEASE_OPTIONS = ['당뇨', '고혈압', '신장질환', '해당사항 없음'];
const DIET_PREFERENCE_OPTIONS = ['저탄수화물', '고단백', '저지방', '채식', '해당사항 없음'];

const HealthInfoForm = () => {
  const { control, watch } = useFormContext();

  const allergies = watch('healthConditions.allergies') || [];
  const chronicDiseases = watch('healthConditions.chronicDiseases') || [];
  const dietPreferences = watch('healthConditions.dietPreferences') || [];

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">건강 정보 입력</h1>
        <p className="text-gray-500 dark:text-gray-400">맞춤 식단 추천을 위해 알려주세요</p>
      </div>

      <div className="space-y-6">
        <Controller
          name="healthConditions.allergies"
          control={control}
          render={({ field }) => (
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">알러지</legend>
              <div className="flex flex-wrap gap-2">
                {ALLERGY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const newSelection = field.value?.includes(option)
                        ? field.value.filter((item: string) => item !== option)
                        : [...(field.value || []), option];
                      field.onChange(newSelection);
                    }}
                    className={`px-4 py-2 rounded-full border ${field.value?.includes(option) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        />

        <Controller
          name="healthConditions.chronicDiseases"
          control={control}
          render={({ field }) => (
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">만성 질환</legend>
              <div className="flex flex-wrap gap-2">
                {CHRONIC_DISEASE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const newSelection = field.value?.includes(option)
                        ? field.value.filter((item: string) => item !== option)
                        : [...(field.value || []), option];
                      field.onChange(newSelection);
                    }}
                    className={`px-4 py-2 rounded-full border ${field.value?.includes(option) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        />

        <Controller
          name="healthConditions.dietPreferences"
          control={control}
          render={({ field }) => (
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">식단 선호</legend>
              <div className="flex flex-wrap gap-2">
                {DIET_PREFERENCE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const newSelection = field.value?.includes(option)
                        ? field.value.filter((item: string) => item !== option)
                        : [...(field.value || []), option];
                      field.onChange(newSelection);
                    }}
                    className={`px-4 py-2 rounded-full border ${field.value?.includes(option) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        />
      </div>
    </div>
  );
};

export default HealthInfoForm;