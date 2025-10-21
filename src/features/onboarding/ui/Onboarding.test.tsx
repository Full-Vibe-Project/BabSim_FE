import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import Onboarding from './Onboarding';
import { useOnboardingStore } from '../model/onboarding.store';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';

// Mock child components
vi.mock('./BasicInfoForm', () => ({ default: () => <div>BasicInfoForm</div> }));
vi.mock('./HealthInfoForm', () => ({ default: () => <div>HealthInfoForm</div> }));
vi.mock('./GoalSettingForm', () => ({ default: () => <div>GoalSettingForm</div> }));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Onboarding Component', () => {
  beforeEach(() => {
    // Reset store before each test
    useOnboardingStore.setState({ currentStep: 0, data: {} });
  });

  it('(AC-1) should render the BasicInfoForm component for the initial step (step 1)', () => {
    render(
      <TestWrapper>
        <Onboarding onSubmit={vi.fn()} />
      </TestWrapper>
    );
    expect(screen.getByText('BasicInfoForm')).toBeInTheDocument();
    expect(screen.queryByText('HealthInfoForm')).not.toBeInTheDocument();
  });

  it('(AC-1) should render the HealthInfoForm component for the second step (step 2)', async () => {
    useOnboardingStore.setState({ currentStep: 1 });
    render(
      <TestWrapper>
        <Onboarding onSubmit={vi.fn()} />
      </TestWrapper>
    );
    expect(screen.getByText('HealthInfoForm')).toBeInTheDocument();
  });

  it('(AC-1) should render the GoalSettingForm component for the third step (step 3)', async () => {
    useOnboardingStore.setState({ currentStep: 2 });
    render(
      <TestWrapper>
        <Onboarding onSubmit={vi.fn()} />
      </TestWrapper>
    );
    expect(screen.getByText('GoalSettingForm')).toBeInTheDocument();
  });

  // More tests would be needed here to fully test navigation and validation logic
  // but that requires more complex mocking of the child forms and their interactions.
});