import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/reviews');
  // 네트워크 활동이 없을 때까지 기다림 (데이터 로딩 포함)
  await page.waitForLoadState('networkidle');
});

// 페이지 정상 로드 확인
test('render title, score and reviews', async ({ page }) => {
  // Head 타이틀 확인
  await expect(page.locator('h2')).toContainText('모든 리뷰');

  // Score 데이터가 최초 3.7인지 확인
  expect(page.getByTestId('average-score')).toHaveText('3.7');

  // 최초 리뷰 데이터가 10개인지 확인 (서버사이드로 렌더링 된 데이터)
  expect(page.getByTestId('review-item')).toHaveCount(10);
});

// 탭, 칩 클릭 시 데이터 변경 확인
test('change score data when clicked tab or chip', async ({ page }) => {
  // 워케이션 탭으로 변경, 스코어 데이터가 5인지 확인
  await page.click('[data-testid="tab-WORKATION"]');
  const workationScore = page.getByTestId('average-score');
  await workationScore.waitFor();
  expect(workationScore).toHaveText('5');

  // 달램핏 탭으로 변경, 스코어 데이터가 3.7인지 확인
  await page.click('[data-testid="tab-DALLAEMFIT"]');
  const dallaemfitScore = page.getByTestId('average-score');
  await dallaemfitScore.waitFor();
  expect(dallaemfitScore).toHaveText('3.7');

  // 오피스 스트레칭 칩으로 변경, 스코어 데이터가 3.5인지 확인
  await page.locator('span').getByText('오피스 스트레칭').click();
  const officeStretchingScore = page.getByTestId('average-score');
  await officeStretchingScore.waitFor();
  expect(officeStretchingScore).toHaveText('3.5');

  // 마인드풀니스 칩으로 변경, 스코어 데이터가 5인지 확인
  await page.locator('span').getByText('마인드풀니스').click();
  const mindfulnessScore = page.getByTestId('average-score');
  await mindfulnessScore.waitFor();
  expect(mindfulnessScore).toHaveText('5');

  // 전체 칩으로 변경, 스코어 데이터가 3.7인지 확인
  await page.locator('span').getByText('전체').click();
  const allScore = page.getByTestId('average-score');
  await allScore.waitFor();
  expect(allScore).toHaveText('3.7');
});

// 지역 필터링 확인
// 현재 목데이터는 전부 건대입구 이기 때문에, 건대입구 필터링 시 10개, 다른 아이템은 0개가 되어야 함
test('filter reviews by location', async ({ page }) => {
  // 건대입구 필터링 시 리뷰 아이템이 10개인지 확인
  await page.getByTestId('filter-component').getByText('지역 전체').click();
  const filterOptions1 = page.locator('span').getByText('건대입구');
  await filterOptions1.waitFor();
  await filterOptions1.click();

  expect(page.getByTestId('review-item')).toHaveCount(10);

  // 신림 필터링 시 리뷰 아이템이 0개인지 확인
  await page.getByTestId('filter-component').getByText('건대입구').click();
  const filterOptions2 = page.locator('span').getByText('신림');
  await filterOptions2.waitFor();
  await filterOptions2.click();

  expect(page.getByTestId('review-item')).toHaveCount(0);
});

// 무한스크롤 테스트
test('infinite scroll', async ({ page }) => {
  // 리뷰 아이템이 10개인지 확인
  expect(page.getByTestId('review-item')).toHaveCount(10);

  // 스크롤 이벤트
  await page.getByTestId('hasMoreRef').scrollIntoViewIfNeeded();

  // 추가로 10개의 리뷰 아이템이 렌더링 되었는지 확인
  await page.waitForSelector('[data-testid="review-item"]:nth-child(20)');
  expect(page.getByTestId('review-item')).toHaveCount(20);
});

// 리뷰 아이템 클릭 시 상세 페이지로 이동 확인
test('move to detail page when clicked review item', async ({ page }) => {
  // 첫번째 리뷰 아이템 클릭 ( Gathering.id = 1 )
  await page.getByTestId('review-item').first().click();

  // 상세 페이지로 이동되었는지 확인
  await page.waitForURL(/gatherings\/1/);
});
