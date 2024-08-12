interface ResponseBase {
  status: number;
  success: boolean;
}

export interface GetUserResponse extends ResponseBase {
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export type UserDTO = Pick<GetUserResponse["data"], "id" | "name" | "email">;
