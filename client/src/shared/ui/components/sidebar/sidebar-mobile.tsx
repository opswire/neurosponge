"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  LogoShort,
  Separator,
} from "@/shared";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { SidebarContext, SidebarTrigger } from "./sidebar-context";
import { useContext } from "react";

function SidebarMobileHeader({ children }: { children: React.ReactNode }) {
  return (
    <DrawerHeader className="h-16 flex items-center gap-2 px-4">
      <SidebarTrigger />
      <LogoShort />
    </DrawerHeader>
  );
}

function SidebarMobileBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col px-4 py-4 justify-between">
      {children}
    </div>
  );
}

interface SidebarMobileProps {
  accessibleTitle?: string;
  accessibleDescription?: string;
  children: React.ReactNode;
}
function SidebarMobile({
  accessibleTitle,
  accessibleDescription,
  children,
}: SidebarMobileProps) {
  const { isOpen, setOpen } = useContext(SidebarContext);

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className={"flex flex-col"}>
        <VisuallyHidden.Root>
          <DrawerTitle>{accessibleTitle}</DrawerTitle>
          <DrawerDescription>{accessibleDescription}</DrawerDescription>
        </VisuallyHidden.Root>

        {children}
      </DrawerContent>
    </Drawer>
  );
}

export { SidebarMobile, SidebarMobileHeader, SidebarMobileBody };
