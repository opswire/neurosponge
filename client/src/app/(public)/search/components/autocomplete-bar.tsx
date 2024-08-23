"use client";

import { CommandGroup, CommandItem, CommandList, CommandInput } from "@/shared";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

import { Search } from "lucide-react";
import { cn } from "@/shared/";
import { DeckQueryParamKeys, getDeckSuggestions } from "@/entities";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

//ожидаемое поведение:
// при переходе с другой страницы:
// + строка поиска пустая
// (при нажатии на alt почему-то отображается)+ при нажатии на строку поиска она становится активной но выпадающий список не отображается
// +при вводе первого символа появляется выпадающий список с двумя группами поиск (там дублируется значение строки поиска) и подсказки, подсвечивается строка поиска
// + через некоторый промежуток времени после остановки ввода подсказки обновляются
// + если нажать на enter с введенным значением и подсвеченным поиском, то выпадающий список скрывается и в url попадает значение из строки поиска
//+ если нажать на enter с подсвеченной подсказкой, то эта подсказка отображается в строке поиска и в url

type Suggestion = {
  id: string;
  value: string;
};

type AutoCompleteProps = {
  emptyMessage: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const SUGGESTION_DEBOUNCE_TIME = 500;
const MAX_SUGGESTIONS = 7;

export const AutoComplete = ({
  placeholder,
  disabled = false,
  className,
}: AutoCompleteProps) => {
  const { search } = DeckQueryParamKeys;
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(
    decodeURIComponent(searchParams.get(search) || "")
  );

  const [isOpen, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const { replace } = useRouter();
  const pathname = usePathname();

  //получение подсказок при вводе
  //будет вызвана спустя SUGGESTION_DEBOUNCE_TIME после последнего ввода символа
  const debouncedGetSuggestions = useDebouncedCallback(() => {
    if (inputValue) {
      getDeckSuggestions({
        "filter[search]": inputValue,
        per_page: MAX_SUGGESTIONS,
      }).then((responseJson) => {
        setSuggestions(
          responseJson.data.map((deck) => ({
            id: deck.id,
            value: deck.title,
          }))
        );
      });
    }
  }, SUGGESTION_DEBOUNCE_TIME);

  const handleValueChange = useCallback(
    (value: string) => {
      setInputValue(value);
      setOpen(value ? true : false);
      debouncedGetSuggestions();
    },
    [setInputValue, setOpen, debouncedGetSuggestions]
  );

  //применение поискового запроса
  const handleSearch = useDebouncedCallback((queryString: string) => {
    setInputValue(queryString);

    let params = new URLSearchParams(searchParams);
    if (queryString) {
      params.set(search, encodeURIComponent(queryString));
    } else {
      params.delete(search);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  //установлен на родительском компоненте инпута, т.к. к нему всплывает событие при нажатии клавиши на фокусе ввода
  //если нет рефа на инпут, ничего не делает
  //если есть реф на инпут и состояние "isOpen=false", то устанавливает состояние "isOpen=true" (рендерит список подсказок)
  //при нажатии эскейпа инпут блюрится
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      if (input.value === "") {
        setOpen(false);
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen]
  );

  //установлен на родительском компоненте инпута, т.к. к нему всплывает событие при блюре инпута
  //демонтирует список подсказок, в поисковую строку вставляет последнее выбранное из подсказок значение или очищает
  const handleBlur = useCallback(() => {
    setOpen(false);
  }, []);

  //устанавлен на CommandItem
  const handleSelect = useCallback(
    (value: string) => {
      handleValueChange(value);
      handleSearch(value);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [handleValueChange, handleSearch]
  );

  return (
    <CommandPrimitive
      className={className}
      filter={(value, search) => {
        if (value.toLowerCase().startsWith(search)) {
          return 1;
        } else {
          return 0;
        }
      }}
      loop
      onKeyDown={handleKeyDown}
    >
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={handleValueChange}
          onFocus={() => inputRef?.current?.value && setOpen(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="text-sm"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-popover outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-border py-4 h-fit">
            {inputValue && (
              <CommandGroup forceMount heading={`Искать "${inputValue}"`}>
                <CommandItem
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  className="pl-8"
                  value={inputValue}
                  onSelect={handleSelect}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {inputValue}
                </CommandItem>
              </CommandGroup>
            )}
            <CommandGroup heading="Колоды">
              {isOpen
                ? suggestions.map((suggestion) => {
                    return (
                      <CommandItem
                        key={suggestion.id}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={handleSelect}
                        className="flex w-full items-center gap-2 pl-8"
                      >
                        {suggestion.value}
                      </CommandItem>
                    );
                  })
                : null}
            </CommandGroup>
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
