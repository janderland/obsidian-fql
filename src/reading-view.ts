import { forEachToken } from "./language";

export function renderFqlBlock(source: string, el: HTMLElement): void {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  pre.appendChild(code);
  el.appendChild(pre);

  let pos = 0;
  forEachToken(source, (from, to, classes) => {
    if (from > pos) code.appendChild(document.createTextNode(source.slice(pos, from)));
    const span = document.createElement("span");
    span.className = classes;
    span.textContent = source.slice(from, to);
    code.appendChild(span);
    pos = to;
  });
  if (pos < source.length) {
    code.appendChild(document.createTextNode(source.slice(pos)));
  }
}
