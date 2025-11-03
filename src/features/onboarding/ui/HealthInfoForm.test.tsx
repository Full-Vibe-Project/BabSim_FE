import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import HealthInfoForm from './HealthInfoForm';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      gender: undefined,
      birthdate: '',
      height: 0,
      weight: 0,
      healthConditions: [],
      allergies: [],
      goalType: 'WEIGHT_MANAGEMENT',
      currentWeight: 0,
      targetWeight: 0,
      weeklyGoal: 0,
      exerciseCount: 0,
    }
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('HealthInfoForm', () => {
  it('should render all health options', () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>
    );
    expect(screen.getByText('고혈압')).toBeInTheDocument();
    expect(screen.getByText('해당사항 없음')).toBeInTheDocument();
  });

  it('should allow multiple selections for health conditions', async () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>
    );
    const highBloodPressure = screen.getByText('고혈압');
    const diabetes = screen.getByText('당뇨');

    await userEvent.click(highBloodPressure);
    await userEvent.click(diabetes);

    expect(highBloodPressure).toHaveClass('bg-blue-500');
    expect(diabetes).toHaveClass('bg-blue-500');
  });

  it('should allow selecting "해당사항 없음" for allergies, which deselects others', async () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>
    );
    const nutsAllergy = screen.getByText('견과류');
    const noneAllergy = screen.getByText('해당사항 없음');

    await userEvent.click(nutsAllergy);
    expect(nutsAllergy).toHaveClass('bg-blue-500');

    await userEvent.click(noneAllergy);
    expect(noneAllergy).toHaveClass('bg-blue-500');
    expect(nutsAllergy).not.toHaveClass('bg-blue-500');
  });

  it('should clear "해당사항 없음" when another allergy is selected', async () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>
    );
    const nutsAllergy = screen.getByText('견과류');
    const noneAllergy = screen.getByText('해당사항 없음');

    await userEvent.click(noneAllergy);
    expect(noneAllergy).toHaveClass('bg-blue-500');

    await userEvent.click(nutsAllergy);
    expect(nutsAllergy).toHaveClass('bg-blue-500');
    expect(noneAllergy).not.toHaveClass('bg-blue-500');
  });
});