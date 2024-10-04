import { diffWords } from "diff";

export const buildTextDiff = (textSource: string, textTarget: string) => {
  const differences = diffWords(textSource, textTarget);
  const textSourceMarked = differences
    .filter((item) => {
      return item.added === false;
    })
    .reduce((acc, item) => {
      return (
        acc +
        (item.removed
          ? `<span class="changed">${item.value}</span>`
          : item.value)
      );
    }, "");

  const textTargetMarked = differences
    .filter((item) => {
      return item.removed === false;
    })
    .reduce((acc, item) => {
      return (
        acc +
        (item.added ? `<span class="changed">${item.value}</span>` : item.value)
      );
    }, "");

  return { textSourceMarked, textTargetMarked, differences };
};
