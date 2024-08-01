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

interface Props {
  className?: string;
}
export function SortMenu({ className }: Props) {
  const { sort_created_at, sort_id } = DeckQueryParamKeys;
  const [sortBy, setSortyBy] = useState("none");

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full border-b border-border" variant="outline">
            Сортировать {sortBy === "none" ? "" : sortBy}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortyBy}>
            <DropdownMenuRadioItem value={sort_created_at}>
              Дате
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={sort_id}>
              Популярности
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
