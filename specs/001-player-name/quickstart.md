# Quickstart: Player Name

## Goal

Verify the Player Name feature in a local development environment.

## Steps

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app in the browser (http://localhost:3000).

4. Clear any existing name from localStorage (optional) and refresh the page.

5. Verify the name prompt appears and is keyboard accessible.

6. Enter a valid name and submit.

7. Confirm the name displays on the game page.

8. Play a game and open the Best Results modal.

9. Confirm the player's name appears with each result entry.

10. Change the player name (if the UI provides a change action) and confirm new results include the updated name while older results retain the previous name.

## Expected Results

- Name prompt appears on first load when no name is stored.
- Name is stored in localStorage and persists across refreshes.
- Name is visible on the game page.
- Best Results modal shows the player name for each entry.
- UI remains accessible (keyboard, focus, contrast).
