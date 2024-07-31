import { DeckDTO } from "../model/deck.types";
import { DeckCard } from "./deck-card";

interface Props {
  decks: DeckDTO[];
}
export const DeckList = ({ decks }: Props) => {
  return (
    <div className="flex h-full flex-wrap gap-4 justify-stretch itmes-stretch">
      {decks.map((deck) => {
        return <DeckCard key={deck.id} deck={deck} />;
      })}
    </div>
  );
};
