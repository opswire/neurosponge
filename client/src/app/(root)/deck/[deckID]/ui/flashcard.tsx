"use client";
import { cn } from "@/shared/";
import { Button, Card, CardContent, CardFooter, CardHeader } from "@/shared";
import { Lightbulb, Star, Volume2 } from "lucide-react";
import { useState } from "react";

interface Props {
  cardQuestion: string;
  cardAnswer: string;
}
export function Flashcard({ cardAnswer, cardQuestion }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [effect, setEffect] = useState(false);
  return (
    <div className="perspective-1600">
      <Card
        className={cn(
          "flex flex-col h-96 sm:h-96 justify-between",
          effect && " animate-flashcard-flip"
        )}
        onAnimationEnd={() => setEffect(false)}
        onClick={() => {
          setIsFlipped(!isFlipped);
          setEffect(true);
        }}
      >
        <CardHeader className="flex-grow-0 shrink-0 basis-3/12 p-4">
          <div className="flex justify-between text-muted-foreground">
            <div>
              <Button
                className="flex gap-2"
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Lightbulb className="w-4 h-4" />
                <p>Hint</p>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col align-center justify-center flex-grow basis-6/12 py-8 overflow-y-auto overflow-x-hidden">
          {isFlipped ? (
            <p className="text-center">{cardAnswer}</p>
          ) : (
            <p className="text-center">{cardQuestion}</p>
          )}
        </CardContent>

        <CardFooter className="flex-grow-0 shrink-0 basis-3/12 justify-center md:space-around gap-4 p-4">
          {isFlipped && (
            <>
              <Button
                className="flex-shrink basis-1/2 md:shrink-0 md:basis-40"
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Не знаю
              </Button>
              <Button
                className="flex-shrink basis-1/2 md:shrink-0 md:basis-40"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Знаю
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
