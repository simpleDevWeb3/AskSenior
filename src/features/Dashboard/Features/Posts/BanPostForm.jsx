import React, { useState } from "react";
import { useModal } from "../../../../context/ModalContext";
import Input from "../../../../components/Input";
import ButtonIcon from "../../../../components/ButtonIcon";
import { useBanPost } from "./useBanPost";
import SpinnerMini from "../../../../components/SpinnerMini";
import toast from "react-hot-toast";

function BanPostForm() {
  const { closeModal } = useModal();
  const { banPost, isLoadBanPost, errorBanPost } = useBanPost(closeModal);
  const [reason, setReason] = useState("");
  const { modalData } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading

    if (!reason) return toast.error("Reason is required!");

    const data = {
      post_id: modalData?.postId,
      reason: reason,
    };

    banPost(data);
  };

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h3 style={{ color: "var(--text-color)" }}>Ban A Post</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <Input handleInput={(e) => setReason(e.target.value)}>Reason</Input>
        <br />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ButtonIcon
            disabled={isLoadBanPost}
            type="submit"
            style={{
              backgroundColor: "rgba(17, 132, 247, 0.947)",
              color: "white",
            }}
          >
            {isLoadBanPost ? <SpinnerMini /> : "Confirm"}
          </ButtonIcon>
          <ButtonIcon
            disabled={isLoadBanPost}
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

export default BanPostForm;
