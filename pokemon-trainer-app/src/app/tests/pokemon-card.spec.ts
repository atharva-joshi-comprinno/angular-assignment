import { test, expect } from '@playwright/test';

test.describe('Pokemon Card Component UI', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock Pokemon API for component testing
    await page.route('**/api/v2/pokemon?limit=100', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }]
        })
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

    // Navigate to catalogue to see pokemon cards
    await page.goto('/');
    await page.fill('input[name="trainerName"]', 'TestTrainer');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalogue');
  });

  test('should display pokemon image and name', async ({ page }) => {
    const pokemonCard = page.locator('app-pokemon-card').first();
    
    // Check image and name are visible
    await expect(pokemonCard.locator('img')).toBeVisible();
    await expect(pokemonCard.locator('h3')).toContainText('Pikachu');
  });

  test('should show "Catch" button when pokemon not caught', async ({ page }) => {
    const pokemonCard = page.locator('app-pokemon-card').first();
    
    // Check catch button is visible and enabled
    await expect(pokemonCard.locator('button:has-text("Catch")')).toBeVisible();
    await expect(pokemonCard.locator('button:has-text("Catch")')).toBeEnabled();
  });

  test('should show "Caught" button when pokemon is caught', async ({ page }) => {
    const pokemonCard = page.locator('app-pokemon-card').first();
    
    // Catch the pokemon
    await pokemonCard.locator('button:has-text("Catch")').click();
    
    // Check button changes to "Caught" and is disabled
    await expect(pokemonCard.locator('button:has-text("Caught")')).toBeVisible();
    await expect(pokemonCard.locator('button:has-text("Caught")')).toBeDisabled();
  });

});
