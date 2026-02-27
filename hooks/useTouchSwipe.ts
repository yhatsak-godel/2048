"use client";

import { useCallback, useRef, useState } from "react";
import type { MoveDirection } from "@/hooks/useGameEngine";

interface TouchPosition {
  x: number;
  y: number;
}

interface UseTouchSwipeOptions {
  onSwipe: (direction: MoveDirection) => void;
  minSwipeDistance?: number;
}

export const useTouchSwipe = ({ 
  onSwipe, 
  minSwipeDistance = 30 
}: UseTouchSwipeOptions) => {
  const touchStartRef = useRef<TouchPosition | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<MoveDirection | null>(null);
  const swipeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Calculate direction for visual feedback
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > 10 || absDeltaY > 10) {
      let direction: MoveDirection | null = null;
      
      if (absDeltaX > absDeltaY) {
        direction = deltaX > 0 ? "right" : "left";
      } else {
        direction = deltaY > 0 ? "down" : "up";
      }

      setSwipeDirection(direction);

      // Clear any existing timeout
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current);
      }
    }
  }, []);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine swipe direction
    if (absDeltaX > minSwipeDistance || absDeltaY > minSwipeDistance) {
      let direction: MoveDirection | null = null;

      if (absDeltaX > absDeltaY) {
        direction = deltaX > 0 ? "right" : "left";
      } else {
        direction = deltaY > 0 ? "down" : "up";
      }

      if (direction) {
        onSwipe(direction);
      }
    }

    // Clear visual feedback after a short delay
    swipeTimeoutRef.current = setTimeout(() => {
      setSwipeDirection(null);
    }, 200);

    touchStartRef.current = null;
  }, [minSwipeDistance, onSwipe]);

  return {
    swipeDirection,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
