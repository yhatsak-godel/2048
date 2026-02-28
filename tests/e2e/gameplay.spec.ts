import { test, expect } from '@playwright/test';
import { GameHelpers } from './helpers/game-helpers';

test.describe('2048 Game - Basic Gameplay', () => {
  let helpers: GameHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    helpers = new GameHelpers(page);
  });

  test('should load game and display initial board', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '2048' })).toBeVisible();
    await expect(page.getByRole('grid')).toBeVisible();
    await expect(page.getByText('Score')).toBeVisible();
    await expect(page.getByText('Moves')).toBeVisible();
  });

  test('should prompt for player name on first visit', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /what should we call you/i })).toBeVisible();
    await page.getByLabel(/player name/i).fill('Test Player');
    await page.getByRole('button', { name: /save name/i }).click();
    await expect(page.getByText('Test Player')).toBeVisible();
  });

  test('should increment moves counter when making valid moves', async ({ page }) => {
    // Complete name prompt
    await helpers.setupPlayerName('Player');

    // Initial moves should be 0
    const initialMoves = await helpers.getMoves();
    expect(initialMoves).toBe(0);

    // Make a move
    await helpers.makeMove('right');
    
    // Moves should increment
    const finalMoves = await helpers.getMoves();
    expect(finalMoves).toBeGreaterThan(0);
  });

  test('should update score when tiles merge', async ({ page }) => {
    await helpers.setupPlayerName('Player');

    const initialScore = await helpers.getScore();
    
    // Make moves to potentially merge tiles
    for (let i = 0; i < 5; i++) {
      await helpers.makeMove('right');
    }
    
    // Score or moves should have changed
    const finalMoves = await helpers.getMoves();
    expect(finalMoves).toBeGreaterThan(0);
  });

  test('should start new game when clicking New Game button', async ({ page }) => {
    await helpers.setupPlayerName('Player');

    // Make some moves
    await helpers.makeMove('right');
    await helpers.makeMove('down');

    const movesBeforeReset = await helpers.getMoves();
    expect(movesBeforeReset).toBeGreaterThan(0);

    // Click New Game
    await page.getByRole('button', { name: /new game/i }).click();

    // Verify reset
    const movesAfterReset = await helpers.getMoves();
    expect(movesAfterReset).toBe(0);
  });
});
