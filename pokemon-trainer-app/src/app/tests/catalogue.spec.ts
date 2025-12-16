import { test, expect } from '@playwright/test';

test.describe('Pokemon Catalogue', () => {
  test('should load pokemon catalogue after entering trainer name', async ({ page }) => {
    await page.route('**/api/v2/pokemon?limit=100', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
          ],
        }),
      });
    });

    // landing page
    await page.goto('/');

    //Enter name
    await page.fill('input[name="trainerName"]', 'Ash');

    //Click btn
    await page.click('button[type="submit"]');

    //Verify Navigation to catalogue
    await page.waitForURL('**/catalogue');

    //Verfiy there should be 2 pokemon cards
    await expect(page.locator('app-pokemon-card')).toHaveCount(2);
  });

  test('should display catalogue page title and My Profile button', async ({ page }) => {
    await page.route('**/api/v2/pokemon?limit=100', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
        }),
      });
    });

    await page.goto('/');
    await page.fill('input[name="trainerName"]', 'Ash');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalogue');

    // Check page title
    await expect(page.locator('h1')).toContainText('Pokémon Catalogue');

    // Check if My Profile button exists
    await expect(page.locator('button:has-text("My Profile")')).toBeVisible();
  });

  test('should navigate to trainer profile when My Profile clicked', async ({ page }) => {
    await page.route('**/api/v2/pokemon?limit=100', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
        }),
      });
    });

    await page.goto('/');
    await page.fill('input[name="trainerName"]', 'Ash');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalogue');

    // Click My Profile button
    await page.click('button:has-text("My Profile")');

    // Verify navigation to trainer page
    await expect(page).toHaveURL(/.*trainer/);
  });
});
