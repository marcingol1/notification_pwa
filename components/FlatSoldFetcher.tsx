import React from "react";
import { load } from "cheerio";

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

export async function FlatSoldFetcher() {
  const { sold, reserved } = await fetchSoldFlats();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Sprzedane: <code className="font-mono font-bold">{sold}</code>
      </p>
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Rezerwacja: <code className="font-mono font-bold">{reserved}</code>
      </p>
    </div>
  );
}
