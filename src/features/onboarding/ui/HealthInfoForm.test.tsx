import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import HealthInfoForm from './HealthInfoForm';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const TestWrapper = ({ children, defaultValues = {} }: { children: React.ReactNode; defaultValues?: Partial<OnboardingData> }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'test',
      gender: 'MALE',
      birthdate: '1990-01-01',
      height: 175,
      weight: 70,
      healthConditions: {
        allergies: [],
        chronicDiseases: [],
        dietPreferences: [],
      },
      goalType: 'WEIGHT_MANAGEMENT',
      currentWeight: 70,
      targetWeight: 65,
      weeklyGoal: 0.5,
      exerciseCount: 3,
      ...defaultValues,
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(vi.fn())}>
        {children}
        <button type="submit">다음</button>
      </form>
    </FormProvider>
  );
};

describe('HealthInfoForm', () => {
  describe(`다중 선택 기능 (Multiple Selections)`, () => {
    it('(AC-1) should allow checking multiple condition checkboxes simultaneously', async () => {
      render(
        <TestWrapper>
          <HealthInfoForm />
        </TestWrapper>,
      );
      const diabetes = screen.getByText('당뇨');
      const highBloodPressure = screen.getByText('고혈압');

      await userEvent.click(diabetes);
      await userEvent.click(highBloodPressure);

      expect(diabetes).toHaveClass('bg-blue-500');
      expect(highBloodPressure).toHaveClass('bg-blue-500');
    });
  });

  describe(`'해당사항 없음' 상호작용 ('Not Applicable' Interaction)`, () => {
    it('(AC-2) should uncheck all other condition checkboxes when "Not Applicable" is checked', async () => {
      render(
        <TestWrapper
          defaultValues={{
            healthConditions: { allergies: ['견과류', '갑각류'], chronicDiseases: [], dietPreferences: [] },
          }}
        >
          <HealthInfoForm />
        </TestWrapper>,
      );
      const allergyFieldset = screen.getByText('알러지').closest('fieldset') as HTMLElement;
      const nutsAllergy = within(allergyFieldset).getByText('견과류');
      const shellfishAllergy = within(allergyFieldset).getByText('갑각류');
      const noneAllergy = within(allergyFieldset).getByText('해당사항 없음');

      expect(nutsAllergy).toHaveClass('bg-blue-500');
      expect(shellfishAllergy).toHaveClass('bg-blue-500');

      await userEvent.click(noneAllergy);
      
      expect(noneAllergy).toHaveClass('bg-blue-500');
      expect(nutsAllergy).not.toHaveClass('bg-blue-500');
      expect(shellfishAllergy).not.toHaveClass('bg-blue-500');
    });

    it('(AC-2) should uncheck the "Not Applicable" checkbox when any other condition is checked', async () => {
      render(
        <TestWrapper
          defaultValues={{
            healthConditions: { allergies: ['해당사항 없음'], chronicDiseases: [], dietPreferences: [] },
          }}
        >
          <HealthInfoForm />
        </TestWrapper>,
      );

      const allergyFieldset = screen.getByText('알러지').closest('fieldset') as HTMLElement;
      const noneAllergy = within(allergyFieldset).getByText('해당사항 없음');
      const nutsAllergy = within(allergyFieldset).getByText('견과류');

      expect(noneAllergy).toHaveClass('bg-blue-500');

      await userEvent.click(nutsAllergy);

      expect(nutsAllergy).toHaveClass('bg-blue-500');
      expect(noneAllergy).not.toHaveClass('bg-blue-500');
    });
  });

  describe(`네비게이션 버튼 상태 (Navigation Button State)`, () => {
    it('(AC-3) should render the "Next" button as enabled by default', () => {
      render(
        <TestWrapper>
          <HealthInfoForm />
        </TestWrapper>,
      );
      const nextButton = screen.getByRole('button', { name: '다음' });
      expect(nextButton).not.toBeDisabled();
    });
  });
});
