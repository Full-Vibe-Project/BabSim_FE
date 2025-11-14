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
        chronicDiseases: [],
        allergies: [],
        medication: '',
        ...defaultValues.healthConditions,
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
      <form onSubmit={methods.handleSubmit(vi.fn())}>{children}</form>
    </FormProvider>
  );
};

describe('HealthInfoForm', () => {
  const getLabelFor = (checkbox: HTMLElement) => checkbox.closest('label') as HTMLElement;

  it('should allow checking multiple condition checkboxes simultaneously', async () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>,
    );
    const chronicDiseaseGroup = screen.getByText('기저질환').closest('div.space-y-4') as HTMLElement;
    const diabetesCheckbox = within(chronicDiseaseGroup).getByRole('checkbox', { name: '당뇨병', hidden: true });
    const hypertensionCheckbox = within(chronicDiseaseGroup).getByRole('checkbox', { name: '고혈압', hidden: true });

    await userEvent.click(diabetesCheckbox);
    await userEvent.click(hypertensionCheckbox);

    expect(getLabelFor(diabetesCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');
    expect(getLabelFor(hypertensionCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');
  });

  it('should uncheck all other condition checkboxes when "Not Applicable" is checked', async () => {
    render(
      <TestWrapper
        defaultValues={{
          healthConditions: { allergies: ['견과류', '갑각류'], chronicDiseases: [], medication: '' },
        }}
      >
        <HealthInfoForm />
      </TestWrapper>,
    );

    const allergyGroup = screen.getByText('식품 알레르기').closest('div.space-y-4') as HTMLElement;
    const nutsCheckbox = within(allergyGroup).getByRole('checkbox', { name: '견과류', hidden: true });
    const shellfishCheckbox = within(allergyGroup).getByRole('checkbox', { name: '갑각류', hidden: true });
    const noneCheckbox = within(allergyGroup).getByRole('checkbox', { name: '해당사항 없음', hidden: true });

    expect(getLabelFor(nutsCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');
    expect(getLabelFor(shellfishCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');

    await userEvent.click(noneCheckbox);

    expect(getLabelFor(noneCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');
    expect(getLabelFor(nutsCheckbox)).not.toHaveClass('ring-2 ring-custom-brown-dark');
    expect(getLabelFor(shellfishCheckbox)).not.toHaveClass('ring-2 ring-custom-brown-dark');
  });

  it('should uncheck "Not Applicable" when any other condition is checked', async () => {
    render(
      <TestWrapper
        defaultValues={{
          healthConditions: { allergies: ['해당사항 없음'], chronicDiseases: [], medication: '' },
        }}
      >
        <HealthInfoForm />
      </TestWrapper>,
    );

    const allergyGroup = screen.getByText('식품 알레르기').closest('div.space-y-4') as HTMLElement;
    const noneCheckbox = within(allergyGroup).getByRole('checkbox', { name: '해당사항 없음', hidden: true });
    const nutsCheckbox = within(allergyGroup).getByRole('checkbox', { name: '견과류', hidden: true });

    expect(getLabelFor(noneCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');

    await userEvent.click(nutsCheckbox);

    expect(getLabelFor(nutsCheckbox)).toHaveClass('ring-2 ring-custom-brown-dark');
    expect(getLabelFor(noneCheckbox)).not.toHaveClass('ring-2 ring-custom-brown-dark');
  });

  it('should allow user to type in the medication textarea', async () => {
    render(
      <TestWrapper>
        <HealthInfoForm />
      </TestWrapper>,
    );
    const medicationTextarea = screen.getByPlaceholderText('복용 중인 약이나 영양제가 있다면 입력해주세요 (선택사항)');
    await userEvent.type(medicationTextarea, '아스피린 100mg');
    expect(medicationTextarea).toHaveValue('아스피린 100mg');
  });
});