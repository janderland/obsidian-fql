# Obsidian FQL Syntax Highlighting

Adds syntax highlighting for
[FQL](https://github.com/janderland/fql) (FoundationDB
query language) to fenced code blocks in
[Obsidian](https://obsidian.md). Works in both reading 
view and the live-preview editor.

## Usage

Tag a fenced code block as `fql`:

    ```fql
    /users("alice", true)=clear
    ```

Colors come from the active theme's standard code-highlight palette.

## Installation

Not yet in the community plugin store. To install manually:

```sh
git clone git@github.com:janderland/obsidian-fql.git \
  /path/to/vault/.obsidian/plugins/fql-syntax
cd /path/to/vault/.obsidian/plugins/fql-syntax
npm install && npm run build
```

Then enable **FQL Syntax Highlighting** under Settings → Community plugins.

## License

MIT — see [LICENSE](LICENSE).
