import clsx from "clsx";
import { Result } from "../types";
import Image from "next/image";
import { highlightSearchTerm } from "highlight-search-term";
import { useState } from "react";

interface SidebarProps {
  result?: Result;
  setResult: (result: Result) => void;
}

export const Sidebar = ({ result, setResult }: SidebarProps) => {
  const [search, setSearch] = useState<string>("");
  const [selector, setSelector] = useState<number>(0);

  highlightSearchTerm({ search: search, selector: `.changed-${selector}` });

  if (
    !result ||
    result?.differences.filter((item) => item.removed).length === 0
  )
    return null;
  let firstItemAdded = false;
  const isFirstItem = () => {
    if (firstItemAdded) return false;
    firstItemAdded = true;
    return true;
  };

  const applyChange = (index: number) => {
    const newTextSourceMarked = result.textSourceMarked.replace(
      `<span id=${index} class="changed changed-${index}">${
        result.differences.find((item) => item.index === index)!.value
      }</span>`,
      result.differences.find((item) => item.index === index + 1)!.value
    );
    const newDifferences = result.differences.filter(
      (item) => item.index !== index && item.index !== index + 1
    );
    setResult({
      ...result,
      textSourceMarked: newTextSourceMarked,
      differences: newDifferences,
    });
  };

  const applyAll = () => {
    setResult({
      textSourceMarked: result.textTargetMarked,
      textTargetMarked: result.textTargetMarked,
      differences: [],
    });
  };

  return (
    <aside className="border-l-4 p-4 h-full">
      <button
        className="bg-blue-500 text-white rounded p-2 mb-4 w-full"
        onClick={applyAll}
      >
        Apply All
      </button>
      <div>
        {result.differences.map(
          (item) =>
            item.removed && (
              <div
                key={item.index}
                className={clsx(
                  "border-b-2 p-4",
                  isFirstItem() && "border-t-2",
                  "flex justify-between items-center"
                )}
                onMouseOver={()=>{
                  setSearch(item.value)
                  setSelector(item.index)
                }}
                onMouseOut={()=>{
                  setSearch("")
                  setSelector(0)
                }}
              >
                <div>
                  <h3 className="text-lg font-bold">
                    {
                      result.differences.find(
                        (r) => (r.index === item.index + 1)
                      )!.value
                    }
                  </h3>
                  <h3 className="line-through">{item.value}</h3>
                </div>
                <button onClick={() => applyChange(item.index)}>
                  <Image
                    alt="Apply suggestion"
                    src="/static/logo_transparent.png"
                    width={30}
                    height={30}
                  />
                </button>
              </div>
            )
        )}
      </div>
    </aside>
  );
};
