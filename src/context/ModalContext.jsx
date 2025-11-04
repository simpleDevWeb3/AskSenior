import { createContext, useContext, useState } from "react";
/* eslint-disable react-refresh/only-export-components */
const ModalContext = createContext();

function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleModal() {
    setIsModalOpen((open) => !open);
  }

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, toggleModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const ctx = useContext(ModalContext);

  if (ctx === undefined)
    throw new Error("useModal is call outside ModalProvider!");

  return ctx;
}

export { useModal, ModalProvider };
