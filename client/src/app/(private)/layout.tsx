import { Header } from "../ui/header";

export default function PrivateGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <>{children}</>;
    </>
  );
}
