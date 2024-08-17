"use client";

import {
  Header,
  HeaderContent,
  HeaderContentSection,
  HeaderCTAButton,
  HeaderNav,
  HeaderNavButton,
  LogoShort,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMobile,
  SidebarMobileBody,
  SidebarMobileHeader,
  SidebarProvider,
  SidebarTrigger,
  ThemeToggle,
  useWindowSize,
} from "@/shared";
import { RussianRuble, Search } from "lucide-react";

const NavBody = () => {
  return (
    <SidebarMenu>
      <SidebarMenuButton
        href="/search"
        title="Поиск по колодам"
        IconComponent={<Search className="w-6 h-6" />}
      />
      <SidebarMenuButton
        href="/pricing"
        title="Тарифы"
        IconComponent={<RussianRuble className="w-6 h-6" />}
      />
    </SidebarMenu>
  );
};

type HeaderLink = {
  text: string;
  href: string;
};

type HeaderContent = {
  logo: JSX.Element;
  navLinks: HeaderLink[];
  ctaButton: HeaderLink;
  themeToggle: JSX.Element;
};

const headerData: HeaderContent = {
  logo: <LogoShort />,
  navLinks: [
    { text: "Колоды", href: "/decks" },
    { text: "Тарифы", href: "/pricing" },
  ],
  ctaButton: { text: "Войти", href: "/auth/login" },
  themeToggle: <ThemeToggle />,
};

function PublicHeader() {
  const breakpoint = useWindowSize();

  const isMobile = breakpoint === "sm" || breakpoint === "default";

  return isMobile ? (
    <Header>
      <HeaderContent className="lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <HeaderContentSection className="flex items-center gap-2">
          <SidebarProvider>
            <SidebarTrigger />
            <SidebarMobile>
              <SidebarMobileHeader>
                <SidebarTrigger />
                <LogoShort />
              </SidebarMobileHeader>
              <SidebarMobileBody>
                <NavBody />
              </SidebarMobileBody>
            </SidebarMobile>
          </SidebarProvider>
          {headerData.logo}
        </HeaderContentSection>
        <HeaderContentSection>
          <HeaderCTAButton
            text={headerData.ctaButton.text}
            href={headerData.ctaButton.href}
          />
        </HeaderContentSection>
      </HeaderContent>
    </Header>
  ) : (
    <Header>
      <HeaderContent className="lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <HeaderContentSection className="flex items-center gap-2">
          {headerData.logo}
          <HeaderNav>
            {headerData.navLinks.map((link, index) => (
              <HeaderNavButton key={index} text={link.text} href={link.href} />
            ))}
          </HeaderNav>
        </HeaderContentSection>
        <HeaderContentSection>
          {headerData.themeToggle}
          <HeaderCTAButton
            text={headerData.ctaButton.text}
            href={headerData.ctaButton.href}
          />
        </HeaderContentSection>
      </HeaderContent>
    </Header>
  );
}

export { PublicHeader };
