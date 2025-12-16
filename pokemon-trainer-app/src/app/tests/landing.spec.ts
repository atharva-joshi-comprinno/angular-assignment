import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PokemonTrainerApp/);
});

test('should enter name and navigate to catalogue', async ({ page }) => {
  await page.goto('/');

  await page.fill('input[name="trainerName"]', 'Ash');

  //Click btn
  await page.click('button[type="submit"]');

  //Verify Navigation to catalogue
  await expect(page).toHaveURL(/.*catalogue/);
});
