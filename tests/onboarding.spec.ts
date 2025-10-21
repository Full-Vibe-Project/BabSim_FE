import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should allow a user to complete the entire onboarding flow and be redirected to the personalized dashboard', async ({ page }) => {
    // 1. Navigate to the first step
    await page.goto('/onboarding/profile');

    // 2. Check initial state
    await expect(page.getByRole('button', { name: /다음/i })).toBeDisabled();

    // 3-6. Fill out the form
    await page.getByLabelText(/이름/i).fill('김밥심');
    await page.getByLabelText('여성').click();
    await page.getByLabelText(/생년월일/i).fill('1995-10-26');
    await page.getByLabelText(/키/i).fill('165');
    await page.getByLabelText(/몸무게/i).fill('55');

    // 7. Check if the button is enabled
    await expect(page.getByRole('button', { name: /다음/i })).toBeEnabled();

    // 8. Click next
    await page.getByRole('button', { name: /다음/i }).click();

    // 9. Check for navigation
    await expect(page).toHaveURL('/onboarding/health-info');

    // 10. Check initial state of the second step
    await expect(page.getByRole('button', { name: /다음/i })).toBeEnabled();

    // 11. Select health conditions
    await page.getByLabelText('고혈압').click();

    // 12. Select allergies
    await page.getByLabelText('해당사항 없음').click();

    // 13. Click next
    await page.getByRole('button', { name: /다음/i }).click();

    // 14. Check for navigation
    await expect(page).toHaveURL('/onboarding/goals');

    // 15. Check initial state of the third step
    await expect(page.getByRole('button', { name: /시작하기/i })).toBeDisabled();

    // 16. Select goal type
    await page.getByText('체중 관리').click();

    // 17. Check if target weight is enabled
    await expect(page.getByLabelText(/목표 체중/i)).toBeEnabled();

    // 18. Fill target weight
    await page.getByLabelText(/목표 체중/i).fill('50');

    // 19. Select goal period
    await page.getByLabelText(/목표 기간/i).selectOption({ label: '3개월' });

    // 20. Fill weekly exercise
    await page.getByLabelText(/주간 운동 횟수/i).fill('3');

    // 21. Check if the button is enabled
    await expect(page.getByRole('button', { name: /시작하기/i })).toBeEnabled();

    // 22. Click start
    await page.getByRole('button', { name: /시작하기/i }).click();

    // 23. Check for redirection
    await expect(page).toHaveURL('/dashboard');

    // 24. Check for welcome message
    await expect(page.getByText('김밥심님, 환영합니다!')).toBeVisible();
  });

  test('should display an error message on the final step if the server submission fails', async ({ page }) => {
    // Mock the API route to return a 500 error
    await page.route('/api/onboarding/submit', route => {
      route.fulfill({ status: 500, body: 'Internal Server Error' });
    });

    // 1-22. Complete the form until the final step
    await page.goto('/onboarding/profile');
    await page.getByLabelText(/이름/i).fill('김밥심');
    await page.getByLabelText('여성').click();
    await page.getByLabelText(/생년월일/i).fill('1995-10-26');
    await page.getByLabelText(/키/i).fill('165');
    await page.getByLabelText(/몸무게/i).fill('55');
    await page.getByRole('button', { name: /다음/i }).click();
    await page.getByLabelText('고혈압').click();
    await page.getByLabelText('해당사항 없음').click();
    await page.getByRole('button', { name: /다음/i }).click();
    await page.getByText('체중 관리').click();
    await page.getByLabelText(/목표 체중/i).fill('50');
    await page.getByLabelText(/목표 기간/i).selectOption({ label: '3개월' });
    await page.getByLabelText(/주간 운동 횟수/i).fill('3');
    await page.getByRole('button', { name: /시작하기/i }).click();

    // 23. Assert that the URL has not changed
    await expect(page).toHaveURL('/onboarding/goals');

    // 24. Assert that an error message is displayed
    await expect(page.getByText('정보 저장에 실패했습니다. 잠시 후 다시 시도해주세요.')).toBeVisible();
  });
});
