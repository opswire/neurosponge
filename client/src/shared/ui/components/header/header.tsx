"use client";
import { createContext, useContext, useState } from "react";
import { Button, cn, useWindowSize } from "@/shared";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type HeaderContextType = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
};
const HeaderContext = createContext({
  isDrawerOpen: false,
  setIsDrawerOpen: (value: boolean) => {},

  isMobile: false,
});

interface NavButtonProps {
  text: string;
  href: string;
}
function HeaderNavButton({ text, href }: NavButtonProps) {
  const pathname = usePathname();
  return (
    <Button
      className={clsx({ "text-primary": pathname === href })}
      variant={"link"}
      asChild
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}

interface CTAButtonProps {
  text: string;
  href: string;
}
function HeaderCTAButton({ text, href }: CTAButtonProps) {
  return (
    <Button asChild>
      <Link href={href}>{text}</Link>
    </Button>
  );
}

interface NavProps {
  children: React.ReactNode;
}
function HeaderNav({ children }: NavProps) {
  return <nav className="flex">{children}</nav>;
}

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}
function HeaderContentSection({ children, className }: ContentSectionProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>{children}</div>
  );
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}
function HeaderContent({ children, className }: ContentProps) {
  return (
    <div
      className={cn(
        "p-4 h-full mx-auto flex  items-center justify-between ",
        className
      )}
    >
      {children}
    </div>
  );
}

interface HeaderProps {
  children: React.ReactNode;
}
function Header({ children }: HeaderProps) {
  const screenWidth = useWindowSize();
  const [open, setOpen] = useState(false);
  const setDrawerState = (value: boolean) => {
    setOpen(value);
  };

  const isMobile = screenWidth === "default";
  return (
    <HeaderContext.Provider
      value={{ isDrawerOpen: open, setIsDrawerOpen: setDrawerState, isMobile }}
    >
      <header className="h-16 border-b sticky top-0 z-50 w-full border-border/90 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {children}
      </header>
    </HeaderContext.Provider>
  );
}

export {
  Header,
  HeaderCTAButton,
  HeaderNavButton,
  HeaderContentSection,
  HeaderNav,
  HeaderContent,
};
