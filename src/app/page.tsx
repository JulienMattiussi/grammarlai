import { Input } from "./components/input";
import { Fixed } from "./components/fixed";
import { Sidebar } from "./components/sidebar";
import data from "./components/data.json";
import clsx from "clsx";

export default function Home() {
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
          <Input />
          <Fixed />
        </main>
      </div>
      <div className="grow h-screen overflow-y-scroll">
        <Sidebar data={data} />
      </div>
    </div>
  );
}
