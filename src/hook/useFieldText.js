import { useContext } from "react";
import { FieldTextContext } from "../context/FieldTextContext";

function useFieldText() {
  const context = useContext(FieldTextContext);

  if (context === null)
    throw new Error("useFieldText context is used outside FieldTextProvider!");

  return context;
}

export { useFieldText };
