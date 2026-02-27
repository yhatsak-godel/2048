import { renderHook, act } from "@testing-library/react";
import { useTouchSwipe } from "@/hooks/useTouchSwipe";
import type { MoveDirection } from "@/hooks/useGameEngine";

const createTouchEvent = (clientX: number, clientY: number): Partial<Touch> => ({
  clientX,
  clientY,
});

const mockTouchEvent = (
  x: number,
  y: number,
  type: "start" | "move" | "end"
): React.TouchEvent => {
  const touch = createTouchEvent(x, y) as Touch;
  const touches = type === "end" ? [] : [touch];
  const changedTouches = type === "end" ? [touch] : [];

  return {
    touches,
    changedTouches,
  } as React.TouchEvent;
};

describe("useTouchSwipe", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("detects horizontal swipe right", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(200, 100, "end"));
    });

    expect(onSwipe).toHaveBeenCalledWith("right");
  });

  test("detects horizontal swipe left", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(200, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(100, 100, "end"));
    });

    expect(onSwipe).toHaveBeenCalledWith("left");
  });

  test("detects vertical swipe down", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(100, 200, "end"));
    });

    expect(onSwipe).toHaveBeenCalledWith("down");
  });

  test("detects vertical swipe up", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 200, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(100, 100, "end"));
    });

    expect(onSwipe).toHaveBeenCalledWith("up");
  });

  test("does not trigger swipe when distance is below minimum", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe, minSwipeDistance: 50 }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(120, 100, "end"));
    });

    expect(onSwipe).not.toHaveBeenCalled();
  });

  test("updates swipeDirection during touchMove", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    expect(result.current.swipeDirection).toBeNull();

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchMove(mockTouchEvent(150, 100, "move"));
    });

    expect(result.current.swipeDirection).toBe("right");
  });

  test("clears swipeDirection after touchEnd with delay", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchMove(mockTouchEvent(150, 100, "move"));
    });

    expect(result.current.swipeDirection).toBe("right");

    act(() => {
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(200, 100, "end"));
    });

    // Direction should still be set immediately after touchEnd
    expect(result.current.swipeDirection).toBe("right");

    // After timeout, direction should be cleared
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current.swipeDirection).toBeNull();
  });

  test("prefers horizontal direction when deltaX is greater", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(200, 120, "end"));
    });

    expect(onSwipe).toHaveBeenCalledWith("right");
  });

  test("prefers vertical direction when deltaY is greater", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(120, 200, "end"));
    });

    expect(onSwipe).toHaveBeenCalledWith("down");
  });

  test("handles touchEnd without touchStart gracefully", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => useTouchSwipe({ onSwipe }));

    act(() => {
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(200, 100, "end"));
    });

    expect(onSwipe).not.toHaveBeenCalled();
  });

  test("uses custom minSwipeDistance", () => {
    const onSwipe = jest.fn();
    const { result } = renderHook(() => 
      useTouchSwipe({ onSwipe, minSwipeDistance: 100 })
    );

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(180, 100, "end"));
    });

    // Should not trigger with only 80px swipe when minimum is 100px
    expect(onSwipe).not.toHaveBeenCalled();

    act(() => {
      result.current.touchHandlers.onTouchStart(mockTouchEvent(100, 100, "start"));
      result.current.touchHandlers.onTouchEnd(mockTouchEvent(210, 100, "end"));
    });

    // Should trigger with 110px swipe
    expect(onSwipe).toHaveBeenCalledWith("right");
  });
});
