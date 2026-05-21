import { Text, RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { forEachToken } from "./language";

function findFqlBlocks(doc: Text): { from: number; to: number }[] {
  const blocks = [];
  let from = -1;
  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i);
    const text = line.text.trimStart();
    if (from < 0) {
      if (/^```\s*fql\b/.test(text)) from = line.to + 1;
    } else if (/^```\s*$/.test(text)) {
      blocks.push({ from, to: line.from });
      from = -1;
    }
  }
  return blocks;
}

function buildDecorations(view: EditorView): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  for (const block of findFqlBlocks(view.state.doc)) {
    if (block.to <= block.from) continue;
    const source = view.state.doc.sliceString(block.from, block.to);
    forEachToken(source, (from, to, classes) => {
      builder.add(block.from + from, block.from + to, Decoration.mark({ class: classes }));
    });
  }
  return builder.finish();
}

export const fqlBlockHighlighter = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = buildDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildDecorations(update.view);
      }
    }
  },
  { decorations: (v) => v.decorations },
);
