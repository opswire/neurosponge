"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Progress,
} from "@/shared";

import { useEffect, useState } from "react";
import { Flashcard } from "./flashcard";
import { CardDTO } from "@/entities";

interface Props {
  className?: string;
  flashcars: CardDTO[];
}
export function FlashcardCarousel({ className, flashcars }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0.05);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleSelect = () => {
      setCurrentIndex(carouselApi?.selectedScrollSnap() + 1);
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  return (
    <div className={className}>
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "center",
        }}
      >
        <CarouselContent>
          {flashcars.map((_, index) => (
            <CarouselItem className="grow-1 shrink-1" key={index}>
              <Flashcard
                cardQuestion={flashcars[index].question}
                cardAnswer={flashcars[index].answer}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
      {flashcars.length > 1 && (
        <Progress
          className="rounded-none h-[2px] position-relative"
          value={(currentIndex / flashcars.length) * 100}
        />
      )}
    </div>
  );
}
