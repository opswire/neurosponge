"use server";
import { Button, Separator } from "@/shared";
import Link from "next/link";
import { DeckListCarousel } from "../entities/deck/ui/deck-list-carousel";
import { getAllDecks } from "../entities";

export default async function Home() {
  // const { data: decks } = await getAllDecks({ "filter[is_preview]": true });
  const { data: decks } = await getAllDecks();

  return (
    <main className="lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div>
        <section className="mt-24 min-h-[640px]">
          <Separator />
          <div className="flex flex-col gap-12 justify-center items-center py-20">
            <h1 className="scroll-m-20 text-4xl text-muted-foreground font-bold tracking-tight lg:text-5xl p-6 text-center">
              Почувстувуй силу своих{" "}
              <span className="text-primary font-extrabold">нейронов</span>
            </h1>
            <p className="text-xl text-muted-foreground p-8 w:3/4 sm:w-2/3 text-center">
              Раскрой потенциал своей памяти c{" "}
              <span className="text-primary font-medium">
                самым эффективным
              </span>{" "}
              алгоритмом интервального повторения на базе искусственного
              интеллекта
            </p>
          </div>
          <Separator />
        </section>
        <div className="flex flex-col gap-40">
          <section className="flex flex-col gap-12 items-stretch ">
            <h2 className="w-fit self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Как это работает?
            </h2>
            <div className="bg-pattern-paper min-h-[640px] flex-auto"></div>
          </section>
          <section className="flex flex-col gap-12 items-center mb-40">
            <Separator />

            {decks.length > 0 && (
              <>
                <h2 className="w-fit self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Популярные колоды
                </h2>
                <div className="flex flex-col items-center gap-12">
                  <DeckListCarousel decks={decks} />
                  <Link href={"/search"}>
                    <Button className="w-80" variant={"secondary"}>
                      Посмотреть все
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
