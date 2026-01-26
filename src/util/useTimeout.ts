import {useEffect} from "react";

export default function useTimeout(functionRef: () => void, delay: number) {
  useEffect(() => {
    const timeoutId = setTimeout(functionRef, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [functionRef, delay]);
}
