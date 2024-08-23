"use client";

import { DeckQueryParamKeys } from "@/entities";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Toggle,
  SelectSeparator,
} from "@/shared";
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}
export function SortMenu({ className }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { sort_created_at, sort_id } = DeckQueryParamKeys;
  const searchParams = useSearchParams();

  /*eslint-disable no-unused-vars */
  enum SortingOptions {
    relevance = "relevance",
    date = "date",
    none = "none",
  }

  const { relevance, date, none } = SortingOptions;

  const [by, setBy] = useState<SortingOptions>(none);
  const [isAsc, setAsc] = useState(false);

  const handleSortingChange = (value: SortingOptions) => {
    setBy(value);

    if (value === none) {
      setAsc(false);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(sort_created_at);
    params.delete(sort_id);

    switch (by) {
      case date:
        params.set(sort_created_at, isAsc ? "asc" : "desc");
        break;
      case relevance:
        params.set(sort_id, isAsc ? "asc" : "desc");
        break;
      case none:
        break;
    }
    replace(`${pathname}?${params.toString()}`);
  }, [by, isAsc]);

  return (
    <div className={className + " flex gap-2"}>
      <Select
        onValueChange={(value) => {
          handleSortingChange(value as SortingOptions);
        }}
      >
        <SelectTrigger className="flex-grow  min-w-40 ">
          <SelectValue placeholder="Сортировать" />
        </SelectTrigger>
        <SelectContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          position="popper"
          arrowPadding={8}
        >
          <SelectGroup>
            <SelectItem value={none} textValue="Сортировать">
              По умолчанию
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Сортировать</SelectLabel>
            <SelectItem value={relevance}>По релевантности</SelectItem>
            <SelectItem value={date}>По дате</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Toggle
        disabled={by === none}
        pressed={isAsc}
        onPressedChange={() => setAsc((prev) => !prev)}
      >
        {isAsc ? (
          <ArrowDownNarrowWide className="w-4 h-4" />
        ) : (
          <ArrowDownWideNarrow className="w-4 h-4" />
        )}
      </Toggle>
    </div>
  );
}
