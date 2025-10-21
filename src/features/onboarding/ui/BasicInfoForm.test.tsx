import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BasicInfoForm from './BasicInfoForm';

describe('BasicInfoForm', () => {
  describe('Initial Rendering', () => {
    it('should render all input fields and a disabled "Next" button', () => {
      render(<BasicInfoForm />);
      expect(screen.getByLabelText(/이름/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/생년월일/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/키/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/몸무게/i)).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: '여성' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: '남성' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /다음/i })).toBeDisabled();
    });
  });

  describe('Gender Selection Logic', () => {
    it('should select "Female" and deselect "Male" when the "Female" button is clicked', async () => {
      render(<BasicInfoForm />);
      const femaleRadio = screen.getByRole('radio', { name: '여성' });
      const maleRadio = screen.getByRole('radio', { name: '남성' });

      await userEvent.click(femaleRadio);

      expect(femaleRadio).toBeChecked();
      expect(maleRadio).not.toBeChecked();
    });

    it('should select "Male" and deselect "Female" when the "Male" button is clicked after "Female" was selected', async () => {
      render(<BasicInfoForm />);
      const femaleRadio = screen.getByRole('radio', { name: '여성' });
      const maleRadio = screen.getByRole('radio', { name: '남성' });

      await userEvent.click(femaleRadio);
      await userEvent.click(maleRadio);

      expect(maleRadio).toBeChecked();
      expect(femaleRadio).not.toBeChecked();
    });
  });

  describe('Birthdate Auto-formatting', () => {
    it('should automatically format numeric input like "20240919" into "2024-09-19"', async () => {
      render(<BasicInfoForm />);
      const birthdateInput = screen.getByLabelText(/생년월일/i);

      await userEvent.type(birthdateInput, '20240919');

      expect(birthdateInput).toHaveValue('2024-09-19');
    });
  });

  describe('"Next" Button Activation Logic', () => {
    it('should keep the "Next" button disabled if not all required fields are validly filled', async () => {
      render(<BasicInfoForm />);
      const nextButton = screen.getByRole('button', { name: /다음/i });

      await userEvent.type(screen.getByLabelText(/이름/i), '홍길동');
      await userEvent.click(screen.getByRole('radio', { name: '남성' }));

      expect(nextButton).toBeDisabled();
    });

    it('should enable the "Next" button only when all required fields are validly filled', async () => {
      render(<BasicInfoForm />);
      const nextButton = screen.getByRole('button', { name: /다음/i });

      await userEvent.type(screen.getByLabelText(/이름/i), '홍길동');
      await userEvent.click(screen.getByRole('radio', { name: '남성' }));
      await userEvent.type(screen.getByLabelText(/생년월일/i), '2000-01-01');
      await userEvent.type(screen.getByLabelText(/키/i), '170');
      await userEvent.type(screen.getByLabelText(/몸무게/i), '70');

      expect(nextButton).toBeEnabled();
    });
  });

  describe('Validation Error Message Display', () => {
    it('should display an error message below the name input if the name exceeds 30 characters', async () => {
      render(<BasicInfoForm />);
      const nameInput = screen.getByLabelText(/이름/i);

      await userEvent.type(nameInput, 'a'.repeat(31));
      fireEvent.blur(nameInput);

      expect(await screen.findByText('이름은 30자 이하로 입력해주세요.')).toBeInTheDocument();
    });

    it('should remove the error message when the invalid name is corrected', async () => {
      render(<BasicInfoForm />);
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
});
