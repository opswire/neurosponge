//response types
interface ResponseBase {
  status: number;
  success: boolean;
}

export interface AuthSuccess {
  success: true;
}
export interface AuthError {
  success: false;
  message: string;
}

export interface RegisterResponse extends ResponseBase {
  data: {
    id: string;
    name: string;
    email: string;
    profile: {
      name: string;
    };
    roles: [
      {
        name: string;
        display_name: string;
      }
    ];
  };
  meta: {
    access_token: string;
    expires_in: number;
  };
}

export interface LoginResponse extends ResponseBase {
  success: true;
  data: {
    access_token: string;
    expires_in: number;
  };
}

export interface LogoutResponse extends ResponseBase {
  data: {
    message: string;
  };
}

export interface RefreshResponse extends ResponseBase {
  data: {
    access_token: string;
    expires_in: number;
  };
}
