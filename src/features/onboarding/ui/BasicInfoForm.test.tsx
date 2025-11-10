import { render, screen, fireEvent } from '@testing-library/react';
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
    }
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('BasicInfoForm', () => {
  it('should render all input fields', () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>
    );
    expect(screen.getByLabelText(/이름/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/생년월일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/키/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/몸무게/i)).toBeInTheDocument();
    expect(screen.getByLabelText('여성')).toBeInTheDocument();
    expect(screen.getByLabelText('남성')).toBeInTheDocument();
  });

  it('should select "Female" and deselect "Male" when the "Female" button is clicked', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>
    );
    const femaleRadio = screen.getByLabelText('여성');
    const maleRadio = screen.getByLabelText('남성');

    await userEvent.click(femaleRadio);

    expect(femaleRadio).toBeChecked();
    expect(maleRadio).not.toBeChecked();
  });

  it('should select "Male" and deselect "Female" when the "Male" button is clicked after "Female" was selected', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>
    );
    const femaleRadio = screen.getByLabelText('여성');
    const maleRadio = screen.getByLabelText('남성');

    await userEvent.click(femaleRadio);
    await userEvent.click(maleRadio);

    expect(maleRadio).toBeChecked();
    expect(femaleRadio).not.toBeChecked();
  });

  it('should automatically format numeric input like "20240919" into "2024-09-19"', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>
    );
    const birthdateInput = screen.getByLabelText(/생년월일/i);

    await userEvent.type(birthdateInput, '20240919');

    expect(birthdateInput).toHaveValue('2024-09-19');
  });

  it('should display an error message below the name input if the name exceeds 30 characters', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>
    );
    const nameInput = screen.getByLabelText(/이름/i);

    await userEvent.type(nameInput, 'a'.repeat(31));
    fireEvent.blur(nameInput);

    expect(await screen.findByText('이름은 30자 이하로 입력해주세요.')).toBeInTheDocument();
  });

  it('should remove the error message when the invalid name is corrected', async () => {
    render(
      <TestWrapper>
        <BasicInfoForm />
      </TestWrapper>
    );
    const nameInput = screen.getByLabelText(/이름/i);

    await userEvent.type(nameInput, 'a'.repeat(31));
    fireEvent.blur(nameInput);

    expect(await screen.findByText('이름은 30자 이하로 입력해주세요.')).toBeInTheDocument();

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '홍길동');
    fireEvent.blur(nameInput);

    expect(screen.queryByText('이름은 30자 이하로 입력해주세요.')).not.toBeInTheDocument();
  });
});