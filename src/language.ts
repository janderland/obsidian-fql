import { highlightTree, classHighlighter } from "@lezer/highlight";
import { parser as basePar } from "./parser/fql.parser";
import { fqlHighlighting } from "./highlight";

export const fqlParser = basePar.configure({ props: [fqlHighlighting] });

type Emit = (from: number, to: number, classes: string) => void;

const SPLITTERS: Record<string, (base: number, text: string, emit: Emit) => void> = {
  UUID: splitUUID,
  Bytes: splitBytes,
  Vstamp: splitVstamp,
  Float: splitNumber,
  Int: splitNumber,
  String: splitString,
};

export function forEachToken(source: string, emit: Emit): void {
  const tree = fqlParser.parse(source);

  const splits = new Map<number, { name: string; to: number }>();
  tree.iterate({
    enter(node) {
      if (SPLITTERS[node.name]) splits.set(node.from, { name: node.name, to: node.to });
    },
  });

  highlightTree(tree, classHighlighter, (from, to, classes) => {
    const split = splits.get(from);
    if (split && split.to === to) {
      SPLITTERS[split.name](from, source.slice(from, to), emit);
    } else {
      emit(from, to, classes);
    }
  });
}

function splitUUID(base: number, _text: string, emit: Emit): void {
  const segs = [8, 4, 4, 4, 12];
  let pos = 0;
  for (let i = 0; i < segs.length; i++) {
    emit(base + pos, base + pos + segs[i], "tok-number");
    pos += segs[i];
    if (i < segs.length - 1) {
      emit(base + pos, base + pos + 1, "tok-accent");
      pos += 1;
    }
  }
}

function splitBytes(base: number, text: string, emit: Emit): void {
  emit(base, base + 2, "tok-accent");
  if (text.length > 2) emit(base + 2, base + text.length, "tok-number");
}

function splitVstamp(base: number, text: string, emit: Emit): void {
  emit(base, base + 1, "tok-accent");
  const colonIdx = text.indexOf(":");
  if (colonIdx > 1) emit(base + 1, base + colonIdx, "tok-number");
  emit(base + colonIdx, base + colonIdx + 1, "tok-accent");
  emit(base + colonIdx + 1, base + text.length, "tok-number");
}

function splitNumber(base: number, text: string, emit: Emit): void {
  let i = 0;
  while (i < text.length) {
    const c = text.charCodeAt(i);
    if (c >= 48 && c <= 57) {
      let j = i;
      while (j < text.length) {
        const cj = text.charCodeAt(j);
        if (cj < 48 || cj > 57) break;
        j++;
      }
      emit(base + i, base + j, "tok-number");
      i = j;
    } else {
      emit(base + i, base + i + 1, "tok-accent");
      i++;
    }
  }
}

function splitString(base: number, text: string, emit: Emit): void {
  let i = 0;
  let chunkStart = 0;
  while (i < text.length) {
    if (text[i] === "\\" && i + 1 < text.length) {
      if (i > chunkStart) emit(base + chunkStart, base + i, "tok-string");
      emit(base + i, base + i + 2, "tok-escape");
      i += 2;
      chunkStart = i;
    } else {
      i++;
    }
  }
  if (chunkStart < text.length) emit(base + chunkStart, base + text.length, "tok-string");
}
