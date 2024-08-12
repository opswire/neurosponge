import { GetUserResponse, UserDTO } from "@/entities/user";
import { resolveHostUrl } from "@/shared";
import { fetchWithAuth } from "@/shared/api/auth/fetch-with-auth-action";

const HOST_URL = resolveHostUrl();

export const getUser = async (): Promise<UserDTO> => {
  const res = await fetchWithAuth(`${HOST_URL}/auth/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const userData: GetUserResponse = await res.json();

  const user: UserDTO = {
    id: userData.data.id,
    name: userData.data.name,
    email: userData.data.email,
  };

  return user;
};
