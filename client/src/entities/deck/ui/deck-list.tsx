import { DeckDTO } from "../model/deck.types";
import { DeckCard } from "./deck-card";

interface Props {
  decks: DeckDTO[];
}
export const DeckList = ({ decks }: Props) => {
  return (
    <ul className="flex flex-wrap gap-4 justify-center itmes-center items-center mb-40  ">
      {decks.map((deck) => {
        return (
          <li
            key={deck.id}
            className="min-h-24 min-w-80 hover:bg-muted border hover:border-border dark:bg-muted/40 hover:dark:bg-muted  p-8 flex flex-col gap-12 rounded-md"
          >
            <DeckCard deck={deck} />
          </li>
        );
      })}
    </ul>
  );
};
