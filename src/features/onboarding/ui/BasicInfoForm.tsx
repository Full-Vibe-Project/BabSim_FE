'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validateName, validateBirthdate, validateHeight, validateWeight } from '@/shared/lib/basicInfoValidators';

const formSchema = z.object({
  name: z.string().superRefine((val, ctx) => {
    const result = validateName(val);
    if (!result.isSuccess) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.msg || '',
      });
    }
  }),
  gender: z.enum(['FEMALE', 'MALE'], { errorMap: () => ({ message: '성별을 선택해주세요.' }) }),
  birthdate: z.string().superRefine((val, ctx) => {
    const result = validateBirthdate(val);
    if (!result.isSuccess) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.msg || '',
      });
    }
  }),
  height: z.number().superRefine((val, ctx) => {
    const result = validateHeight(val);
    if (!result.isSuccess) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.msg || '',
      });
    }
  }),
  weight: z.number().superRefine((val, ctx) => {
    const result = validateWeight(val);
    if (!result.isSuccess) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result.msg || '',
      });
    }
  }),
});

type FormData = z.infer<typeof formSchema>;

const BasicInfoForm = () => {
  const { control, handleSubmit, formState: { errors, isValid }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      gender: undefined,
      birthdate: '',
      height: 0,
      weight: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;
    if (value.length > 4) {
      formattedValue = `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    if (value.length > 6) {
      formattedValue = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
    }
    setValue('birthdate', formattedValue, { shouldValidate: true });
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input id="name" {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">성별</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div className="flex gap-4">
              <label htmlFor="female" className="flex items-center space-x-2 cursor-pointer">
                <input {...field} type="radio" id="female" value="FEMALE" className="hidden" />
                <span className={`px-4 py-2 rounded-md border ${field.value === 'FEMALE' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}>여성</span>
              </label>
              <label htmlFor="male" className="flex items-center space-x-2 cursor-pointer">
                <input {...field} type="radio" id="male" value="MALE" className="hidden" />
                <span className={`px-4 py-2 rounded-md border ${field.value === 'MALE' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}>남성</span>
              </label>
            </div>
          )}
        />
        {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="birthdate" className="text-sm font-medium text-gray-700 dark:text-gray-300">생년월일</label>
        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => <input id="birthdate" {...field} onChange={handleBirthdateChange} placeholder="YYYY-MM-DD" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />}
        />
        {errors.birthdate && <p className="text-sm text-red-600 mt-1">{errors.birthdate.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="height" className="text-sm font-medium text-gray-700 dark:text-gray-300">키 (cm)</label>
          <Controller
            name="height"
            control={control}
            render={({ field }) => <input id="height" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />}
          />
          {errors.height && <p className="text-sm text-red-600 mt-1">{errors.height.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="weight" className="text-sm font-medium text-gray-700 dark:text-gray-300">몸무게 (kg)</label>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => <input id="weight" type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />}
          />
          {errors.weight && <p className="text-sm text-red-600 mt-1">{errors.weight.message}</p>}
        </div>
      </div>


    </div>
  );
};

export default BasicInfoForm;