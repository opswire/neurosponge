"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = cookies().get("token");
  if (!token) redirect("/auth/login");

  const headers = {
    ...options.headers,
    Accept: "application/json",
    Authorization: `Bearer ${token.value}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      cookies().delete("token");
      if (!token) redirect("/auth/login");
    }
    throw new Error(response.statusText);
  }

  return response;
};
