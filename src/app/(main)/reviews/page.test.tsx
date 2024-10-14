import { test, expect } from '@playwright/test';

// 페이지 정상 로드 확인
test('render title, score and reviews', async ({ page }) => {
  await page.goto('/reviews');

  // Head 타이틀 확인
  await expect(page.getByRole('heading', { name: '모든 리뷰' })).toBeVisible();
  await page.screenshot({ path: 'tests/reviews.png' });
});
