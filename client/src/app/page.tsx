"use server";
import { DeckList, getAllDecks } from "@/entities";

export default async function Home() {
  const { data: decks } = await getAllDecks({
    "sort[created_at]": "desc",
    per_page: 1,
    page: 1,
  });
  return (
    <main className="lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div>
        <section className="mt-24 min-h-[640px]">
          <div className="flex flex-col gap-12 justify-center items-center pt-8">
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
        </section>
        <div className="flex flex-col gap-40">
          <section className="flex flex-col gap-12 items-stretch ">
            <p className="w-fit self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Как это работает?
            </p>
            <div className="bg-pattern-paper min-h-[640px] flex-auto"></div>
          </section>
          <section className="flex flex-col gap-12 items-stretch ">
            <p className="w-fit self-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Популярные колоды
            </p>
            <DeckList decks={decks} />
          </section>
        </div>
      </div>
    </main>
  );
}
