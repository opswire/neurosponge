"use client";

import { Button } from "@/shared/ui/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, User } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/components/ui/drawer";
import { useEffect, useState } from "react";
import { UserDTO } from "@/shared/api/auth/types";
import { Avatar } from "@/shared";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const LoginButton = () => {
  return (
    <Button asChild>
      <Link href={"/auth/login"}>Войти</Link>
    </Button>
  );
};
const NavLink: React.FC<{ text: string; href: string; isActive: boolean }> = ({
  text,
  href,
  isActive,
}) => {
  return (
    <Button
      className={clsx({ "text-primary": isActive })}
      variant={"link"}
      asChild
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
};

const ProfileButton: React.FC<{ user: UserDTO }> = ({ user }) => {
  return (
    <Link className="flex gap-2 items-center justify-start" href={"/profile"}>
      <Avatar className="w-10 h-10">
        <AvatarImage
          sizes="16px 16px"
          className="rounded"
          src="https://github.com/shadcn.png"
        />
        <AvatarFallback className="w-full h-full rounded bg-muted flex justify-center items-center">
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <p className="leading-7 text-muted-foreground">{user.name}</p>
    </Link>
  );
};

interface Props {
  user: UserDTO | null;
}
export const Header = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="h-16 border-b   sticky top-0 z-50 w-full border-border/90 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Desktop */}
      <nav className="px-8 h-full mx-auto flex lg:max-w-screen-lg flex-none xl:max-w-screen-xl items-center justify-between ">
        <div className="flex items-baseline gap-10">
          <Link
            href={"/"}
            className="text-lg font-semibold text-muted-foreground"
          >
            neuro<span className="text-primary">sponge</span>
          </Link>
          <div className="hidden sm:flex text-sm text-muted-foreground">
            <NavLink
              text={"Колоды"}
              href={"/search"}
              isActive={pathname === "/search"}
            />

            <NavLink
              text={"Тарифы"}
              href={"/pricing"}
              isActive={pathname === "/pricing"}
            />
          </div>
        </div>
        <div className="hidden sm:flex gap-4">
          {user ? <ProfileButton user={user} /> : <LoginButton />}
          <ModeToggle />
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex items-center">
          <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex mt-8 flex-col flex-auto items-center gap-10">
                <Link
                  href={"/"}
                  className="text-lg font-semibold text-muted-foreground"
                >
                  neuro<span className="text-primary">sponge</span>
                </Link>
                <div className="flex flex-col text-sm text-muted-foreground">
                  <NavLink
                    text={"Колоды"}
                    href={"/search"}
                    isActive={pathname === "/search"}
                  />
                  <NavLink
                    text={"Тарифы"}
                    href={"/pricing"}
                    isActive={pathname === "/pricing"}
                  />
                </div>
                <div className="flex  gap-4">
                  {user ? <ProfileButton user={user} /> : <LoginButton />}

                  <ModeToggle />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};
