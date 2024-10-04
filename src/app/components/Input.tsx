"use client";
import Image from "next/image";
import { Result } from "../types";
import { fetchOpenAI } from "../openAIProvider";
import { buildTextDiff } from "../buildTextDiff";

interface InputProps {
  text: string;
  setText: (text: string) => void;
  setResult: (result: Result) => void;
}

export const Input = ({ text, setText, setResult }: InputProps) => {
  const handleClick = () => {
    fetchOpenAI(text).then((correctedText) => {
      const result = buildTextDiff(text, correctedText);
      setResult(result);
      setText(result.textSourceMarked);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <textarea
        name="query"
        className="rounded border border-solid border-black transition-colors px-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        cols={50}
      />
      <button
        onClick={handleClick}
        title="Correct Me"
        className="w-10 h-10 m-4"
      >
        <Image alt="Correct Me" src="/static/logo.png" width={40} height={40} />
      </button>
    </div>
  );
};
