import { Octagon } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative h-full overflow-hidden">
          <div className="relative hidden h-full flex-col p-10  lg:flex dark:border-r">
            <div className="absolute inset-0  bg-pattern-paper" />
            <p className="text-3xl font-medium text-muted-foreground space-y-4">
              Какой-нибудь текст чтобы <br /> завлечь{" "}
              <span className="text-primary">петушню</span>
            </p>
            <div className="relative z-20 mt-auto">
              <p className="text-3xl font-medium text-muted-foreground mt-auto space-y-4">
                neuro
                <span className="font-medium text-primary space-y-4">
                  sponge
                </span>
              </p>
            </div>

            <div className="absolute h-fit top-0 bottom-0 right-0  m-auto">
              <Octagon
                strokeWidth={0.01}
                className="relative lg:h-[640px] lg:w-[640px] left-1/2 rotate-12 fill-muted stroke-muted-foreground opacity-50"
              />
              <Octagon
                strokeWidth={0.01}
                className="absolute lg:h-[640px] lg:w-[640px] left-1/3 rotate-[30deg] fill-muted stroke-muted-foreground opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="lg:p-8">{children}</div>
      </div>
    </div>
  );
}
