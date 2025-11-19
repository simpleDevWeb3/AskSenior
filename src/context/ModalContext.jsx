import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    id: null, // modal name ("Edit Post")
    data: null, // payload (post object)
  });

  function openModal(id, data = null) {
    setModal({ id, data });
  }

  function closeModal() {
    setModal({ id: null, data: null });
  }

  function toggleModal(id, data = null) {
    if (modal.id === id) {
      closeModal();
    } else {
      openModal(id, data);
    }
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen: modal.id,
        modalData: modal.data,
        openModal,
        closeModal,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}

export { ModalProvider, useModal };
