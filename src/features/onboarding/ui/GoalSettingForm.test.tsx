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
    defaultValues: {
      name: 'test',
      gender: 'FEMALE',
      birthdate: '2000-01-01',
      height: 170,
      weight: 60,
      healthConditions: {
        allergies: [],
        chronicDiseases: [],
        dietPreferences: [],
      },
      goalType: 'WEIGHT_MANAGEMENT',
      currentWeight: 70,
      targetWeight: 65,
      weeklyGoal: 500,
      exerciseCount: 3,
    }
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('GoalSettingForm', () => {
  describe('Goal Type Selection', () => {
    it('(AC-1) should select only one goal type at a time, like a radio button', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('체중 관리'));
      expect(screen.getByLabelText('체중 관리')).toBeChecked();
      await userEvent.click(screen.getByText('식단 관리'));
      expect(screen.getByLabelText('체중 관리')).not.toBeChecked();
      expect(screen.getByLabelText('식단 관리')).toBeChecked();
    });

    it('(AC-2) should enable the weight input fields only when "Weight Management" is selected', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('체중 관리'));
      expect(screen.getByLabelText(/현재 체중/i)).toBeEnabled();
      expect(screen.getByLabelText(/목표 체중/i)).toBeEnabled();
    });

    it('(AC-2) should disable the weight input fields when a goal type other than "Weight Management" is selected', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('식단 관리'));
      expect(screen.getByLabelText(/현재 체중/i)).toBeDisabled();
      expect(screen.getByLabelText(/목표 체중/i)).toBeDisabled();
    });
  });

  describe('Dynamic Validation', () => {
    it('(AC-3) should display an error message if the target weight is the same as the current weight', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('체중 관리'));
      await userEvent.type(screen.getByLabelText(/현재 체중/i), '70');
      await userEvent.type(screen.getByLabelText(/목표 체중/i), '70');
      expect(await screen.findByText('목표 체중은 현재 체중과 같을 수 없습니다.')).toBeInTheDocument();
    });

    it('should remove the error message when the target weight is changed to be different', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('체중 관리'));
      await userEvent.type(screen.getByLabelText(/현재 체중/i), '70');
      await userEvent.type(screen.getByLabelText(/목표 체중/i), '70');
      expect(await screen.findByText('목표 체중은 현재 체중과 같을 수 없습니다.')).toBeInTheDocument();
      await userEvent.clear(screen.getByLabelText(/목표 체중/i));
      await userEvent.type(screen.getByLabelText(/목표 체중/i), '65');
      await waitFor(() => {
        expect(screen.queryByText('목표 체중은 현재 체중과 같을 수 없습니다.')).not.toBeInTheDocument();
      });
    });
  });

  describe('Submit Button Activation Logic', () => {
    it('(AC-4) should render the "Start" button as disabled initially', () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      expect(screen.getByRole('button', { name: /시작하기/i })).toBeDisabled();
    });

    it('(AC-4) should keep the "Start" button disabled if "Weight Management" is selected but weight fields are invalid', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('체중 관리'));
      await userEvent.type(screen.getByLabelText(/현재 체중/i), '70');
      expect(screen.getByRole('button', { name: /시작하기/i })).toBeDisabled();
    });

    it('(AC-5) should enable the "Start" button when all required fields for the "Weight Management" goal are validly filled', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('체중 관리'));
      await userEvent.type(screen.getByLabelText(/현재 체중/i), '70');
      await userEvent.type(screen.getByLabelText(/목표 체중/i), '65');
      await userEvent.selectOptions(screen.getByLabelText(/주간 목표/i), '500');
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /시작하기/i })).toBeEnabled();
      });
    });

    it('(AC-5) should enable the "Start" button when a goal type other than "Weight Management" is selected and all other required fields are filled', async () => {
      render(
        <TestWrapper>
          <GoalSettingForm />
        </TestWrapper>
      );
      await userEvent.click(screen.getByText('식단 관리'));
      await userEvent.selectOptions(screen.getByLabelText(/주간 목표/i), '500');
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /시작하기/i })).toBeEnabled();
      });
    });
  });
});