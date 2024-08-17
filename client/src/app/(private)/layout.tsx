import { getUser, ProfileButton } from "@/entities";
import {
  Header,
  HeaderContent,
  HeaderContentSection,
  ThemeToggle,
} from "@/shared";
import { LogoShort } from "@/shared";
import { SidebarProvider, SidebarTrigger } from "@/shared";
import { SideNav } from "./_components/sidenav";

export default async function PrivateGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <SidebarProvider>
      <Header>
        <HeaderContent>
          <HeaderContentSection className="flex items-center gap-2">
            <SidebarTrigger />
            <LogoShort />
          </HeaderContentSection>

          <HeaderContentSection>
            <ThemeToggle />
            <ProfileButton user={user} />
          </HeaderContentSection>
        </HeaderContent>
      </Header>
      <div className="flex">
        <SideNav user={user} />
        <div className="w-full basis-10/12">{children}</div>
      </div>
    </SidebarProvider>
  );
}
