import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import Onboarding from './Onboarding';
import { useOnboardingStore } from '../model/onboarding.store';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Onboarding Component', () => {
  beforeEach(() => {
    useOnboardingStore.setState({ currentStep: 0, data: {} });
  });

  it('(AC-1) should render the BasicInfoForm component for the initial step (step 1)', () => {
    render(
        <Onboarding onSubmit={vi.fn()} />
    );
    expect(screen.getByText(/이름/i)).toBeInTheDocument();
    expect(screen.queryByText(/기저질환/i)).not.toBeInTheDocument();
  });

  it('(AC-3) should navigate from BasicInfoForm to HealthInfoForm when "Next" is clicked with valid data', async () => {
    render(
        <Onboarding onSubmit={vi.fn()} />
    );
    await userEvent.type(screen.getByLabelText(/이름/i), '김밥심');
    await userEvent.click(screen.getByLabelText('여성'));
    await userEvent.type(screen.getByLabelText(/생년월일/i), '1995-10-26');
    await userEvent.type(screen.getByLabelText(/키/i), '165');
    await userEvent.type(screen.getByLabelText(/몸무게/i), '55');

    await userEvent.click(screen.getByRole('button', { name: /다음/i }));

    await waitFor(() => {
        expect(screen.getByText(/기저질환/i)).toBeInTheDocument();
    });
  });

  it('(AC-4) should persist the data of BasicInfoForm when navigating back from HealthInfoForm', async () => {
    render(
        <Onboarding onSubmit={vi.fn()} />
    );
    const nameInput = screen.getByLabelText(/이름/i);
    await userEvent.type(nameInput, '김밥심');
    await userEvent.click(screen.getByRole('button', { name: /다음/i }));
    await waitFor(() => expect(screen.getByText(/기저질환/i)).toBeInTheDocument());
    await userEvent.click(screen.getByRole('button', { name: /이전/i }));
    await waitFor(() => expect(screen.getByLabelText(/이름/i)).toHaveValue('김밥심'));
  });

  it('(AC-5) should call the final onSubmit function with all aggregated data from all steps', async () => {
    const mockOnSubmit = vi.fn();
    render(
        <Onboarding onSubmit={mockOnSubmit} />
    );

    // Step 1
    await userEvent.type(screen.getByLabelText(/이름/i), '김밥심');
    await userEvent.click(screen.getByLabelText('여성'));
    await userEvent.type(screen.getByLabelText(/생년월일/i), '1995-10-26');
    await userEvent.type(screen.getByLabelText(/키/i), '165');
    await userEvent.type(screen.getByLabelText(/몸무게/i), '55');
    await userEvent.click(screen.getByRole('button', { name: /다음/i }));

    // Step 2
    await waitFor(() => expect(screen.getByText(/기저질환/i)).toBeInTheDocument());
    await userEvent.click(screen.getByLabelText('고혈압'));
    await userEvent.click(screen.getByRole('button', { name: /다음/i }));

    // Step 3
    await waitFor(() => expect(screen.getByText(/목표 유형/i)).toBeInTheDocument());
    await userEvent.click(screen.getByText('체중 관리'));
    await userEvent.type(screen.getByLabelText(/목표 체중/i), '50');
    await userEvent.selectOptions(screen.getByLabelText(/주간 목표/i), '500');
    await userEvent.type(screen.getByLabelText(/주간 운동 횟수/i), '3');
    await userEvent.click(screen.getByRole('button', { name: /시작하기/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
        name: '김밥심',
        gender: 'FEMALE',
        healthConditions: ['고혈압'],
        targetWeight: 50,
      }));
    });
  });
});