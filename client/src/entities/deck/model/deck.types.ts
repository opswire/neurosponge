export type CardDTO = {
  id: string;
  question: string;
  answer: string;
};

export type DeckDTO = {
  id: string;
  uuid: string;
  title: string;
  cards_count: number;
  is_preview: boolean;
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
  cards: CardDTO[];
};

/*eslint-disable no-unused-vars*/
export enum DeckQueryParamKeys {
  search = "filter[search]",
  category_id = "filter[category_id]",
  author_id = "filter[author_id]",
  is_preview = "filter[is_preview]",
  sort_id = "sort[id]",
  sort_created_at = "sort[created_at]",
  page = "page",
  per_page = "per_page",
}

export type GetAllDecksQueryParams = {
  "filter[search]"?: string;
  "filter[category_id]"?: string;
  "filter[author_id]"?: string;
  "filter[is_preview]"?: boolean;
  "sort[id]"?: "asc" | "desc";
  "sort[created_at]"?: "asc" | "desc";
  page?: number;
  per_page?: number;
};
