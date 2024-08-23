"use client";

import { Button, logout } from "@/shared/";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function onLogoutClick() {
    await logout();
    router.replace("/");
  }
  return (
    <Button onClick={onLogoutClick} variant={"destructive"}>
      <p>Выйти</p>
    </Button>
  );
}
