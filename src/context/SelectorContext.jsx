/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const SelectorContext = createContext();

function SelectorProvider({ children, limit }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const isExceeded = limit === selectedItems.length;
  function handleSelect(id) {
    const isSelected = selectedItems.includes(id);

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
      return;
    }
    if (isExceeded) return;

    setSelectedItems((prevItems) => [...prevItems, id]);
  }
  return (
    <SelectorContext.Provider
      value={{ selectedItems, handleSelect, isExceeded, limit }}
    >
      {children}
    </SelectorContext.Provider>
  );
}

function useSelector() {
  const ctx = useContext(SelectorContext);
  if (ctx === undefined)
    throw new Error("useSelector is used outside the Selector Provider");
  return ctx;
}

export { useSelector, SelectorProvider };
