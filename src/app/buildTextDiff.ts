import { diffWords } from "diff";
import { Result } from "./types";

export const buildTextDiff = (textSource: string, textTarget: string) => {
  const differences = diffWords(textSource, textTarget);
  const textSourceMarked = differences
    .filter((item) => {
      return item.added === false;
    })
    .reduce((acc, item, index) => {
      return (
        acc +
        (item.removed
          ? `<span id=${index} class="changed">${item.value}</span>`
          : item.value)
      );
    }, "");

  const textTargetMarked = differences
    .filter((item) => {
      return item.removed === false;
    })
    .reduce((acc, item, index) => {
      return (
        acc +
        (item.added
          ? `<span id=${index} class="changed">${item.value}</span>`
          : item.value)
      );
    }, "");

  const result: Result = { textSourceMarked, textTargetMarked, differences };

  return result;
};
