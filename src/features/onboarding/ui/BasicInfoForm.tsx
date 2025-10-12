'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validateName, validateBirthdate, validateHeight, validateWeight } from '@/shared/lib/validators';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">이름</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input id="name" {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <>
                <input {...field} type="radio" id="female" value="FEMALE" name="gender" />
                <label htmlFor="female">여성</label>
                <input {...field} type="radio" id="male" value="MALE" name="gender" />
                <label htmlFor="male">남성</label>
            </>
          )}
        />
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="birthdate">생년월일</label>
        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => <input id="birthdate" {...field} onChange={(e) => {
            handleBirthdateChange(e);
          }} />}
        />
        {errors.birthdate && <p>{errors.birthdate.message}</p>}
      </div>

      <div>
        <label htmlFor="height">키</label>
        <Controller
          name="height"
          control={control}
          render={({ field }) => <input id="height" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />}
        />
        {errors.height && <p>{errors.height.message}</p>}
      </div>

      <div>
        <label htmlFor="weight">몸무게</label>
        <Controller
          name="weight"
          control={control}
          render={({ field }) => <input id="weight" type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />}
        />
        {errors.weight && <p>{errors.weight.message}</p>}
      </div>

      <button type="submit" disabled={!isValid}>다음</button>
    </form>
  );
};

export default BasicInfoForm;