import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturePhase = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click outside!");
        handler?.();
      }
    }

    document.addEventListener("click", handleClick, listenCapturePhase);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturePhase);
    };
  }, [handler, listenCapturePhase]);

  return ref;
}
