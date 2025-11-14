'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { OnboardingData } from '../model/onboarding.schema';

const BasicInfoForm = () => {
  const { control, setValue } = useFormContext<OnboardingData>();

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
    <div className="space-y-8">
      {/* 제목 및 설명 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-stone-900">기본 프로필</h1>
        <p className="text-stone-600">맞춤형 건강 관리를 위해 기본 정보를 입력해주세요.</p>
      </div>

      {/* 입력 폼 */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* 이름 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
            이름
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  type="text"
                  id="name"
                  {...field}
                  placeholder="이름을 입력하세요"
                  className="bg-white rounded-lg w-full p-4 text-stone-900 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                />
                {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>

        {/* 성별 */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">성별</label>
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange('FEMALE')}
                    className={`py-3.5 rounded-lg font-semibold shadow-sm ${
                      field.value === 'FEMALE'
                        ? 'bg-custom-brown-light text-white'
                        : 'bg-white text-stone-700'
                    }`}
                  >
                    여성
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('MALE')}
                    className={`py-3.5 rounded-lg font-semibold shadow-sm ${
                      field.value === 'MALE'
                        ? 'bg-custom-brown-light text-white'
                        : 'bg-white text-stone-700'
                    }`}
                  >
                    남성
                  </button>
                </div>
                {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>

        {/* 생년월일 */}
        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-stone-700 mb-2">
            생년월일
          </label>
          <Controller
            name="birthdate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <input
                  type="text"
                  id="birthdate"
                  {...field}
                  onChange={handleBirthdateChange}
                  placeholder="YYYY-MM-DD"
                  className="bg-white rounded-lg w-full p-4 text-stone-900 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                />
                {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>

        {/* 키 / 몸무게 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-stone-700 mb-2">
              키 (cm)
            </label>
            <Controller
              name="height"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="number"
                    id="height"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    className="bg-white rounded-lg w-full p-4 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                  />
                  {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
                </>
              )}
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-stone-700 mb-2">
              몸무게 (kg)
            </label>
            <Controller
              name="weight"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="number"
                    id="weight"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    className="bg-white rounded-lg w-full p-4 text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-brown-light"
                  />
                  {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
                </>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;