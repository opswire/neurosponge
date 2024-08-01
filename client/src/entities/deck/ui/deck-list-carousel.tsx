"use client";

import { Progress, useWindowSize } from "@/shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared";
import { type CarouselApi } from "@/shared";
import { DeckList } from "./deck-list";
import { DeckDTO } from "../model/deck.types";
import { useEffect, useState } from "react";

interface Props {
  decks: DeckDTO[];
}
export function DeckListCarousel({ decks }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const currentBreakpoint = useWindowSize();

  function getDecksPerPane(bp: string) {
    switch (bp) {
      case "lg":
        return 6;
        break;
      case "md":
        return 4;
      case "sm":
        return 2;
      default:
        return 1;
    }
  }

  function getPanesTotal(decks: DeckDTO[], decksPerPane: number) {
    return Math.ceil(decks.length / decksPerPane);
  }

  const [decksPerPane, setDecksPerPane] = useState(
    getDecksPerPane(currentBreakpoint)
  );

  const [panesTotal, setPanesTotal] = useState(
    getPanesTotal(decks, decksPerPane)
  );

  const [currentPane, setCurrentPane] = useState(1);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleSelect = () => {
      setCurrentPane(carouselApi?.selectedScrollSnap() + 1);
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    setDecksPerPane(getDecksPerPane(currentBreakpoint));
    setPanesTotal(getPanesTotal(decks, decksPerPane));

    if (!carouselApi) {
      return;
    }

    carouselApi?.scrollTo(0, false);

    setCurrentPane(carouselApi?.selectedScrollSnap() + 1);
  }, [currentBreakpoint, decks, decksPerPane]);

  return (
    <>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "center",
        }}
        className="w-full max-w-72 max-h-[400px] sm:max-w-96 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg mx-auto"
      >
        <CarouselContent>
          {Array.from({
            length: panesTotal,
          }).map((_, index) => (
            <CarouselItem className="grow-1 shrink-1" key={index}>
              <DeckList
                decks={decks.slice(
                  index * decksPerPane,
                  (index + 1) * decksPerPane
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
      {panesTotal > 1 && (
        <Progress
          className="rounded-none h-[2px] position-relative"
          value={(currentPane / panesTotal) * 100}
        />
      )}
    </>
  );
}
