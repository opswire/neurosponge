"use client";

import { Button } from "@/shared/ui/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="lg:h-16 lg:max-w-screen-lg xl:max-w-screen-xl mx-auto sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="h-full flex items-center justify-between ">
        <div className="flex items-baseline gap-10">
          <Link href={"/"} className="text-lg font-semibold">
            neurosponge
          </Link>
          <div className="flex text-sm text-muted-foreground gap-6">
            <Button
              className={clsx({ "text-primary": pathname === "/decks" })}
              variant={"link"}
            >
              <Link href={"/decks"}>Колоды</Link>
            </Button>
            <Button
              className={clsx({ "text-primary": pathname === "/pricing" })}
              variant={"link"}
            >
              <Link href={"/pricing"}>Тарифы</Link>
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <Button>Войти</Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
