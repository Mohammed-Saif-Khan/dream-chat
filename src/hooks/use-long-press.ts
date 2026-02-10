import { useCallback, useRef } from "react";

type UseLongPressOptions = {
  delay?: number;
  onLongPress: () => void;
};

export function useLongPress({
  onLongPress,
  delay = 500,
}: UseLongPressOptions) {
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();

      timeRef.current = setTimeout(() => {
        onLongPress();
      }, delay);
    },
    [onLongPress, delay],
  );

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

    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
  };
}
