import { getUser, ProfileButton } from "@/entities";
import {
  Header,
  HeaderContent,
  HeaderContentSection,
  HeaderCTAButton,
  HeaderLogo,
  HeaderNav,
  HeaderNavButton,
  Separator,
} from "@/shared";
import { ThemeToggle } from "@/shared";

export default async function PrivateGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderContentSection className="flex items-baseline gap-4">
            <HeaderLogo />
            <HeaderNav>
              <HeaderNavButton text={"Колоды"} href={"/search"} />
              <HeaderNavButton text={"Тарифы"} href={"/pricing"} />
            </HeaderNav>
          </HeaderContentSection>

          <HeaderContentSection>
            <ProfileButton user={user} />
            <ThemeToggle />
          </HeaderContentSection>
        </HeaderContent>
      </Header>
      <>{children}</>;
    </>
  );
}
