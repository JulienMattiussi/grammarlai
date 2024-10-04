import clsx from "clsx";
import { Result } from "../types";
// import { sanitizeText } from "../openAIProvider";
import Image from "next/image";

interface SidebarProps {
  result?: Result;
  setResult: (result: Result) => void;
}

export const Sidebar = ({ result, setResult }: SidebarProps) => {
  if (!result) return null;
  let firstItemAdded = false;
  const isFirstItem = () => {
    if (firstItemAdded) return false;
    firstItemAdded = true;
    return true;
  };

  const applyChange = (index: number) => {
    console.log("index", index);
    console.log(result);
    const newTextSourceMarked = result.textSourceMarked.replace(
      `<span id=${index} class="changed">${result.differences[index].value}</span>`,
      result.differences[index + 1].value
    );
    const newDifferences = result.differences.filter(
      (item, i) => i !== index && i !== index + 1
    );
    setResult({
      ...result,
      textSourceMarked: newTextSourceMarked,
      differences: newDifferences,
    });
    console.log(result);
  };

  const applyAll = () => {
    setResult({
      textSourceMarked: result.textTargetMarked,
      textTargetMarked: result.textTargetMarked,
      differences: [],
    });
  };

  return (
    <aside className="border-l-4 p-4">
      <button
        className="bg-blue-500 text-white rounded mb-4"
        onClick={applyAll}
      >
        Apply All
      </button>
      <div>
        {result.differences.map(
          (item, index) =>
            item.removed && (
              <div
                key={index}
                className={clsx(
                  "border-b-2 p-4",
                  isFirstItem() && "border-t-2",
                  "flex justify-between items-center"
                )}
              >
                <div>
                  <h3 className="text-lg font-bold">
                    {result.differences[index + 1].value}
                  </h3>
                  <h3 className="line-through">{item.value}</h3>
                </div>
                <button onClick={() => applyChange(index)}>
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
