"use client";

import { Button, cn, Toggle } from "@/shared";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext<{
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isOpen: false, setOpen: () => {} });

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <SidebarContext.Provider value={{ isOpen: open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

//имеет смысл нахуй отказаться от этого компонента, реализовывать логику изменения состояния контекста по месту применения
function SidebarTrigger() {
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

export { SidebarProvider, SidebarContext, SidebarTrigger };
