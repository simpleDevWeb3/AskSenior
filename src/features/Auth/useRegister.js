import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../services/AuthApi";
export function useRegister() {
  const { mutate: register, isPending: isLoading } = useMutation({
    mutationFn: ({
      email,
      password,
      username,
      bio,
      avatar_url,
      banner_url,
    }) => {
      registerApi({ email, password, username, bio, avatar_url, banner_url });
    },
    onSuccess: () => {
      console.log("SUCCESS: User Registered ");
    },
    onError: (err) => {
      console.log("ERROR: ", err);
    },
  });

  return { register, isLoading };
}
