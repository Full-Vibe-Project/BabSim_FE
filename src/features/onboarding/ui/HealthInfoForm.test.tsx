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
    expect(screen.getByLabelText('고혈압')).toBeInTheDocument();
    expect(screen.getByLabelText('해당사항 없음')).toBeInTheDocument();
  });

  it('should allow multiple selections for health conditions', async () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>
    );
    const highBloodPressure = screen.getByLabelText('고혈압');
    const diabetes = screen.getByLabelText('당뇨');

    await userEvent.click(highBloodPressure);
    await userEvent.click(diabetes);

    expect(highBloodPressure).toBeChecked();
    expect(diabetes).toBeChecked();
  });
});