import { styleTags, tags as t } from "@lezer/highlight";

export const fqlHighlighting = styleTags({
  Comment: t.lineComment,

  Nil: t.atom,
  Bool: t.bool,
  SpecialFloat: t.float,

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
  "VarName/...": t.variableName,
  "RefName/...": t.variableName,
  "DirName/...": t.namespace,

  "=": t.definitionOperator,
  MaybeMore: t.punctuation,
  ",": t.separator,
  ":": t.separator,
  "|": t.operator,
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "< >": t.angleBracket,
});
