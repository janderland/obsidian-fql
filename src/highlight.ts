import { styleTags, tags as t } from "@lezer/highlight";

export const fqlHighlighting = styleTags({
  Comment: t.lineComment,

  Nil: t.atom,
  Bool: t.bool,
  SpecialFloat: t.atom,

  Clear: t.keyword,
  Remove: t.keyword,
  OptionKeyword: t.keyword,

  Int: t.integer,
  Float: t.float,
  UUID: t.number,
  Bytes: t.number,
  Vstamp: t.number,

  String: t.string,

  TypeName: t.typeName,
  "VarName/...": t.name,
  "RefName/...": t.name,
  "DirName/...": t.namespace,

  "DirSep/...": t.punctuation,
  "( )": t.punctuation,
  "=": t.punctuation,

  "< >": t.variableName,
  "|": t.variableName,
  "VarSep/...": t.variableName,
  "RefSep/...": t.variableName,
  MaybeMore: t.variableName,

  "[ ]": t.squareBracket,
  ",": t.separator,
  "OptionSep/...": t.separator,
});
