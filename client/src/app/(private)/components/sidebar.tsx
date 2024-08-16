"use client";

import { UserDTO } from "@/entities";
import {
  Button,
  cn,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  LogoShort,
  Separator,
  Toggle,
  useWindowSize,
} from "@/shared";
import { Home, Library, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";

const SidebarContext = createContext<{
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isOpen: false, setOpen: () => {} });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen: open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger() {
  const { isOpen, setOpen } = useContext(SidebarContext);
  return (
    <Button
      asChild
      onClick={() => setOpen(!isOpen)}
      variant={"ghost"}
      size={"icon"}
    >
      <Toggle
        className="w-fit h-fit p-2"
        pressed={isOpen}
        variant={"default"}
        aria-label="Open sidebar"
      >
        <Menu
          className={cn(
            "h-6 w-6 transition-transform ease-in-out duration-300",
            isOpen === false ? "rotate-0" : "rotate-[1turn]"
          )}
        />
      </Toggle>
    </Button>
  );
}

interface SidebarMenuButtonProps {
  href: string;
  title: string;
  children: React.ReactNode;
}
function SidebarMenuButton({ href, title, children }: SidebarMenuButtonProps) {
  const pathname = usePathname();
  const { isOpen } = useContext(SidebarContext);

  return (
    <Button
      className={cn(
        "w-full p-2 h-fit flex justify-start text-muted-foreground",
        isOpen && "w-full",
        pathname === href && "bg-accent text-primary"
      )}
      role="menuitem"
      asChild
      variant="ghost"
    >
      <Link href={href}>
        <div className="flex items-center h-fit gap-4">
          {children}
          {isOpen && <p className="h-fit font-semibold">{title}</p>}
        </div>
      </Link>
    </Button>
  );
}

interface AccountOptionsButtonProps {
  user: UserDTO;
}
function AccountOptionsButton({ user }: AccountOptionsButtonProps) {
  const { isOpen } = useContext(SidebarContext);
  return (
    <Button
      className={cn(
        "w-full p-[7px] h-fit flex justify-start",
        isOpen && "w-full"
      )}
      role="menuitem"
      asChild
      variant="outline"
    >
      <div>
        <div className="flex items-center h-fit gap-4">
          <Settings className="w-6 h-6" />
          {isOpen && <p className="h-fit font-semibold">{user.email}</p>}
        </div>
      </div>
    </Button>
  );
}

function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="w-full flex flex-col gap-4">{children}</nav>;
}

interface Props {
  user: UserDTO;
  className?: string;
}
function Sidebar({ user, className }: Props) {
  const { isOpen, setOpen } = useContext(SidebarContext);
  const breakpoint = useWindowSize();

  const isMobile = breakpoint === "sm" || breakpoint === "default";

  return isMobile ? (
    <Drawer direction="left" open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className={"flex flex-col"}>
        <VisuallyHidden.Root>
          <DrawerHeader>
            <DrawerTitle>Sidebar Menu</DrawerTitle>
            <DrawerDescription>
              Contains the main menu options
            </DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden.Root>

        {/* Header */}
        <div className="h-16 flex items-center gap-2 px-4">
          <SidebarTrigger />
          <LogoShort />
        </div>

        <Separator />

        {/* Content */}
        <div className="h-full w-full flex flex-col px-4 py-4 justify-between">
          {/* Body */}
          <SidebarMenu>
            <SidebarMenuButton
              href={"/home"}
              title={"Главная"}
              children={<Home className="w-6 h-6" />}
            />
            <SidebarMenuButton
              href={"/collection"}
              title={"Коллекция"}
              children={<Library className="w-6 h-6" />}
            />
          </SidebarMenu>

          {/* Footer */}
          <AccountOptionsButton user={user} />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <aside
      className={cn(
        isMobile && "hidden",
        "overflow-visible transition-[width] ease-in-out duration-300 basis-auto grow-0 shrink-0 px-4 w-[73px] border-r border-border/90 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isOpen && "w-80"
      )}
    >
      <div
        className={cn(
          "w-full h-[calc(100vh-64px)] sticky left-0 top-16 flex flex-col justify-between py-4",
          isOpen && "items-start"
        )}
      >
        <SidebarMenu>
          <SidebarMenuButton
            href={"/home"}
            title={"Главная"}
            children={<Home className="w-6 h-6" />}
          />
          <SidebarMenuButton
            href={"/collection"}
            title={"Коллекция"}
            children={<Library className="w-6 h-6" />}
          />
        </SidebarMenu>

        <AccountOptionsButton user={user} />
      </div>
    </aside>
  );
}

export { Sidebar };
