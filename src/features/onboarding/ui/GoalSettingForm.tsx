'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validateGoalWeight } from '@/shared/lib/goalValidators';

const formSchema = z.object({
  goalType: z.enum(['WEIGHT_MANAGEMENT', 'DIET_MANAGEMENT', 'HEALTH_MANAGEMENT']),
  currentWeight: z.number().optional(),
  targetWeight: z.number().optional(),
  weeklyGoal: z.number(),
}).refine(data => {
  if (data.goalType === 'WEIGHT_MANAGEMENT') {
    return data.currentWeight !== undefined && data.targetWeight !== undefined;
  }
  return true;
}, {
  message: "체중 관리를 위해 현재 체중과 목표 체중을 입력해주세요.",
  path: ["currentWeight"],
}).refine(data => {
  if (data.goalType === 'WEIGHT_MANAGEMENT' && data.currentWeight && data.targetWeight) {
    return validateGoalWeight(data.currentWeight, data.targetWeight).isSuccess;
  }
  return true;
}, data => ({
  message: (data.goalType === 'WEIGHT_MANAGEMENT' && data.currentWeight && data.targetWeight) ? validateGoalWeight(data.currentWeight, data.targetWeight).msg || '' : '',
  path: ["targetWeight"],
}));

type FormData = z.infer<typeof formSchema>;

const GoalSettingForm = () => {
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      weeklyGoal: 500,
    }
  });

  const goalType = watch('goalType');

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Controller
        name="goalType"
        control={control}
        render={({ field }) => (
          <div className="flex gap-4">
            <label className="flex-1">
              <input type="radio" {...field} value="WEIGHT_MANAGEMENT" className="sr-only" id="weight-management" />
              <div className={`p-4 rounded-lg border cursor-pointer text-center ${field.value === 'WEIGHT_MANAGEMENT' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                체중 관리
              </div>
            </label>
            <label className="flex-1">
              <input type="radio" {...field} value="DIET_MANAGEMENT" className="sr-only" id="diet-management" />
              <div className={`p-4 rounded-lg border cursor-pointer text-center ${field.value === 'DIET_MANAGEMENT' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                식단 관리
              </div>
            </label>
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="currentWeight" className="text-sm font-medium text-gray-700 dark:text-gray-300">현재 체중 (kg)</label>
          <Controller
            name="currentWeight"
            control={control}
            render={({ field }) => <input id="currentWeight" type="number" {...field} disabled={goalType !== 'WEIGHT_MANAGEMENT'} onChange={e => field.onChange(parseFloat(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200" />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="targetWeight" className="text-sm font-medium text-gray-700 dark:text-gray-300">목표 체중 (kg)</label>
          <Controller
            name="targetWeight"
            control={control}
            render={({ field }) => <input id="targetWeight" type="number" {...field} disabled={goalType !== 'WEIGHT_MANAGEMENT'} onChange={e => field.onChange(parseFloat(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200" />}
          />
        </div>
      </div>
      {errors.targetWeight && <p className="text-sm text-red-600 mt-1">{errors.targetWeight.message}</p>}

      <div className="space-y-2">
        <label htmlFor="weeklyGoal" className="text-sm font-medium text-gray-700 dark:text-gray-300">주간 목표</label>
        <Controller
          name="weeklyGoal"
          control={control}
          render={({ field }) => (
            <select id="weeklyGoal" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="500">-500kcal</option>
              <option value="1000">-1000kcal</option>
            </select>
          )}
        />
      </div>

      <button type="submit" disabled={!isValid} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">
        시작하기
      </button>
    </form>
  );
};

export default GoalSettingForm;
