"use client";

import { cn } from "@/shared";
import { useContext } from "react";
import { SidebarContext } from "./sidebar-context";

function SidebarDesktopBody({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div
      className={cn(
        "w-full h-[calc(100vh-64px)] sticky left-0 top-16 flex flex-col justify-between py-4",
        isOpen && "items-start"
      )}
    >
      {children}
    </div>
  );
}

interface Props {
  children: React.ReactNode;
}
function SidebarDesktop({ children }: Props) {
  const { isOpen } = useContext(SidebarContext);

  return (
    <aside
      className={cn(
        "overflow-visible transition-[width] ease-in-out duration-300 basis-auto grow-0 shrink-0 px-4 w-[73px] border-r border-border/90 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isOpen && "w-80"
      )}
    >
      {children}
    </aside>
  );
}

export { SidebarDesktop, SidebarDesktopBody };
