"use client";
import { useSearchParams } from "next/navigation";

export const Input = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  return (
    <form>
      <textarea
        name="query"
        className="rounded border border-solid border-black transition-colors px-4"
        defaultValue={
          query ??
          "Hello im anthony and i like patatoes. wat about you ? I love doing horse. I think he is beautifull"
        }
        rows={6}
        cols={50}
      />
      <button type="submit">Run</button>
    </form>
  );
};
