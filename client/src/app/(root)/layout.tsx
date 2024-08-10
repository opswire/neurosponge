import { getUser } from "@/shared";
import { Header } from "../ui/header";

export default async function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user;
  user = await getUser();
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
