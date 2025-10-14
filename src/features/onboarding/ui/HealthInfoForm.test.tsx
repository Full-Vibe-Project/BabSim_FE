import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import HealthInfoForm from './HealthInfoForm';

describe('HealthInfoForm', () => {
  it('should allow multiple selections for allergies', async () => {
    render(<HealthInfoForm />);
    await userEvent.click(screen.getByText('갑각류'));
    await userEvent.click(screen.getByText('견과류'));
    expect(screen.getByText('갑각류')).toHaveClass('bg-blue-500');
    expect(screen.getByText('견과류')).toHaveClass('bg-blue-500');
  });

  it('should clear other selections when "None" is selected for allergies', async () => {
    render(<HealthInfoForm />);
    await userEvent.click(screen.getByText('갑각류'));
    await userEvent.click(screen.getByText('해당사항 없음'));
    expect(screen.getByText('해당사항 없음')).toHaveClass('bg-blue-500');
    expect(screen.getByText('갑각류')).not.toHaveClass('bg-blue-500');
  });

  it('should clear "None" when another allergy is selected', async () => {
    render(<HealthInfoForm />);
    await userEvent.click(screen.getByText('해당사항 없음'));
    await userEvent.click(screen.getByText('갑각류'));
    expect(screen.getByText('갑각류')).toHaveClass('bg-blue-500');
    expect(screen.getByText('해당사항 없음')).not.toHaveClass('bg-blue-500');
  });

  it('should enable the "Next" button when at least one option is selected for each category', async () => {
    render(<HealthInfoForm />);
    await userEvent.click(screen.getByText('갑각류'));
    await userEvent.click(screen.getByText('당뇨'));
    await userEvent.click(screen.getByText('저탄수화물'));
    await waitFor(() => {
        expect(screen.getByRole('button', { name: /다음/i })).toBeEnabled();
    });
  });
});
