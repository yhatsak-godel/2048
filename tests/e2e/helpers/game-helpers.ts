import { Page } from '@playwright/test';

/**
 * Helper utilities for 2048 game E2E tests
 */
export class GameHelpers {
  constructor(private page: Page) {}

  /**
   * Sets up player name in the game
   */
  async setupPlayerName(name: string = 'Test Player') {
    await this.page.getByLabel(/player name/i).fill(name);
    await this.page.getByRole('button', { name: /save name/i }).click();
  }

  /**
   * Makes a game move in specified direction
   */
  async makeMove(direction: 'up' | 'down' | 'left' | 'right') {
    const keyMap = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    };
    await this.page.keyboard.press(keyMap[direction]);
  }

  /**
   * Gets the current move count
   */
  async getMoves(): Promise<number> {
    const text = await this.page
      .locator('text=Moves')
      .locator('..')
      .locator('text=/\\d+/')
      .textContent();
    return parseInt(text || '0', 10);
  }

  /**
   * Gets the current score
   */
  async getScore(): Promise<number> {
    const text = await this.page
      .locator('text=Score')
      .locator('..')
      .locator('text=/\\d+/')
      .textContent();
    return parseInt(text || '0', 10);
  }

  /**
   * Opens the best results modal
   */
  async openBestResults() {
    await this.page.getByRole('button', { name: /top scores/i }).click();
  }

  /**
   * Starts a new game
   */
  async startNewGame() {
    await this.page.getByRole('button', { name: /new game/i }).click();
  }
}
