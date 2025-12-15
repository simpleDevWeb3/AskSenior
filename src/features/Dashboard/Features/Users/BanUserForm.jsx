import React, { useState } from "react";
import { useModal } from "../../../../context/ModalContext";
import Input from "../../../../components/Input";
import ButtonIcon from "../../../../components/ButtonIcon";

import SpinnerMini from "../../../../components/SpinnerMini";
import { useBanUser } from "./useBanUser";

function BanUserForm() {
  const { closeModal } = useModal();
  const { banUser, isLoadbanUser, errorbanUser } = useBanUser(closeModal);
  const [reason, setReason] = useState("");
  const { modalData } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading

    if (!reason) return;

    const data = {
      user_id: modalData?.user_id,
      reason: reason,
    };

    banUser(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h3 style={{ color: "var(--text-color)" }}>Ban A User</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <Input handleInput={(e) => setReason(e.target.value)}>Reason</Input>
        <br />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ButtonIcon
            disabled={isLoadbanUser}
            type="submit"
            style={{
              backgroundColor: "rgba(17, 132, 247, 0.947)",
              color: "white",
            }}
          >
            {isLoadbanUser ? <SpinnerMini /> : "Confirm"}
          </ButtonIcon>
          <ButtonIcon
            disabled={isLoadbanUser}
            action={closeModal}
            type="button"
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Cancel
          </ButtonIcon>
        </div>
      </form>
    </div>
  );
}

export default BanUserForm;
