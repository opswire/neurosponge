"use client"; // Error components must be Client Components

import { Button } from "@/shared";
import { Frown } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center mt-40 gap-6  text-muted-foreground">
      <div className="group">
        <Frown className="w-40 h-40 animate-error-smile-spin transition-transform ease-in duration-300 group-hover:rotate-[360deg]  " />
      </div>

      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-center">
        Упс!
      </h1>

      <p>Кажется, что-то пошло не так...</p>
      <p>{error.message}</p>
      <Button variant={"secondary"} onClick={() => reset()}>
        Попробовать снова
      </Button>
    </div>
  );
}
