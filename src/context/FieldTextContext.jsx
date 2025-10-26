import { createContext, useState } from "react";

const FieldTextContext = createContext();

function FieldTextProvider({ children }) {
  const [isShowTextField, setShowTextField] = useState(null);

  function toggleTextField(id) {
    if (isShowTextField === id) {
      setShowTextField(null);
      return;
    } else {
      setShowTextField(id);
    }
  }
  return (
    <FieldTextContext.Provider value={{ isShowTextField, toggleTextField }}>
      {children}
    </FieldTextContext.Provider>
  );
}

export { FieldTextProvider, FieldTextContext };
