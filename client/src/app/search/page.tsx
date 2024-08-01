import { AutoComplete } from "./components/autocomplete-bar";
import { SortMenu } from "./components/sort-menu";

export default function SearchPage() {
  return (
    <main className="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto flex flex-col items-stretch mt-12 px-8">
      <div className="hidden gap-10 w-full flex-auto sm:flex justify-between items-end">
        <SortMenu className="w-1/4" />
        <AutoComplete
          className="flex-grow w-3/4 justify-end xl:max-w-screen-lg lg:max-w-screen-md md:max-w-screen-sm sm:max-w-96"
          placeholder="Поиск по колодам..."
          emptyMessage="Совпадения не найдены"
        />
      </div>

      <div className="flex flex-col gap-4 w-full flex-auto sm:hidden justify-between items-center">
        <AutoComplete
          className="flex-grow"
          placeholder="Поиск по колодам..."
          emptyMessage="Совпадения не найдены"
        />
        <SortMenu className="self-end" />
      </div>
    </main>
  );
}
