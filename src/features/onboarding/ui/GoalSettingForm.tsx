'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { OnboardingData } from '../model/onboarding.schema';

const GOAL_TYPES = [
  {
    value: 'WEIGHT_MANAGEMENT',
    title: '체중 관리',
    description: '건강한 체중 달성',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    value: 'DIET_MANAGEMENT',
    title: '혈당 조절',
    description: '혈당 수치 관리',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    value: 'HEALTH_MANAGEMENT',
    title: '영양 균형',
    description: '균형잡힌 식단',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h2V7a1 1 0 112 0v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0v-2H5a1 1 0 01-1-1z" />
      </svg>
    ),
  },
] as const;

const GoalSettingForm = () => {
  const {
    control,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<OnboardingData>();

  const goalType = watch('goalType');

  const handleGoalTypeChange = (value: OnboardingData['goalType']) => {
    setValue('goalType', value, { shouldValidate: true, shouldDirty: true });
    if (value === 'WEIGHT_MANAGEMENT') {
      const currentWeight = getValues('weight');
      setValue('currentWeight', currentWeight, { shouldValidate: true });
    }
  };

  return (
    <main className="flex-grow pt-8 pb-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-stone-900">건강 목표 설정</h1>
          <p className="text-stone-600">달성하고 싶은 건강 목표를 설정해주세요.</p>
        </div>

        <div className="space-y-6">
          {/* Goal Type Selection */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">목표 유형</label>
            <div className="grid grid-cols-3 gap-3">
              {GOAL_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleGoalTypeChange(type.value)}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-lg border-2 h-32 space-y-2.5 shadow-sm
                    ${
                      goalType === type.value
                        ? 'border-custom-brown-light bg-custom-selected-bg'
                        : 'bg-white border-transparent'
                    }
                  `}
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full
                      ${
                        goalType === type.value
                          ? 'bg-custom-icon-bg-dark text-white'
                          : 'bg-custom-icon-bg-light text-stone-700'
                      }
                    `}
                  >
                    {type.icon}
                  </span>
                  <span className="text-sm font-semibold text-stone-800">{type.title}</span>
                  <span className="text-xs text-stone-500">{type.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Fields for Weight Management */}
          {goalType === 'WEIGHT_MANAGEMENT' && (
            <>
              <div>
                <label htmlFor="targetWeight" className="block text-sm font-medium text-stone-700 mb-2">
                  목표 체중
                </label>
                <input
                  type="number"
                  id="targetWeight"
                  {...register('targetWeight', { valueAsNumber: true })}
                  className="bg-white rounded-lg w-full p-4 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                />
                {errors.targetWeight && <p className="text-red-500 text-xs mt-1">{errors.targetWeight.message}</p>}
              </div>
              <div>
                <label htmlFor="goalPeriod" className="block text-sm font-medium text-stone-700 mb-2">
                  목표 기간
                </label>
                <div className="relative">
                  <select
                    id="goalPeriod"
                    {...register('goalPeriod')}
                    className="bg-white rounded-lg w-full p-4 text-stone-900 shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                  >
                    <option value="1개월">1개월</option>
                    <option value="3개월">3개월</option>
                    <option value="6개월">6개월</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.goalPeriod && <p className="text-red-500 text-xs mt-1">{errors.goalPeriod.message}</p>}
              </div>
            </>
          )}

          {/* Weekly Goals */}
          <div className="space-y-4 pt-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-stone-700">주간 목표</label>
              <p className="text-sm text-stone-500">달성 가능한 작은 목표를 설정해보세요.</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <label htmlFor="exerciseCount" className="text-sm font-medium text-stone-700">
                  주간 운동 횟수
                </label>
                <input
                  type="number"
                  id="exerciseCount"
                  {...register('exerciseCount', { valueAsNumber: true })}
                  className="w-20 text-right p-2 rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                />
              </div>
              {errors.exerciseCount && <p className="text-red-500 text-xs mt-1">{errors.exerciseCount.message}</p>}

              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <label htmlFor="dailyWaterIntake" className="text-sm font-medium text-stone-700">
                  하루 물 섭취량
                </label>
                <input
                  type="number"
                  id="dailyWaterIntake"
                  {...register('dailyWaterIntake', { valueAsNumber: true })}
                  className="w-20 text-right p-2 rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                />
              </div>
              {errors.dailyWaterIntake && (
                <p className="text-red-500 text-xs mt-1">{errors.dailyWaterIntake.message}</p>
              )}

              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <label htmlFor="dailySteps" className="text-sm font-medium text-stone-700">
                  하루 걸음 수
                </label>
                <input
                  type="number"
                  id="dailySteps"
                  {...register('dailySteps', { valueAsNumber: true })}
                  className="w-20 text-right p-2 rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                />
              </div>
              {errors.dailySteps && <p className="text-red-500 text-xs mt-1">{errors.dailySteps.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GoalSettingForm;