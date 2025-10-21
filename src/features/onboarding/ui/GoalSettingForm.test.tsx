import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import GoalSettingForm from './GoalSettingForm';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const TestWrapper = ({ children, defaultValues = {} }: { children: React.ReactNode, defaultValues?: Partial<OnboardingData> }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onBlur',
    defaultValues: {
      goalType: 'WEIGHT_MANAGEMENT',
      currentWeight: 70,
      weeklyGoal: 500,
      ...defaultValues,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('GoalSettingForm', () => {
  it('should enable the weight input fields only when "Weight Management" is selected', async () => {
    render(
      <TestWrapper>
        <GoalSettingForm />
      </TestWrapper>
    );
    await userEvent.click(screen.getByText('체중 관리'));
    expect(screen.getByLabelText(/현재 체중/i)).toBeEnabled();
    expect(screen.getByLabelText(/목표 체중/i)).toBeEnabled();
  });

  it('should display an error message if the target weight is the same as the current weight', async () => {
    render(
      <TestWrapper>
        <GoalSettingForm />
      </TestWrapper>
    );
    
    const targetWeightInput = screen.getByLabelText(/목표 체중/i);
    await userEvent.type(targetWeightInput, '70');
    fireEvent.blur(targetWeightInput);

    await waitFor(() => {
      expect(screen.getByText((content, element) => content.startsWith('목표 체중은 현재 체중과 같을 수 없습니다'))).toBeInTheDocument();
    });
  });
});