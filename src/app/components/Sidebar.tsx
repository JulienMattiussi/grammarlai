import clsx from "clsx";
import { Result } from "../types";
import { sanitizeText } from "../openAIProvider";

interface SidebarProps {
  result?: Result;
  setResult: (result: Result) => void;
}

export const Sidebar = ({ result, setResult }: SidebarProps) => {
  let firstItemAdded = false;
  const isFirstItem = () => {
    if (firstItemAdded) return false;
    firstItemAdded = true;
    return true;
  };

  const changeItem = () => {
    if (result) {
      setResult({
        ...result,
        textSourceMarked: result.textSourceMarked,
        differences: result.differences,
      });
    }
  };

  const applyAll = () => {
    if (result) {
      setResult({
        textSourceMarked: sanitizeText(result.textTargetMarked),
        textTargetMarked: sanitizeText(result.textTargetMarked),
        differences: [],
      });
    }
  };
  return (
    <aside className="border-l-4 p-4">
      <button className="bg-blue-500 text-white rounded mb-4">Apply All</button>
      <div>
        {result?.differences.map(
          (item, index) =>
            item.added && (
              <div
                key={index}
                className={clsx(
                  "border-b-2 p-4",
                  isFirstItem() && "border-t-2"
                )}
              >
                <h3 className="text-lg font-bold">{item.value}</h3>
                <h3 className="line-through">
                  {result.differences[index - 1].value}
                </h3>
              </div>
            )
        )}
      </div>
    </aside>
  );
};
