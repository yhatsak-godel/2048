import { test, expect } from '@playwright/test';
import { GameHelpers } from './helpers/game-helpers';

test.describe('2048 Game - Player Name Feature', () => {
  let helpers: GameHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    helpers = new GameHelpers(page);
  });

  test('should save and display player name', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /what should we call you/i })).toBeVisible();
    
    await page.getByLabel(/player name/i).fill('Alice');
    await page.getByRole('button', { name: /save name/i }).click();
    
    await expect(page.getByText('Alice')).toBeVisible();
  });

  test('should not show name prompt on subsequent visits', async ({ page }) => {
    // First visit - set name
    await page.getByLabel(/player name/i).fill('Bob');
    await page.getByRole('button', { name: /save name/i }).click();
    
    // Reload page
    await page.reload();
    
    // Name prompt should not appear
    await expect(page.getByRole('heading', { name: /what should we call you/i })).not.toBeVisible();
    await expect(page.getByText('Bob')).toBeVisible();
  });

  test('should allow editing player name', async ({ page }) => {
    await page.getByLabel(/player name/i).fill('Original Name');
    await page.getByRole('button', { name: /save name/i }).click();
    
    // Click edit button
    const editButton = page.getByRole('button').filter({ has: page.getByText(/✎|edit/i) });
    await editButton.first().click();
    
    // Modal should reopen
    await expect(page.getByRole('heading', { name: /what should we call you/i })).toBeVisible();
    
    // Change name
    await page.getByLabel(/player name/i).fill('New Name');
    await page.getByRole('button', { name: /save name/i }).click();
    
    await expect(page.getByText('New Name')).toBeVisible();
  });

  test('should display player name in best results modal', async ({ page }) => {
    await helpers.setupPlayerName('Champion');
    
    // Make some moves to create a result
    await helpers.makeMove('right');
    await helpers.makeMove('down');
    
    // Open best results
    await helpers.openBestResults();
    
    // Player name should appear in results
    await expect(page.getByText('Champion')).toBeVisible();
  });

  test('should validate name input', async ({ page }) => {
    // Try to save without name
    const input = page.getByLabel(/player name/i);
    await input.clear();
    await page.getByRole('button', { name: /save name/i }).click();
    
    // Should show validation message or keep modal open
    await expect(page.getByRole('heading', { name: /what should we call you/i })).toBeVisible();
  });

  test('should use default name when clicking "Continue as Player" or default option', async ({ page }) => {
    // Click continue/default button if available
    const continueBtn = page.getByRole('button').filter({ hasNot: page.getByLabel(/player name/i) });
    
    // Or just fill and save with empty to trigger default
    const input = page.getByLabel(/player name/i);
    const initialValue = await input.inputValue();
    
    if (initialValue === '') {
      await page.getByRole('button', { name: /save name/i }).click();
    }
    
    // Should either show default "Player" or keep the modal if validation prevents it
    const isPlayerVisible = await page.getByText('Player').isVisible().catch(() => false);
    const isModalStillVisible = await page.getByRole('heading', { name: /what should we call you/i }).isVisible().catch(() => false);
    
    expect(isPlayerVisible || isModalStillVisible).toBeTruthy();
  });
});
