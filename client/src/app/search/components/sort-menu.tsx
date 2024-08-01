"use client";

import { Button } from "@/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared";
import { DeckQueryParamKeys } from "@/entities";
import { useState } from "react";
import { MoveDown, MoveUp } from "lucide-react";

interface Props {
  className?: string;
}
export function SortMenu({ className }: Props) {
  const { sort_created_at, sort_id } = DeckQueryParamKeys;
  enum SortByVariants {
    none = "none",
    date = "дате",
    relevance = "популярности",
  }
  const [sortBy, setSortBy] = useState<SortByVariants>(SortByVariants.none);
  const [sortOrder, setSortOrder] = useState("desc");

  const handleValueChange = (value: SortByVariants) => {
    setSortBy(value);
    switch (value) {
      case SortByVariants.date:
        sortBy === SortByVariants.date && toggleSortOrder();
        return { [sort_created_at]: sortOrder };
      case SortByVariants.relevance:
        sortBy === SortByVariants.relevance && toggleSortOrder();
        return { [sort_id]: sortOrder };
      default:
        return {};
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger onFocus={(e) => e.target.blur()} asChild>
          <Button className="w-full border-b border-border" variant="outline">
            <div className="flex justify-stretch items-center px-2 gap-2">
              {sortBy === SortByVariants.none ? null : sortOrder === "desc" ? (
                <MoveDown className="ml-2 w-4 h-4" />
              ) : (
                <MoveUp className="ml-2 w-4 h-4" />
              )}
              <p> Сортировать {sortBy === "none" ? "" : `по ${sortBy}`}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            onValueChange={(value) =>
              handleValueChange(value as SortByVariants)
            }
          >
            <DropdownMenuRadioItem value={SortByVariants.none}>
              <p>Сбросить</p>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortBy}
            onValueChange={(value) =>
              handleValueChange(value as SortByVariants)
            }
          >
            <DropdownMenuRadioItem value={SortByVariants.date}>
              {sortBy === SortByVariants.date ? (
                sortOrder === "desc" ? (
                  <MoveDown className="ml-2 w-4 h-4" />
                ) : (
                  <MoveUp className="ml-2 w-4 h-4" />
                )
              ) : null}
              <p>Дате</p>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={SortByVariants.relevance}>
              {sortBy === SortByVariants.relevance ? (
                sortOrder === "desc" ? (
                  <MoveDown className="ml-2 w-4 h-4" />
                ) : (
                  <MoveUp className="ml-2 w-4 h-4" />
                )
              ) : null}
              <p>Популярности</p>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
