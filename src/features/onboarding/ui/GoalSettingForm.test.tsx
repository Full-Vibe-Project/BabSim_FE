import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import GoalSettingForm from './GoalSettingForm';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
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
});