import { Plugin } from "obsidian";
import { fqlBlockHighlighter } from "./editor-extension";
import { renderFqlBlock } from "./reading-view";

export default class FQLPlugin extends Plugin {
  async onload(): Promise<void> {
    this.registerMarkdownCodeBlockProcessor("fql", renderFqlBlock);
    this.registerEditorExtension(fqlBlockHighlighter);
  }
}
