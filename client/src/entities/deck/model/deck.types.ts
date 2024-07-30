export type DeckDTO = {
  id: string;
  uuid: string;
  title: string;
  category: {
    id: string;
    title: string;
    color: string;
  };
};
