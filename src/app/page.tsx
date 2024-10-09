"use client";
import { useState } from "react";
import { Result } from "./types";
import { Input } from "./components/Input";
import { Sidebar } from "./components/Sidebar";
import clsx from "clsx";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>(
    "Hello im anthony and i like patatoes. wat about you ? I love doing horse. I think he is beautifull"
  );
  const [result, setResult] = useState<Result | undefined>(undefined);
  return (
    <div className="flex column">
      <div
        className={clsx(
          "w-8/12 h-screen",
          "grid grid-rows-[20px_1fr_20px] items-center justify-items-center",
          "font-[family-name:var(--font-geist-sans)]"
        )}
      >
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start  w-8/12">
          <Input
            text={text}
            setText={setText}
            result={result}
            setResult={setResult}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </main>
      </div>
      <div className="w-4/12 h-screen overflow-y-scroll">
        <Sidebar result={result} setResult={setResult} />
      </div>
    </div>
  );
}
