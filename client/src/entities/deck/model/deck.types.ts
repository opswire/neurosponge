export type DeckDTO = {
  id: string;
  uuid: string;
  title: string;
  cards_count: number;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    title: string;
    color: string;
  };
};
