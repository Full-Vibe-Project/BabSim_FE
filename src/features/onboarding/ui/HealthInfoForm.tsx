'use client';

import React, { useState } from 'react';
import { updateSelection } from '../lib/selection';

const ALLERGY_OPTIONS = ['갑각류', '견과류', '유제품', '밀', '해당사항 없음'];
const CHRONIC_DISEASE_OPTIONS = ['당뇨', '고혈압', '신장질환', '해당사항 없음'];
const DIET_PREFERENCE_OPTIONS = ['저탄수화물', '고단백', '저지방', '채식', '해당사항 없음'];

const HealthInfoForm = () => {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [chronicDiseases, setChronicDiseases] = useState<string[]>([]);
  const [dietPreferences, setDietPreferences] = useState<string[]>([]);

  const handleSelection = (category: string, item: string) => {
    if (category === 'allergies') {
      setAllergies(updateSelection(allergies, item));
    } else if (category === 'chronicDiseases') {
      setChronicDiseases(updateSelection(chronicDiseases, item));
    } else if (category === 'dietPreferences') {
      setDietPreferences(updateSelection(dietPreferences, item));
    }
  };

  const isFormValid = allergies.length > 0 && chronicDiseases.length > 0 && dietPreferences.length > 0;

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">건강 정보 입력</h1>
        <p className="text-gray-500 dark:text-gray-400">맞춤 식단 추천을 위해 알려주세요</p>
      </div>

      <div className="space-y-6">
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">알러지</legend>
          <div className="flex flex-wrap gap-2">
            {ALLERGY_OPTIONS.map((option) => (
              <button key={option} type="button" onClick={() => handleSelection('allergies', option)} className={`px-4 py-2 rounded-full border ${allergies.includes(option) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">만성 질환</legend>
          <div className="flex flex-wrap gap-2">
            {CHRONIC_DISEASE_OPTIONS.map((option) => (
              <button key={option} type="button" onClick={() => handleSelection('chronicDiseases', option)} className={`px-4 py-2 rounded-full border ${chronicDiseases.includes(option) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">식단 선호</legend>
          <div className="flex flex-wrap gap-2">
            {DIET_PREFERENCE_OPTIONS.map((option) => (
              <button key={option} type="button" onClick={() => handleSelection('dietPreferences', option)} className={`px-4 py-2 rounded-full border ${dietPreferences.includes(option) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <button type="submit" disabled={!isFormValid} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
        다음
      </button>
    </div>
  );
};

export default HealthInfoForm;