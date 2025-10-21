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
});