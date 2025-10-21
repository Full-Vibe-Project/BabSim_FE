import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import HealthInfoForm from './HealthInfoForm';

describe('HealthInfoForm', () => {
  it('should allow multiple selections for allergies', async () => {
    render(<HealthInfoForm />);
    const allergyGroup = screen.getByRole('group', { name: /알러지/i });
    await userEvent.click(within(allergyGroup).getByText('갑각류'));
    await userEvent.click(within(allergyGroup).getByText('견과류'));
    expect(within(allergyGroup).getByText('갑각류')).toHaveClass('bg-blue-500');
    expect(within(allergyGroup).getByText('견과류')).toHaveClass('bg-blue-500');
  });

  it('should clear other selections when "None" is selected for allergies', async () => {
    render(<HealthInfoForm />);
    const allergyGroup = screen.getByRole('group', { name: /알러지/i });
    await userEvent.click(within(allergyGroup).getByText('갑각류'));
    await userEvent.click(within(allergyGroup).getByText('해당사항 없음'));
    expect(within(allergyGroup).getByText('해당사항 없음')).toHaveClass('bg-blue-500');
    expect(within(allergyGroup).getByText('갑각류')).not.toHaveClass('bg-blue-500');
  });

  it('should clear "None" when another allergy is selected', async () => {
    render(<HealthInfoForm />);
    const allergyGroup = screen.getByRole('group', { name: /알러지/i });
    await userEvent.click(within(allergyGroup).getByText('해당사항 없음'));
    await userEvent.click(within(allergyGroup).getByText('갑각류'));
    expect(within(allergyGroup).getByText('갑각류')).toHaveClass('bg-blue-500');
    expect(within(allergyGroup).getByText('해당사항 없음')).not.toHaveClass('bg-blue-500');
  });

  it('should enable the "Next" button when at least one option is selected for each category', async () => {
    render(<HealthInfoForm />);
    const allergyGroup = screen.getByRole('group', { name: /알러지/i });
    const diseaseGroup = screen.getByRole('group', { name: /만성 질환/i });
    const dietGroup = screen.getByRole('group', { name: /식단 선호/i });

    await userEvent.click(within(allergyGroup).getByText('갑각류'));
    await userEvent.click(within(diseaseGroup).getByText('당뇨'));
    await userEvent.click(within(dietGroup).getByText('저탄수화물'));

    await waitFor(() => {
        expect(screen.getByRole('button', { name: /다음/i })).toBeEnabled();
    });
  });
});
