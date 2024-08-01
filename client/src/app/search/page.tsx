"use client";

import { AutoComplete } from "./components/autocomplete-bar";
import { SortMenu } from "./components/sort-menu";

export default function SearchPage() {
  const submitSearch = (value: string) => {};
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

      <div>
        <h1>Результаты поиска по </h1>
      </div>
    </main>
  );
}
