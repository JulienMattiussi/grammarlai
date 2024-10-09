import { type Change } from "diff";

export interface Result {
  textSourceMarked: string;
  textTargetMarked: string;
  differences: Array<Change & { index: number }>;
}
