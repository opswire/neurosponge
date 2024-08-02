"use server";

import {
  DeckDTO,
  DeckList,
  getAllDecks,
  GetAllDecksQueryParams,
} from "@/entities";
import { AutoComplete } from "./components/autocomplete-bar";
import { SortMenu } from "./components/sort-menu";
export default async function SearchPage({
  searchParams,
}: {
  searchParams: GetAllDecksQueryParams;
}) {
  let data: DeckDTO[] | null;
  if (searchParams["filter[search]"]) {
    const respondeData = await getAllDecks({ ...searchParams });
    data = respondeData.data;
  } else {
    data = null;
  }

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

      {data ? (
        <div className="flex flex-col gap-8">
          <h1 className="text-lg">
            Результаты поиска по{" "}
            <span className="text-lg font-semibold">
              "{searchParams["filter[search]"]}"
            </span>
          </h1>
          <div>
            {data.length > 0 ? (
              <DeckList decks={data} />
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold">
                  {"Ничего не найдено :("}
                </h2>
                <p className="text-sm">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
