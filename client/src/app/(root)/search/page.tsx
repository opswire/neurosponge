"use server";

import {
  DeckDTO,
  DeckList,
  getAllDecks,
  GetAllDecksQueryParams,
} from "@/entities";
import { AutoComplete } from "./components/autocomplete-bar";
import { SortMenu } from "./components/sort-menu";
import { Separator } from "@/shared";
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
    <main>
      {data ? (
        <div className="xl:max-w-screen-xl lg:max-w-screen-lg lg:w-10/12 mx-auto flex flex-col items-stretch mt-12 px-8 gap-12">
          <section className="hidden gap-10 w-full flex-auto sm:flex justify-between items-end">
            <SortMenu className="flex-grow-0" />
            <AutoComplete
              className="flex-grow  justify-end   "
              placeholder="Поиск по колодам..."
              emptyMessage="Совпадения не найдены"
            />
          </section>

          <section className="flex flex-col gap-4 w-full flex-auto sm:hidden justify-between items-stretch">
            <AutoComplete
              className="fw-full lex-grow"
              placeholder="Поиск по колодам..."
              emptyMessage="Совпадения не найдены"
            />
            <SortMenu className="flex-grow w-full" />
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="text-lg">
              Результаты поиска по{" "}
              <span className="text-lg font-semibold">
                "
                {searchParams["filter[search]"] &&
                  decodeURIComponent(searchParams["filter[search]"])}
                "
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
                  <p className="text-sm">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="h-screen">
          <div className=" w-full flex flex-col items-center bg-accent/40 border-y  gap-8 mt-16">
            {/* <Separator /> */}
            <div className="flex flex-col   gap-8 xl:max-w-screen-xl py-20 lg:max-w-screen-lg  w-10/12 sm:w-9/12">
              <h1 className="pl-2 scroll-m-20 text-3xl  sm:text-4xl text-primary font-semibold tracking-tight lg:text-5xl">
                {" "}
                Поиск по колодам
              </h1>
              <AutoComplete
                className=""
                placeholder="Поиск по колодам..."
                emptyMessage="Совпадения не найдены"
              />
            </div>
            {/* <Separator /> */}
          </div>
        </div>
      )}
    </main>
  );
}
