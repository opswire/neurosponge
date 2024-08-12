import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Link from "next/link";
import { UserDTO } from "@/entities/user";

export const ProfileButton: React.FC<{ user: UserDTO }> = ({ user }) => {
  return (
    <Link className="flex gap-2 items-center justify-start" href={"/profile"}>
      <Avatar className="w-10 h-10 rounded border border-border">
        <AvatarImage className="rounded" src="https://github.com/shadcn.png" />
        <AvatarFallback className="w-full h-full rounded bg-muted flex justify-center items-center">
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <p className="leading-7 text-muted-foreground">{user.name}</p>
    </Link>
  );
};
