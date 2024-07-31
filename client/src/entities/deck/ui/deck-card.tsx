import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DeckDTO } from "../model/deck.types";

interface Props {
  deck: DeckDTO;
}
export const DeckCard = ({ deck }: Props) => {
  return (
    <div className="min-h-24 flex-auto  hover:bg-muted border hover:border-border bg-card hover:dark:bg-muted  p-8 flex flex-col gap-10 justify-between rounded-md">
      <div className="flex flex-col gap-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {deck.title}
        </h4>
        <p className="text-sm font-medium leading-none text-muted-foreground">
          {deck.cards_count} карточек
        </p>
      </div>
      <div className="flex gap-2 items-center justify-start">
        <Avatar className="w-8 h-8">
          <AvatarImage
            sizes="16px 16px"
            className="rounded"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="leading-7 text-muted-foreground">{deck.author.name}</p>
      </div>
    </div>
  );
};
