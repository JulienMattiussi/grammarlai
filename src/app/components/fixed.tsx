"use client";
import { fetchOpenAI } from "@/openAIProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Fixed = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (!query) return;
    fetchOpenAI(query).then((answer) => setAnswer(answer));
  }, [answer, query]);

  return (
    <textarea
      disabled={!!answer}
      readOnly={!answer}
      className="rounded border border-solid border-black transition-colors px-4"
      value={answer}
      rows={6}
      cols={50}
    />
  );
};
