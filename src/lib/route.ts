import { pathToRegexp } from 'path-to-regexp';

// ###### type
type TExpressPathDifinition = string | RegExp | Array<string | RegExp>;

type TPathType = 'include' | 'exclude';

type TPathDifinitionObject = {
  type: TPathType;
  path: TExpressPathDifinition;
};

type TConvertedPathDifinitionObject = {
  type: TPathType;
  path: RegExp[];
};

export type TPathDifinition =
  | TExpressPathDifinition
  | TPathDifinitionObject
  | Array<TPathDifinitionObject>;

// ###### type guard

const isStringOrRegExp = (x: unknown): x is string | RegExp =>
  typeof x === 'string' || x instanceof RegExp;

const isExpressPathDifinition = (x: unknown): x is TExpressPathDifinition =>
  !Array.isArray(x) ? isStringOrRegExp(x) : x.every(isStringOrRegExp);

// ##### convert TPathDifinition to TConvertedPathDifinitionObject[]

const str2regexp = (str: string | RegExp) =>
  typeof str === 'string' ? pathToRegexp(str) : str;

const expressPathDifinition2RegExpArr = (
  expressPathDifinition: TExpressPathDifinition
): RegExp[] =>
  (Array.isArray(expressPathDifinition)
    ? expressPathDifinition
    : [expressPathDifinition]
  ).map(str2regexp);

const toConvertedPathDifinitionObjects = (
  pathDifinition: TPathDifinition
): TConvertedPathDifinitionObject[] =>
  isExpressPathDifinition(pathDifinition)
    ? [
        {
          type: 'include',
          path: expressPathDifinition2RegExpArr(pathDifinition),
        },
      ]
    : (Array.isArray(pathDifinition)
        ? pathDifinition
        : [pathDifinition]
      ).map((v) => ({ ...v, path: expressPathDifinition2RegExpArr(v.path) }));

// ##### match

const matchWithRegexp = (regexpArr: RegExp[], path: string) =>
  regexpArr.some((v) => v.test(path));

const _isMatch = (
  pathDef: TConvertedPathDifinitionObject,
  path: string
): boolean =>
  pathDef.type === 'include'
    ? matchWithRegexp(pathDef.path, path)
    : !matchWithRegexp(pathDef.path, path);

export const isMatch = (
  pathDifinition: TPathDifinition,
  path: string
): boolean =>
  toConvertedPathDifinitionObjects(pathDifinition).every((v) =>
    _isMatch(v, path)
  );

// isMatch をこんな風にすると、フレームワークでより使いやすいかな。
export const createRouteMatcher = (
  pathDifinition: TPathDifinition
): ((path: string) => boolean) => {
  const pathExp = toConvertedPathDifinitionObjects(pathDifinition);
  return (path: string) => pathExp.every((v) => _isMatch(v, path));
};
