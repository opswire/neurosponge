"use server";

import { resolveHostUrl } from "@/shared";
import { DeckDTO } from "../model/deck.types";

const HOST_URL = resolveHostUrl();

const allDecksTag = "decks";

//Will be used later

// const revalidateAllDecks = () => {
//   revalidateTag(allDecksTag);
// };

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

export async function getAllDecks(
  params?: GetAllDecksQueryParams
): Promise<{ status: number; success: boolean; data: DeckDTO[] }> {
  function constructQueryString(params = {} as GetAllDecksQueryParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        queryParams.push(`${key}=${value}`);
      }
    }

    return queryParams.join("&");
  }

  const res = await fetch(
    HOST_URL + "/deck" + "?" + constructQueryString(params),
    {
      next: { tags: [allDecksTag] },
    }
  );

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getDeckById(
  id: string
): Promise<{ status: number; success: boolean; data: DeckDTO }> {
  const res = await fetch(HOST_URL + "/deck/" + id, {
    next: { tags: [allDecksTag] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    return res.json();
  }
}
