"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

interface PlayerNameModalProps {
  isOpen: boolean;
  initialName?: string;
  onSubmit: (name: string) => { success: boolean; error?: string } | boolean;
  onUseDefault: () => void;
}

const MAX_NAME_LENGTH = 50;

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) {
    return [] as HTMLElement[];
  }
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  );
};

/**
 * Modal dialog that prompts the player to enter a name on first visit.
 */
export const PlayerNameModal = ({
  isOpen,
  initialName = "",
  onSubmit,
  onUseDefault,
}: PlayerNameModalProps) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    // Reset form state when modal opens
    setName(initialName);
    setError(null);
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    return () => {
      window.clearTimeout(focusTimer);
      lastActiveRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const helperText = useMemo(() => {
    return "Your name appears on the game and in your best results.";
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a name to continue.");
      return;
    }
    if (trimmed.length > MAX_NAME_LENGTH) {
      setError(`Name must be ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }
    const result = onSubmit(trimmed);
    if (typeof result === "boolean") {
      if (!result) {
        setError("Unable to save your name. Using the default instead.");
      }
      return;
    }
    if (!result.success) {
      setError(result.error ?? "Unable to save your name.");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }
    const focusable = getFocusableElements(modalRef.current);
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !modalRef.current?.contains(active)) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-10">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-name-title"
        aria-describedby="player-name-description"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.6)]"
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Welcome
            </p>
            <h2
              id="player-name-title"
              className="text-2xl font-semibold text-slate-900"
            >
              What should we call you?
            </h2>
          </div>
          <p id="player-name-description" className="text-sm text-slate-600">
            {helperText}
          </p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="text-sm font-medium text-slate-700" htmlFor="player-name">
              Player name
            </label>
            <input
              ref={inputRef}
              id="player-name"
              name="player-name"
              type="text"
              autoComplete="name"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
            {error ? (
              <p role="alert" className="text-sm text-rose-600">
                {error}
              </p>
            ) : null}
            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
              >
                Save name
              </button>
              <button
                type="button"
                onClick={onUseDefault}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Continue as Player
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
