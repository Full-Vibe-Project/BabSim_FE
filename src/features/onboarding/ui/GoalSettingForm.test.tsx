import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import GoalSettingForm from './GoalSettingForm';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Partial<OnboardingData>;
}) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'test',
      gender: 'MALE',
      birthdate: '1990-01-01',
      height: 175,
      weight: 70, // This will be used as currentWeight
      healthConditions: {
        allergies: [],
        chronicDiseases: [],
        medication: '',
      },
      goalType: 'HEALTH_MANAGEMENT', // Default to a non-weight goal
      exerciseCount: 3,
      dailyWaterIntake: 2,
      dailySteps: 8000,
      ...defaultValues,
    },
  });

  // Mock submit function
  const onSubmit = vi.fn();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

describe('GoalSettingForm', () => {
  describe('Goal Type Selection', () => {
    it('should show weight-specific fields only when "Weight Management" is selected', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>,
      );

      // Initially, weight fields should not be visible
      expect(screen.queryByLabelText(/목표 체중/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/목표 기간/i)).not.toBeInTheDocument();

      // Click "Weight Management"
      const weightManagementButton = screen.getByRole('button', { name: /체중 관리/i });
      await userEvent.click(weightManagementButton);

      // Now, weight fields should be visible
      expect(await screen.findByLabelText(/목표 체중/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/목표 기간/i)).toBeInTheDocument();

      // Click another goal type
      const nutritionBalanceButton = screen.getByRole('button', { name: /영양 균형/i });
      await userEvent.click(nutritionBalanceButton);

      // Weight fields should disappear again
      await waitFor(() => {
        expect(screen.queryByLabelText(/목표 체중/i)).not.toBeInTheDocument();
      });
      expect(screen.queryByLabelText(/목표 기간/i)).not.toBeInTheDocument();
    });
  });

  describe('Dynamic Validation for Weight Management', () => {
    it('should display an error if target weight is the same as current weight', async () => {
      // Default weight in TestWrapper is 70
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>,
      );

      // Select "Weight Management" to show the fields
      const weightManagementButton = screen.getByRole('button', { name: /체중 관리/i });
      await userEvent.click(weightManagementButton);

      const targetWeightInput = await screen.findByLabelText(/목표 체중/i);
      await userEvent.type(targetWeightInput, '70');

      expect(await screen.findByText('목표 체중은 현재 체중과 같을 수 없습니다.')).toBeInTheDocument();
    });

    it('should remove the error when target weight is different', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>,
      );

      const weightManagementButton = screen.getByRole('button', { name: /체중 관리/i });
      await userEvent.click(weightManagementButton);

      const targetWeightInput = await screen.findByLabelText(/목표 체중/i);
      await userEvent.type(targetWeightInput, '70');
      expect(await screen.findByText('목표 체중은 현재 체중과 같을 수 없습니다.')).toBeInTheDocument();

      await userEvent.clear(targetWeightInput);
      await userEvent.type(targetWeightInput, '65');

      await waitFor(() => {
        expect(screen.queryByText('목표 체중은 현재 체중과 같을 수 없습니다.')).not.toBeInTheDocument();
      });
    });
  });

  describe('Weekly Goal Inputs', () => {
    it('should allow user to input weekly goals', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>,
      );

      const exerciseInput = screen.getByLabelText(/주간 운동 횟수/i);
      const waterInput = screen.getByLabelText(/하루 물 섭취량/i);
      const stepsInput = screen.getByLabelText(/하루 걸음 수/i);

      await userEvent.clear(exerciseInput);
      await userEvent.type(exerciseInput, '5');
      expect(exerciseInput).toHaveValue(5);

      await userEvent.clear(waterInput);
      await userEvent.type(waterInput, '3');
      expect(waterInput).toHaveValue(3);

      await userEvent.clear(stepsInput);
      await userEvent.type(stepsInput, '10000');
      expect(stepsInput).toHaveValue(10000);
    });
  });
});