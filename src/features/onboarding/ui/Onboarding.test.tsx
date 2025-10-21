import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Onboarding from './Onboarding';
import { useOnboardingStore } from '../model/onboarding.store';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Onboarding Component Flow', () => {
  beforeEach(() => {
    // Reset store and mocks before each test
    useOnboardingStore.setState({ currentStep: 0, data: {} });
    mockPush.mockClear();
  });

  it('should progress through the entire onboarding flow and submit the data', async () => {
    const handleSubmit = vi.fn();
    const { debug } = render(<Onboarding onSubmit={handleSubmit} />);

    // Step 1: Basic Info
    await userEvent.type(screen.getByLabelText(/이름/i), '김밥심');
    await userEvent.click(screen.getByLabelText('여성'));
    await userEvent.type(screen.getByLabelText(/생년월일/i), '1995-10-26');
    await userEvent.type(screen.getByLabelText(/키/i), '165');
    await userEvent.type(screen.getByLabelText(/몸무게/i), '55');
    fireEvent.click(screen.getByRole('button', { name: /다음/i }));

    // Step 2: Health Info
    await waitFor(() => {
      expect(screen.getByText(/기저질환/i)).toBeInTheDocument();
    });
    await userEvent.click(screen.getByLabelText('고혈압'));
    fireEvent.click(screen.getByRole('button', { name: /다음/i }));

    // Step 3: Goal Setting
    await waitFor(() => {
      expect(screen.getByText(/체중 관리/i)).toBeInTheDocument();
    });
    await userEvent.click(screen.getByText('체중 관리'));
    await userEvent.type(screen.getByLabelText(/목표 체중/i), '50');
    
    debug(); // Print the DOM

    const startButton = screen.getByRole('button', { name: /시작하기/i });
    await waitFor(() => expect(startButton).toBeEnabled());
    await userEvent.click(startButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: '김밥심',
      gender: 'FEMALE',
      birthdate: '1995-10-26',
      height: 165,
      weight: 55,
      healthConditions: ['고혈압'],
      goalType: 'WEIGHT_MANAGEMENT',
      targetWeight: 50,
    }));
  });
});