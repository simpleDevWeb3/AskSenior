import { createContext, useContext, useState } from "react";
/* eslint-disable react-refresh/only-export-components */
const ModalContext = createContext();

function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(null);

  function openModal(id) {
    setIsModalOpen(id);
  }

  function closeModal() {
    setIsModalOpen(null);
  }

  function toggleModal(id) {
    console.log(id);
    if (isModalOpen === id) {
      closeModal();
    } else {
      openModal(id);
    }
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
