import { diffWords } from "diff";
import { Result } from "./types";

export const buildTextDiff = (
  textSource: string,
  textTarget: string
): Result => {
  const differences = diffWords(textSource, textTarget);
  const textSourceMarked = differences
    .map((item, index) => {
      return { ...item, index };
    })
    .filter((item) => {
      return item.added === false;
    })
    .reduce((acc, item) => {
      return (
        acc +
        (item.removed
          ? `<span id=${item.index} class="changed">${item.value}</span>`
          : item.value)
      );
    }, "");

  const textTargetMarked = differences
    .filter((item) => {
      return item.removed === false;
    })
    .reduce((acc, item) => {
      return acc + item.value;
    }, "");

  return { textSourceMarked, textTargetMarked, differences };
};
