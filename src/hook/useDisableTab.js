import { useEffect } from "react";

export function useDisableTab(isActive = true) {
  useEffect(() => {
    if (!isActive) return;

    const blockTabKey = (e) => {
      if (e.key === "Tab") {
        e.preventDefault(); // Stop the tab completely
        e.stopPropagation();
      }
    };

    // Listen to the entire page (document), not just the form container
    document.addEventListener("keydown", blockTabKey, true);

    // Cleanup when the component disappears (e.g. user goes back to Login)
    return () => {
      document.removeEventListener("keydown", blockTabKey, true);
    };
  }, [isActive]);
}