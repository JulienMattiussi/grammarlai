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
  return (
    <aside className="border-l-4 p-4">
      {/* <button className="bg-blue-500 text-white rounded">Apply All</button> */}
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className={clsx("border-b-2 p-4", index === 0 ? "border-t-2" : "")}
          >
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p>{item.count}</p>
            <p>{item.added}</p>
            <p>{item.removed}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};
