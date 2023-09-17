import { useEffect, useRef } from "react";

type Callback = () => void;

// 📜 https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: Callback, delay: number | undefined) {
  const savedCallback = useRef<Callback | undefined>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
