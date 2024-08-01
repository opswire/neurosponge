"use server";

import { DeckList, getAllDecks, GetAllDecksQueryParams } from "@/entities";
import { AutoComplete } from "./components/autocomplete-bar";
import { SortMenu } from "./components/sort-menu";
import { SeparatorHorizontal } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: GetAllDecksQueryParams;
}) {
  const {} = searchParams;
  const data = await getAllDecks({
    ...searchParams,
  });
  return (
    <main className="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto flex flex-col items-stretch mt-12 px-8 gap-12">
      <div className="hidden gap-10 w-full flex-auto sm:flex justify-between items-end">
        <SortMenu className="flex-grow-0" />
        <AutoComplete
          className="flex-grow  justify-end   "
          placeholder="Поиск по колодам..."
          emptyMessage="Совпадения не найдены"
        />
      </div>

      <div className="flex flex-col gap-4 w-full flex-auto sm:hidden justify-between items-stretch">
        <AutoComplete
          className="fw-full lex-grow"
          placeholder="Поиск по колодам..."
          emptyMessage="Совпадения не найдены"
        />
        <SortMenu className="flex-grow w-full" />
      </div>

      <div className="flex flex-col gap-8">
        <h1>
          Результаты поиска по{" "}
          <span className="text-lg font-semibold">
            "{searchParams["filter[search]"]}"
          </span>
        </h1>
        <div>
          <DeckList decks={data.data} />
        </div>
      </div>
    </main>
  );
}
