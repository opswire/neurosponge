"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "./sidebar-context";
import { Button, cn } from "@/shared";
import Link from "next/link";

interface SidebarMenuButtonProps {
  href: string;
  title: string;
  IconComponent: React.ReactNode;
}
function SidebarMenuButton({
  href,
  title,
  IconComponent,
}: SidebarMenuButtonProps) {
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
          {IconComponent}
          {isOpen && <p className="h-fit font-semibold">{title}</p>}
        </div>
      </Link>
    </Button>
  );
}

function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="w-full flex flex-col gap-4">{children}</nav>;
}

export { SidebarMenu, SidebarMenuButton };
