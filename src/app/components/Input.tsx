"use client";
import Image from "next/image";
import { EditableComponent } from "./EditableComponent";
import { Result } from "../types";
import { fetchOpenAI, sanitizeText } from "../openAIProvider";
import { buildTextDiff } from "../buildTextDiff";

interface InputProps {
  text: string;
  setText: (text: string) => void;
  result: Result | undefined;
  setResult: (result: Result) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const Input = ({
  text,
  setText,
  result,
  setResult,
  isLoading,
  setIsLoading,
}: InputProps) => {
  const handleClick = () => {
    setIsLoading(true);
    fetchOpenAI(text).then((correctedText) => {
      const result = buildTextDiff(text, correctedText);
      setResult(result);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleChange = (newText: string) => {
    setResult({
      differences: [],
      textSourceMarked: newText,
      textTargetMarked: result?.textTargetMarked || "",
    });
    setText(sanitizeText(newText));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <textarea
        name="query"
        className="rounded border border-solid border-black transition-colors px-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        cols={50}
        style={{ display: "none" }}
        spellCheck={false}
      />
      <EditableComponent
        text={result?.textSourceMarked || text}
        handleChange={handleChange}
      />

      {isLoading ? (
        <div className="loader" />
      ) : (
        <button
          onClick={handleClick}
          title="Correct Me"
          className="m-4"
        >
          <Image
            alt="Correct Me"
            src="/static/logo.png"
            width={80}
            height={80}
            className="rounded-full border border-black"
          />
        </button>
      )}
    </div>
  );
};
