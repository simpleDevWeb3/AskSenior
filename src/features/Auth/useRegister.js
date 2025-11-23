import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../services/AuthApi";
import toast from "react-hot-toast";
export function useRegister(onHandleSuccess) {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationFn: (formData) => {
      registerApi(formData);
    },
    onSuccess: () => {
      console.log("SUCCESS: User Registered ");
      toast.success("SUCCESS: User Registered ");
      onHandleSuccess?.();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { register, isLoadingRegister };
}
