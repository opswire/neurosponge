"use server";

import { resolveHostUrl } from "@/shared/lib/resolve-host-url";
import { cookies } from "next/headers";
import {
  AuthError,
  AuthSuccess,
  GetUserResponse,
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
  UserDTO,
} from "./types";
import { redirect } from "next/navigation";

const HOST_URL = resolveHostUrl();
const LOGIN_URL = `${HOST_URL}/auth/login`;
const REGISTER_URL = `${HOST_URL}/auth/register`;
const REFRESH_URL = `${HOST_URL}/auth/refresh`;
const LOGOUT_URL = `${HOST_URL}/auth/logout`;
const ME_URL = `${HOST_URL}/auth/me`;

export const login = async (
  email: string,
  password: string
): Promise<AuthError | AuthSuccess> => {
  const res = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    if (res.status === 401) {
      //   throw new AuthError("Invalid email or password", res.status);
      return {
        success: false,
        message: "Неверный email или пароль",
      };
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to login");
  } else {
    const loginData: LoginResponse = await res.json();

    cookies().set("token", loginData.data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: loginData.data.expires_in,
    });

    return { success: true };
  }
};

export const register = async (
  email: string,
  password: string
): Promise<AuthError | AuthSuccess> => {
  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    if (res.status === 409) {
      return {
        success: false,
        message: "Пользователь с таким email уже существует",
      };
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to register");
  } else {
    const registerData: RegisterResponse = await res.json();

    cookies().set("token", registerData.meta.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: registerData.meta.expires_in,
    });

    return { success: true };
  }
};

export const logout = async () => {
  const token = cookies().get("token");
  if (!token) throw new Error("Unauthorized");
  const res = await fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to logout");
  } else {
    cookies().delete("token");
  }
};

export const refresh = async () => {
  const token = cookies().get("token");
  if (!token) return;
  const res = await fetch(REFRESH_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      redirect("/auth/login");
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to refresh session");
  } else {
    const refreshData: RefreshResponse = await res.json();
    cookies().set("token", refreshData.data.access_token, {
      httpOnly: true,
      path: "/",
      maxAge: refreshData.data.expires_in,
    });
  }
};

export const getUser = async (): Promise<UserDTO | null> => {
  const token = cookies().get("token");
  if (!token) return null;
  const res = await fetch(ME_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      cookies().delete("token");
      return null;
    }
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to get user");
  } else {
    const userData: GetUserResponse = await res.json();
    return userData.data as UserDTO;
  }
};
