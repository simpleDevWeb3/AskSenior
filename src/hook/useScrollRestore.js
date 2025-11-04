// src/hooks/useScrollRestore.js
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function useScrollRestore(refContainer) {
  const location = useLocation();
  const navigationType = useNavigationType(); // "POP", "PUSH", "REPLACE"

  useEffect(() => {
    const container = refContainer?.current;
    if (!container) return;

    const key = `scroll-pos:${location.pathname}`;

    // 🧩 If navigation is BACK/FORWARD (POP), restore saved scroll position
    if (navigationType === "POP") {
      const saved = sessionStorage.getItem(key);
      if (saved) {
        // small delay to ensure layout is rendered first
        requestAnimationFrame(() => {
          container.scrollTo(0, parseInt(saved, 10));
        });
      }
    } else {
      // if it’s a new navigation, start at top
      container.scrollTo(0, 0);
    }

    const handleScroll = () => {
      // 💾 Save scroll position while scrolling
      sessionStorage.setItem(key, container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);

    // 🧹 Cleanup
    return () => container.removeEventListener("scroll", handleScroll);
  }, [location.pathname, refContainer, navigationType]);
}
