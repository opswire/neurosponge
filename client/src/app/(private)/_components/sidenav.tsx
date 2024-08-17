"use client";

import { LogoShort, useWindowSize } from "@/shared";
import {
  SidebarDesktop,
  SidebarDesktopBody,
  SidebarMobile,
  SidebarMobileBody,
  SidebarMobileHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuButton,
} from "@/shared";

import { UserDTO } from "@/entities";
import { Home, Library } from "lucide-react";

const NavBody = () => {
  return (
    <SidebarMenu>
      <SidebarMenuButton
        href={"/home"}
        title={"Главная"}
        IconComponent={<Home className="w-6 h-6" />}
      />
      <SidebarMenuButton
        href={"/collection"}
        title={"Коллекция"}
        IconComponent={<Library className="w-6 h-6" />}
      />
    </SidebarMenu>
  );
};

interface Props {
  user: UserDTO;
  className?: string;
}
function SideNav({ user, className }: Props) {
  const breakpoint = useWindowSize();

  const isMobile = breakpoint === "sm" || breakpoint === "default";

  return isMobile ? (
    <SidebarMobile>
      <SidebarMobileHeader>
        <SidebarTrigger />
        <LogoShort />
      </SidebarMobileHeader>
      <SidebarMobileBody>
        <NavBody />
      </SidebarMobileBody>
    </SidebarMobile>
  ) : (
    <SidebarDesktop>
      <SidebarDesktopBody>
        <NavBody />
      </SidebarDesktopBody>
    </SidebarDesktop>
  );
}

export { SideNav };
