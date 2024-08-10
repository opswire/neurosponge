import { getUser } from "@/shared";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <LogoutButton />
    </div>
  );
}
