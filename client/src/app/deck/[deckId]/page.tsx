"use server";

import { getDeckById } from "@/entities";
import { DeckCarousel } from "./ui/deck-carousel";

export default async function DeckPage({
  params,
}: {
  params: { deckId: string };
}) {
  const { data: deck } = await getDeckById(params.deckId);

  const progress = 20;
  return (
    <div className="flex min-h-screen flex-col items-center mt-20 lg:mt-40">
      <div className="flex flex-col items-center w-full max-w-[580px]  sm:max-w-screen-[580px] lg:max-w-screen-sm px-6 gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Angular
        </h3>
        <DeckCarousel
          className="w-full flex flex-col gap-4"
          flashcars={[
            {
              cardQuestion: "Lorem ipsum dolor sit amet",
              cardAnswer:
                "Lacus dictumst dictumst gravida litora dignissim lacus. Ante lacus maximus nam eget senectus posuere eros. Porta laoreet posuere elementum arcu nascetur risus tortor volutpat. Quisque luctus morbi mus fames nulla pellentesque? Cras et vel vehicula interdum lobortis consequat arcu laoreet metus. Neque suspendisse nam posuere augue nunc; ultricies dui accumsan. Purus rutrum accumsan montes taciti et mus. Sed dignissim viverra placerat commodo; tempor habitasse sagittis. Feugiat blandit at nascetur; rutrum inceptos malesuada lacus.",
            },
            {
              cardQuestion: "Lorem ipsum dolor sit amet",
              cardAnswer:
                "Lacus dictumst dictumst gravida litora dignissim lacus. Ante lacus maximus nam eget senectus posuere eros. Porta laoreet posuere elementum arcu nascetur risus tortor volutpat. Quisque luctus morbi mus fames nulla pellentesque? Cras et vel vehicula interdum lobortis consequat arcu laoreet metus. Neque suspendisse nam posuere augue nunc; ultricies dui accumsan. Purus rutrum accumsan montes taciti et mus. Sed dignissim viverra placerat commodo; tempor habitasse sagittis. Feugiat blandit at nascetur; rutrum inceptos malesuada lacus.",
            },
            {
              cardQuestion: "Lorem ipsum dolor sit amet",
              cardAnswer:
                "Lacus dictumst dictumst gravida litora dignissim lacus. Ante lacus maximus nam eget senectus posuere eros. Porta laoreet posuere elementum arcu nascetur risus tortor volutpat. Quisque luctus morbi mus fames nulla pellentesque? Cras et vel vehicula interdum lobortis consequat arcu laoreet metus. Neque suspendisse nam posuere augue nunc; ultricies dui accumsan. Purus rutrum accumsan montes taciti et mus. Sed dignissim viverra placerat commodo; tempor habitasse sagittis. Feugiat blandit at nascetur; rutrum inceptos malesuada lacus.",
            },
            {
              cardQuestion: "Lorem ipsum dolor sit amet",
              cardAnswer:
                "Lacus dictumst dictumst gravida litora dignissim lacus. Ante lacus maximus nam eget senectus posuere eros. Porta laoreet posuere elementum arcu nascetur risus tortor volutpat. Quisque luctus morbi mus fames nulla pellentesque? Cras et vel vehicula interdum lobortis consequat arcu laoreet metus. Neque suspendisse nam posuere augue nunc; ultricies dui accumsan. Purus rutrum accumsan montes taciti et mus. Sed dignissim viverra placerat commodo; tempor habitasse sagittis. Feugiat blandit at nascetur; rutrum inceptos malesuada lacus.",
            },
            {
              cardQuestion: "Lorem ipsum dolor sit amet",
              cardAnswer:
                "Lacus dictumst dictumst gravida litora dignissim lacus. Ante lacus maximus nam eget senectus posuere eros. Porta laoreet posuere elementum arcu nascetur risus tortor volutpat. Quisque luctus morbi mus fames nulla pellentesque? Cras et vel vehicula interdum lobortis consequat arcu laoreet metus. Neque suspendisse nam posuere augue nunc; ultricies dui accumsan. Purus rutrum accumsan montes taciti et mus. Sed dignissim viverra placerat commodo; tempor habitasse sagittis. Feugiat blandit at nascetur; rutrum inceptos malesuada lacus.",
            },
            {
              cardQuestion: "Lorem ipsum dolor sit amet",
              cardAnswer:
                "Lacus dictumst dictumst gravida litora dignissim lacus. Ante lacus maximus nam eget senectus posuere eros. Porta laoreet posuere elementum arcu nascetur risus tortor volutpat. Quisque luctus morbi mus fames nulla pellentesque? Cras et vel vehicula interdum lobortis consequat arcu laoreet metus. Neque suspendisse nam posuere augue nunc; ultricies dui accumsan. Purus rutrum accumsan montes taciti et mus. Sed dignissim viverra placerat commodo; tempor habitasse sagittis. Feugiat blandit at nascetur; rutrum inceptos malesuada lacus.",
            },
          ]}
        />
      </div>
    </div>
  );
}
