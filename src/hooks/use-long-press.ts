import React, { useCallback } from "react";

type UseLongPressOptions = {
  delay?: number;
  onLongPress: () => void;
};

export function useLongPress({
  onLongPress,
  delay = 500,
}: UseLongPressOptions) {
  const timeRef = React.useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    timeRef.current = setTimeout(() => {
      onLongPress();
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchMove: clear,
    onTouchCancel: clear,
  };
}
