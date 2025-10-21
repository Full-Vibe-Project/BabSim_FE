import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    },
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

  it('should display an error message if the name exceeds 30 characters', async () => {
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
    await waitFor(() => {
        expect(screen.queryByText('이름은 30자 이하로 입력해주세요.')).not.toBeInTheDocument();
    });
  });
});