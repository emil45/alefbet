import { test, expect } from '@playwright/test';

// Skip the first-visit modal for all tests
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('lepdy_start_here_completed', new Date().toISOString());
  });
});

test.describe('Homepage', () => {
  test('loads with category buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('button:has-text("אותיות")')).toBeVisible();
    await expect(page.locator('button:has-text("משחקים")')).toBeVisible();
  });
});

test.describe('Category pages load', () => {
  const categories = ['letters', 'numbers', 'colors', 'shapes', 'animals', 'food'];
  for (const category of categories) {
    test(`${category} page loads`, async ({ page }) => {
      await page.goto(`/${category}`);
      // All category pages have a heading
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }
});

test.describe('Games page', () => {
  test('loads with game buttons', async ({ page }) => {
    await page.goto('/games');
    await expect(page.locator('button').first()).toBeVisible();
  });
});

test.describe('Game pages load', () => {
  const games = ['simon-game', 'guess-game', 'letter-rain', 'memory-match-game', 'speed-challenge', 'word-builder', 'sound-matching'];
  for (const game of games) {
    test(`${game} page loads`, async ({ page }) => {
      await page.goto(`/games/${game}`);
      await expect(page.locator('button').first()).toBeVisible();
    });
  }
});

test.describe('Info pages load', () => {
  const pages = ['learn', 'about', 'safety', 'contact'];
  for (const p of pages) {
    test(`${p} page loads`, async ({ page }) => {
      await page.goto(`/${p}`);
      await expect(page.locator('body')).not.toBeEmpty();
    });
  }
});

test.describe('Navigation', () => {
  test('can navigate to letters and back', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("אותיות")').click();
    await expect(page).toHaveURL(/\/letters/);
  });
});

test.describe('Locales', () => {
  test('English locale works', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('button:has-text("Letters")')).toBeVisible();
  });

  test('Russian locale works', async ({ page }) => {
    await page.goto('/ru');
    await expect(page.locator('button:has-text("буквы")')).toBeVisible();
  });
});
