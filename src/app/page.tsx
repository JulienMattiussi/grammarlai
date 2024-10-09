"use client";
import { useState } from "react";
import { Result } from "./types";
import { Input } from "./components/Input";
import { Fixed } from "./components/Fixed";
import { Sidebar } from "./components/Sidebar";
import clsx from "clsx";

export default function Home() {
  const [text, setText] = useState<string>(
    "Hello im anthony and i like patatoes. wat about you ? I love doing horse. I think he is beautifull"
  );
  const [result, setResult] = useState<Result | undefined>(undefined);
  return (
    <div className="flex column">
      <div
        className={clsx(
          "grow-[2] h-screen overflow-y-scroll",
          "grid grid-rows-[20px_1fr_20px] items-center justify-items-center",
          "font-[family-name:var(--font-geist-sans)]"
        )}
      >
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Input text={text} setText={setText} setResult={setResult} />
          <Fixed text={result?.textSourceMarked} />
          <Fixed text={result?.textTargetMarked} />
        </main>
      </div>
      <div className="grow h-screen overflow-y-scroll">
        <Sidebar result={result} setResult={setResult} />
      </div>
    </div>
  );
}
