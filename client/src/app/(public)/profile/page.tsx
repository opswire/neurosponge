import LogoutButton from "./components/logout-button";
import { getUser } from "@/entities";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <LogoutButton />
    </div>
  );
}
