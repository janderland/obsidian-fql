import { highlightTree, classHighlighter } from "@lezer/highlight";
import { parser as basePar } from "./parser/fql.parser";
import { fqlHighlighting } from "./highlight";

export const fqlParser = basePar.configure({ props: [fqlHighlighting] });

export function forEachToken(
  source: string,
  emit: (from: number, to: number, classes: string) => void,
): void {
  const tree = fqlParser.parse(source);
  highlightTree(tree, classHighlighter, emit);
}
