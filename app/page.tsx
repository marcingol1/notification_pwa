import { Suspense } from "react";
import { load } from "cheerio";

export const revalidate = 3600; // revalidate at most every hour

const flatsUrl = "https://www.gdl.pl/realizacje/mieszkania/perspektywa-czechow";

async function fetchSoldFlats() {
  const request = await fetch(flatsUrl, {
    mode: "no-cors",
    redirect: "follow",
  });
  const data = await request.text();
  const $ = load(data);

  const sold = $(".sold").length;
  const reserved = $('span:contains("REZERWACJA")').length;
  return { sold, reserved };
}

export default async function Home() {
  const { sold, reserved } = await fetchSoldFlats();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Suspense fallback={<div>Ładujemy mieszkania...</div>}>
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Sprzedane: <code className="font-mono font-bold">{sold}</code>
          </p>
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Rezerwacja: <code className="font-mono font-bold">{reserved}</code>
          </p>
        </Suspense>
      </div>
    </main>
  );
}
