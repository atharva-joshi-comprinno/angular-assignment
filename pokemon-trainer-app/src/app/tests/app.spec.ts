import { test, expect } from '@playwright/test';

test.describe('Pokemon Trainer E2E Flow', () => {
  test('End to End test', async ({ page }) => {
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
    // Mock individual Pokemon details
    await page.route('**/api/v2/pokemon/pikachu', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 25,
          name: 'pikachu',
          sprites: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          },
          types: [{ type: { name: 'electric' } }],
        }),
      });
    });

    await page.route('**/api/v2/pokemon/charizard', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 6,
          name: 'charizard',
          sprites: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
          },
          types: [{ type: { name: 'fire' } }],
        }),
      });
    });
    await page.goto('/');

    await page.fill('input[name="trainerName"]', 'Ash');

    await page.click('button[type="submit"]');

    await page.waitForURL('**/catalogue');

    await expect(page.locator('app-pokemon-card')).toHaveCount(2);

    // Catching pokemon
    await page.locator('app-pokemon-card').first().locator('button:has-text("Catch")').click();

    await page.click('button:has-text("My Profile")');
    await page.waitForURL('**/trainer');

    // Verify caught Pokemon in trainer page
    await expect(page.locator('.bg-red-100')).toHaveCount(1);
    //  await expect(page.locator('img[alt="pikachu"]')).toBeVisible();
  });
});
