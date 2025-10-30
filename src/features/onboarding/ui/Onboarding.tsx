'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { useOnboardingStore } from '../model/onboarding.store';
import BasicInfoForm from './BasicInfoForm';
import HealthInfoForm from './HealthInfoForm';
import GoalSettingForm from './GoalSettingForm';
import { useMutation } from '@tanstack/react-query';

const steps = [
  { id: 'profile', component: BasicInfoForm, fields: ['name', 'gender', 'birthdate', 'height', 'weight'] },
  { id: 'health', component: HealthInfoForm, fields: ['healthConditions', 'allergies'] },
  { id: 'goals', component: GoalSettingForm, fields: ['goalType', 'currentWeight', 'targetWeight', 'weeklyGoal', 'exerciseCount'] },
];

interface OnboardingProps {
  onSubmit: (data: OnboardingData) => void;
}

const Onboarding = ({ onSubmit }: OnboardingProps) => {
  const { currentStep, nextStep, prevStep, data, updateData } = useOnboardingStore();
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: data,
  });

  const { trigger, getValues } = methods;

  const mutation = useMutation({
      mutationFn: (data: OnboardingData) => {
        // TODO: API 연결 시 실제 서버 요청 로직 구현
        console.log("Submitting:", data);
        return Promise.resolve(data);
      },
      onSuccess: (data) => {
        onSubmit(data);
      }
  });

  const handleNext = async () => {
    const fields = steps[currentStep].fields as (keyof OnboardingData)[];
    const isValid = await trigger(fields);
    if (isValid) {
      updateData(getValues());
      nextStep();
    }
  };

  const handlePrev = () => {
    updateData(getValues());
    prevStep();
  };

  const CurrentFormComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => mutation.mutate(data))}>
        <CurrentFormComponent />
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button type="button" onClick={handlePrev} className="px-4 py-2 border rounded-md">
              이전
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="px-4 py-2 border rounded-md bg-indigo-600 text-white">
              다음
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 border rounded-md bg-indigo-600 text-white">
              시작하기
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Onboarding;