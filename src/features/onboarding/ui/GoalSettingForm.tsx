'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form'; // Add useFormContext

const GoalSettingForm = () => {
  const { control, formState: { errors }, watch } = useFormContext(); // Use useFormContext

  const goalType = watch('goalType');

  return (
    <div className="space-y-6 max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
            render={({ field }) => <input id="currentWeight" type="number" {...field} disabled={goalType !== 'WEIGHT_MANAGEMENT'} onChange={e => field.onChange(Math.max(0, parseFloat(e.target.value)))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200" />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="targetWeight" className="text-sm font-medium text-gray-700 dark:text-gray-300">목표 체중 (kg)</label>
          <Controller
            name="targetWeight"
            control={control}
            render={({ field }) => <input id="targetWeight" type="number" {...field} disabled={goalType !== 'WEIGHT_MANAGEMENT'} onChange={e => field.onChange(Math.max(0, parseFloat(e.target.value)))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-200" />}
          />
        </div>
      </div>
      {errors.targetWeight && <p className="text-sm text-red-600 mt-1">{errors.targetWeight.message}</p>}
      {errors.currentWeight && <p className="text-sm text-red-600 mt-1">{errors.currentWeight.message}</p>}

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

    </div>
  );
};

export default GoalSettingForm;