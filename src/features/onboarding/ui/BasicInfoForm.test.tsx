import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import BasicInfoForm from './BasicInfoForm';
import { onboardingSchema, OnboardingData } from '../model/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      gender: undefined,
      birthdate: '',
      height: 0,
      weight: 0,
      healthConditions: { allergies: [], chronicDiseases: [], dietPreferences: [] },
      goalType: 'WEIGHT_MANAGEMENT',
      currentWeight: 0,
      targetWeight: 0,
      weeklyGoal: 0,
      exerciseCount: 0,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('BasicInfoForm', () => {
  it('should render all input fields', () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>,
    );
    expect(screen.getByLabelText(/이름/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/생년월일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/키/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/몸무게/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '여성' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '남성' })).toBeInTheDocument();
  });

  it('should select "Female" and deselect "Male" when the "Female" button is clicked', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>,
    );
    const femaleButton = screen.getByRole('button', { name: '여성' });
    const maleButton = screen.getByRole('button', { name: '남성' });

    await userEvent.click(femaleButton);

    expect(femaleButton).toHaveClass('bg-custom-brown-light text-white');
    expect(maleButton).not.toHaveClass('bg-custom-brown-light text-white');
  });

  it('should select "Male" and deselect "Female" when the "Male" button is clicked after "Female" was selected', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>,
    );
    const femaleButton = screen.getByRole('button', { name: '여성' });
    const maleButton = screen.getByRole('button', { name: '남성' });

    await userEvent.click(femaleButton);
    await userEvent.click(maleButton);

    expect(maleButton).toHaveClass('bg-custom-brown-light text-white');
    expect(femaleButton).not.toHaveClass('bg-custom-brown-light text-white');
  });

  it('should automatically format numeric input like "20240919" into "2024-09-19"', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>,
    );
    const birthdateInput = screen.getByLabelText(/생년월일/i);

    await userEvent.type(birthdateInput, '20240919');

    expect(birthdateInput).toHaveValue('2024-09-19');
  });

  it('should display an error message below the name input if the name exceeds 30 characters', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>,
    );
    const nameInput = screen.getByLabelText(/이름/i);

    await userEvent.type(nameInput, 'a'.repeat(31));
    await userEvent.tab(); // blur

    expect(await screen.findByText('이름은 30자 이하로 입력해주세요.')).toBeInTheDocument();
  });

  it('should remove the error message when the invalid name is corrected', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>,
    );
    const nameInput = screen.getByLabelText(/이름/i);

    await user.type(nameInput, 'a'.repeat(31));
    await user.tab();

    const errorMessage = await screen.findByText('이름은 30자 이하로 입력해주세요.');
    expect(errorMessage).toBeInTheDocument();

    await user.clear(nameInput);
    await user.type(nameInput, '홍길동');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText('이름은 30자 이하로 입력해주세요.')).not.toBeInTheDocument();
    });
  });
});