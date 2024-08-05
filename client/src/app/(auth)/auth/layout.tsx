import { Button } from "@/shared";
import { Octagon, X } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-stretch min-h-screen overflow-auto">
      <div className="basis-1/2 relative hidden min-h-screen flex-col p-10  sm:flex dark:border-r overflow-hidden">
        <div className="absolute inset-0  bg-pattern-paper" />
        <p className="relative z-20 text-3xl font-medium text-muted-foreground space-y-4">
          Какой-нибудь текст чтобы <br /> завлечь{" "}
          <span className="text-primary">петушню</span>
        </p>
        <div className="relative z-20 mt-auto">
          <p className="text-3xl font-medium text-muted-foreground mt-auto space-y-4">
            neuro
            <span className="font-medium text-primary space-y-4">sponge</span>
          </p>
        </div>

        <div className="absolute h-fit w-fit top-0 bottom-0 right-0 my-auto">
          <Octagon
            strokeWidth={0.01}
            className="relative sm:h-[640px] sm:w-[640px] left-1/2 rotate-12 fill-muted stroke-muted-foreground opacity-50"
          />
          <Octagon
            strokeWidth={0.01}
            className="absolute sm:h-[640px] sm:w-[640px] left-1/3 rotate-[30deg] fill-muted stroke-muted-foreground opacity-50"
          />
        </div>
      </div>

      <div className="relative basis-full sm:basis-1/2 flex justify-center items-center p-4 py-12">
        <Button
          asChild
          variant={"ghost"}
          className="absolute z-40 right-0 top-2"
        >
          <Link href={"/"} className="p-2">
            <X className="h-8 w-8" />
          </Link>
        </Button>
        <div className="flex w-full flex-col items-center justify-center sm:w-[350px] md:w-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
}
