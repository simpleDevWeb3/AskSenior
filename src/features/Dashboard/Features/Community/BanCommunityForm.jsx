import React, { useState } from "react";

import Input from "../../../../components/Input";
import ButtonIcon from "../../../../components/ButtonIcon";

import SpinnerMini from "../../../../components/SpinnerMini";
import { useBanCommunity } from "./useBanCommunity";
import { useModal } from "../../../../context/ModalContext";
import { useUser } from "../../../Auth/useUser";
import toast from "react-hot-toast";

function BanCommunityForm() {
  const { user } = useUser();
  const { closeModal, modalData } = useModal();
  const { banCommunity, isLoadbanCommunity, errorbanCommunity } =
    useBanCommunity(closeModal);
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading

    if (!reason) return toast.error("Reason is required!");

    const data = {
      adminId: user?.id,
      communityId: modalData?.id,
      reason: reason,
    };

    banCommunity(data);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h3 style={{ color: "var(--text-color)" }}>Ban A Community</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <Input handleInput={(e) => setReason(e.target.value)}>Reason</Input>
        <br />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ButtonIcon
            disabled={isLoadbanCommunity}
            type="submit"
            style={{
              backgroundColor: "rgba(17, 132, 247, 0.947)",
              color: "white",
            }}
          >
            {isLoadbanCommunity ? <SpinnerMini /> : "Confirm"}
          </ButtonIcon>
          <ButtonIcon
            disabled={isLoadbanCommunity}
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

export default BanCommunityForm;
