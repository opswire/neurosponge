"use client";

import { CommandGroup, CommandItem, CommandList, CommandInput } from "@/shared";
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  use,
  useEffect,
} from "react";

import { Skeleton } from "@/shared";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeckQueryParamKeys, getDeckSuggestions } from "@/entities";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

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
const MAX_SUGGESTIONS = 7;

export const AutoComplete = ({
  placeholder,
  emptyMessage,
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
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Suggestion>();

  //working with url path
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    setInputValue(value);

    setOpen(value ? true : false);

    handleSearch(value);
  };

  const handleSearch = useDebouncedCallback((queryString: string) => {
    setInputValue(queryString);

    let params = new URLSearchParams(searchParams);
    if (queryString) {
      params.set(search, encodeURIComponent(queryString));
    } else {
      params.delete(search);
    }

    replace(`${pathname}?${params.toString()}`);

    if (inputValue) {
      setLoading(true);
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
        setLoading(false);
      });
    }
  }, 500);

  //установлен на родительском компоненте инпута, т.к. к нему всплывает событие при нажатии клавиши на фокусе ввода
  //если нет ссылки на инпут, ничего не делает
  //если есть ссылка на инпут и состояние "isOpen=false", то устанавливает состояние "isOpen=true" (рендерит список подсказок)
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

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = suggestions.find(
          (suggestion) => suggestion.value === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          handleValueChange(optionToSelect.value);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, suggestions, handleValueChange]
  );

  //установлен на родительском компоненте инпута, т.к. к нему всплывает событие при блюре инпута
  //демонтирует список подсказок
  const handleBlur = useCallback(() => {
    setOpen(false);
    handleValueChange(selected?.value || "");
  }, [selected]);

  //устанавлен на CommandItem
  const handleSelectSuggestion = useCallback(
    (selectedSuggestion: Suggestion) => {
      handleValueChange(selectedSuggestion.value);

      setSelected(selectedSuggestion);
      handleValueChange(selectedSuggestion.value);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [handleValueChange]
  );

  return (
    <CommandPrimitive className={className} loop onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={handleValueChange}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
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
          <CommandList className="rounded-lg ring-1 ring-border">
            {loading ? (
              <CommandPrimitive.Loading>
                <div className=" flex flex-col gap-1">
                  {Array.from({ length: MAX_SUGGESTIONS }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-8 bg-muted/40 w-full relative"
                    >
                      <Skeleton
                        className={
                          "w-1/4 px-2 h-4 absolute bottom-0 top-0 left-4 my-auto"
                        }
                      />
                    </Skeleton>
                  ))}
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {suggestions.length > 0 && !loading ? (
              <CommandGroup className="gap-2" heading="Колоды">
                {suggestions.map((suggestion) => {
                  const isSelected = selected?.id === suggestion.id;
                  return (
                    <CommandItem
                      key={suggestion.id}
                      value={suggestion.value + suggestion.id}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectSuggestion(suggestion)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {suggestion.value + suggestion.id}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!loading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
