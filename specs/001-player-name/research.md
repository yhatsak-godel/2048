# Research: Player Name

## Decision: Persist player name in localStorage

**Decision**: Use the existing storage utility to persist a single player name per browser/device.

**Rationale**: The app is client-only and already uses localStorage for game results. Reusing that pattern keeps the feature consistent and avoids new dependencies or backend requirements.

**Alternatives considered**:
- Session-only storage (loses name on refresh)
- Server-side storage (out of scope for a client-only app)

## Decision: Prompt on first load with a blocking input modal

**Decision**: Show a name prompt on initial page load when no stored name exists. The prompt is non-dismissible until a valid name is entered or a default name is accepted.

**Rationale**: Ensures the feature's core requirement (capturing the name) is met immediately and consistently. A blocking prompt avoids missing name data on early results.

**Alternatives considered**:
- Inline input embedded in the page header (less noticeable, easier to skip)
- Optional prompt that can be dismissed (risks missing name for early results)

## Decision: Store name on each result entry

**Decision**: Extend each stored game result with `playerName` to preserve historical context when names change.

**Rationale**: Results should reflect the name used at the time of play, especially if the user changes their name later.

**Alternatives considered**:
- Store a single name reference and render results with current name (loses historical accuracy)

## Decision: Validate and sanitize input at capture time

**Decision**: Trim whitespace, enforce a 1-50 character length, and rely on safe rendering in React to avoid XSS issues.

**Rationale**: Ensures meaningful names, prevents layout issues, and keeps security risks low without adding new dependencies.

**Alternatives considered**:
- Allow any string length (risks layout overflow)
- Add a heavy sanitization library (unnecessary for this scope)

## Decision: Default name behavior for legacy or failed storage

**Decision**: Use a default name ("Player") when localStorage is unavailable or legacy results lack a name.

**Rationale**: Ensures stable display, avoids null or blank UI, and aligns with the feature requirements.

**Alternatives considered**:
- Show blank name (reduces clarity in results)
- Require prompt on every load when storage fails (hurts UX in private mode)
