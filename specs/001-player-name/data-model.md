# Data Model: Player Name

## Entities

### Player

**Represents**: The current player's identity stored on the client.

**Fields**:
- `name` (string, required): 1-50 characters after trimming

**Validation Rules**:
- Trim leading and trailing whitespace
- Reject empty or whitespace-only values
- Enforce maximum length of 50 characters
- Allow Unicode letters, digits, spaces, and common punctuation (no restrictive filtering required)

**State Transitions**:
- `Unset` → `Set` (first successful name entry)
- `Set` → `Updated` (name change action)

### GameResult (extended)

**Represents**: A completed game result entry stored in localStorage.

**Fields**:
- `score` (number)
- `maxTile` (number)
- `moves` (number)
- `date` (string/ISO timestamp)
- `duration` (number, ms)
- `playerName` (string, required; default "Player")

**Relationships**:
- Each `GameResult` embeds `playerName` as a snapshot from the `Player` at time of play.

**Backward Compatibility**:
- If existing results lack `playerName`, display `"Player"` or `"Anonymous"` per spec.
