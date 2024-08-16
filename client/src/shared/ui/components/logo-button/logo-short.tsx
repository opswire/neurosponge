import Link from "next/link";

function LogoShort() {
  return (
    <div className="flex py-2 items-center justify-center">
      <Link
        href={"/"}
        className="text-4xl font-semibold text-muted-foreground inline-flex items-center justify-center px-4 py-2"
      >
        <p>
          N<span className="text-primary">S</span>
        </p>
      </Link>
    </div>
  );
}

export { LogoShort };
