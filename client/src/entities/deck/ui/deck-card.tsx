import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DeckDTO } from "../model/deck.types";

interface Props {
  deck: DeckDTO;
}
export const DeckCard = ({ deck }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {deck.title}
        </h4>
        <p className="text-sm font-medium leading-none text-muted-foreground">
          114 карточек
        </p>
      </div>
      <div className="flex gap-2 items-center justify-start">
        <Avatar className="w-8 h-8">
          <AvatarImage sizes="16px 16px" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="leading-7 text-muted-foreground">nickname</p>
      </div>
    </>
  );
};
