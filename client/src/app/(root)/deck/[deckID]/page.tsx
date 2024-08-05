"use server";

import { getDeckById } from "@/entities";
import { DeckCarousel } from "./ui/deck-carousel";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { deckID: string };
}): Promise<Metadata> {
  const id = params.deckID;

  const {
    data: { title },
  } = await getDeckById(params.deckID);

  return {
    title: title,
  };
}

export default async function DeckPage({
  params,
}: {
  params: { deckID: string };
}) {
  const {
    data: { cards, title },
  } = await getDeckById(params.deckID);

  const progress = 20;
  return (
    <div className="flex min-h-screen flex-col items-center mt-20 lg:mt-40">
      <div className="flex flex-col items-center w-full max-w-[580px]  sm:max-w-screen-[580px] lg:max-w-screen-sm px-6 gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Angular
        </h3>
        <DeckCarousel
          className="w-full flex flex-col gap-4"
          flashcars={cards}
        />
      </div>
    </div>
  );
}
