"use client";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Button,
  cn,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Separator,
  useWindowSize,
} from "@/shared";
import Link from "next/link";
import { Menu } from "lucide-react";
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

interface NavItemProps {
  text: string;
  href: string;
}

//header compound component
function HeaderNavButton({ text, href }: NavItemProps) {
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

function HeaderCTAButton({ text, href }: NavItemProps) {
  return (
    <Button asChild>
      <Link href={href}>{text}</Link>
    </Button>
  );
}

function HeaderLogo() {
  return (
    <Link
      href={"/"}
      className="text-lg font-semibold text-muted-foreground inline-flex items-center justify-center px-4 py-2"
    >
      <p>
        neuro<span className="text-primary">sponge</span>
      </p>
    </Link>
  );
}

function HeaderNav({ children }: { children: React.ReactNode }) {
  const { isMobile } = useContext(HeaderContext);
  if (isMobile) {
    return <nav className="flex flex-col">{children}</nav>;
  }
  return <nav className="flex">{children}</nav>;
}

interface HeaderContentSectionProps {
  children: React.ReactNode;
  className?: string;
}
function HeaderContentSection({
  children,
  className,
}: HeaderContentSectionProps) {
  const { isMobile } = useContext(HeaderContext);
  if (isMobile) {
    return (
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    );
  }
  return (
    <div className={cn("flex items-center gap-4", className)}>{children}</div>
  );
}

function HeaderContent({ children }: { children: React.ReactNode }) {
  const { isMobile, isDrawerOpen, setIsDrawerOpen } = useContext(HeaderContext);
  if (isMobile) {
    return (
      <div className="px-8 h-full w-full  items-center">
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          direction="left"
        >
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-4">
            {children}
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else {
    return (
      <div className="px-8 h-full mx-auto flex lg:max-w-screen-lg flex-none xl:max-w-screen-xl items-center justify-between ">
        {children}
      </div>
    );
  }
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
  HeaderLogo,
  HeaderNavButton,
  HeaderContentSection,
  HeaderNav,
  HeaderContent,
};
// export function Header() {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);
//   return (
//     <header className="h-16 border-b   sticky top-0 z-50 w-full border-border/90 bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       {/* Desktop */}
//       <nav className="px-8 h-full mx-auto flex lg:max-w-screen-lg flex-none xl:max-w-screen-xl items-center justify-between ">
//         <div className="flex items-baseline gap-10">
//           <Link
//             href={"/"}
//             className="text-lg font-semibold text-muted-foreground"
//           >
//             neuro<span className="text-primary">sponge</span>
//           </Link>
//           <div className="hidden sm:flex text-sm text-muted-foreground">
//             <NavLink
//               text={"Колоды"}
//               href={"/search"}
//               isActive={pathname === "/search"}
//             />

//             <NavLink
//               text={"Тарифы"}
//               href={"/pricing"}
//               isActive={pathname === "/pricing"}
//             />
//           </div>
//         </div>
//         <div className="hidden sm:flex gap-4">
//           {" "}
//           <HeaderLoginButton />
//           <ModeToggle />
//         </div>

//         {/* Mobile */}
//         <div className="sm:hidden flex items-center">
//           <Drawer open={open} onOpenChange={setOpen} direction="right">
//             <DrawerTrigger>
//               <Menu />
//             </DrawerTrigger>
//             <DrawerContent>
//               <div className="flex mt-8 flex-col flex-auto items-center gap-10">
//                 <Link
//                   href={"/"}
//                   className="text-lg font-semibold text-muted-foreground"
//                 >
//                   neuro<span className="text-primary">sponge</span>
//                 </Link>
//                 <div className="flex flex-col text-sm text-muted-foreground">
//                   <NavLink
//                     text={"Колоды"}
//                     href={"/search"}
//                     isActive={pathname === "/search"}
//                   />
//                   <NavLink
//                     text={"Тарифы"}
//                     href={"/pricing"}
//                     isActive={pathname === "/pricing"}
//                   />
//                 </div>
//                 <div className="flex  gap-4">
//                   <HeaderLoginButton />

//                   <ModeToggle />
//                 </div>
//               </div>
//             </DrawerContent>
//           </Drawer>
//         </div>
//       </nav>
//     </header>
//   );
// }
