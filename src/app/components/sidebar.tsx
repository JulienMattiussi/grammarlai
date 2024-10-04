import clsx from "clsx";

interface DataItem {
  count: number;
  added: boolean;
  removed: boolean;
  value: string;
}

interface SidebarProps {
  data: DataItem[];
}

export const Sidebar = ({ data }: SidebarProps) => {
  let firstItemAdded = false;
  const isFirstItem = () => {
    if (firstItemAdded) return false;
    firstItemAdded = true;
    return true;
  };
  return (
    <aside className="border-l-4 p-4">
      <button className="bg-blue-500 text-white rounded mb-4">Apply All</button>
      <div>
        {data.map(
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
                <h3 className="line-through">{data[index - 1].value}</h3>
              </div>
            )
        )}
      </div>
    </aside>
  );
};
