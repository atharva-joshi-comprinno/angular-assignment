import { test, expect } from '@playwright/test';

test.describe('Trainer Profile', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock Pokemon APIs
    await page.route('**/api/v2/pokemon?limit=100', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
          ],
        }),
      });
    });

    await page.route('**/api/v2/pokemon/pikachu', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 25,
          name: 'pikachu',
          sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
          types: [{ type: { name: 'electric' } }]
        })
      });
    });

    // Navigate and catch pokemon
    await page.goto('/');
    await page.fill('input[name="trainerName"]', 'Ash');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalogue');
    await page.locator('app-pokemon-card').first().locator('button:has-text("Catch")').click();
    await page.click('button:has-text("My Profile")');
    await page.waitForURL('**/trainer');
  });

  test('should release caught pokemon', async ({ page }) => {
    // Verify Pokemon is initially there
    await expect(page.locator('.bg-red-100')).toHaveCount(1);
    await expect(page.locator('h2')).toContainText('Caught Pokémon (1)');
    
    // Release the Pokemon
    await page.click('button:has-text("Release")');
    
    // Verify after that Pokemon is removed
    await expect(page.locator('.bg-red-100')).toHaveCount(0);
    await expect(page.locator('h2')).toContainText('Caught Pokémon (0)');
    await expect(page.locator('text=You haven\'t caught any Pokémon yet')).toBeVisible();
  });

  test('should logout and clear session storage', async ({ page }) => {
    // Verify trainer info is loaded
    await expect(page.locator('.text-purple-600')).toContainText('Ash');
    await expect(page.locator('.bg-red-100')).toHaveCount(1);
    
    
    const beforeLogout = await page.evaluate(() => {
      return {
        trainerName: sessionStorage.getItem('trainerName'),
        caughtPokemon: sessionStorage.getItem('caughtPokemon')
      };
    });
    expect(beforeLogout.trainerName).toBe('Ash');
    expect(beforeLogout.caughtPokemon).toContain('pikachu');
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Verify navigation to landing page after logout
    await page.waitForURL('/');
    await expect(page.locator('h1')).toContainText('Pokémon Trainer');
    
    // Verify sessionStorage is cleared
    const afterLogout = await page.evaluate(() => {
      return {
        trainerName: sessionStorage.getItem('trainerName'),
        caughtPokemon: sessionStorage.getItem('caughtPokemon')
      };
    });
    expect(afterLogout.trainerName).toBeNull();
    expect(afterLogout.caughtPokemon).toBeNull();
  });

});
