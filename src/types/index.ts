import { RequestHandler, Request, Response } from 'express';
import { TPathDifinition } from '../lib/route';
import { BaseError } from './../classes/BaseError';

/**
 * HTTPメソッド定義
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * 設定の基本形
 */
export interface IConfig {
  description?: string;
  path?: TPathDifinition;
  method?: '*' | HttpMethod | HttpMethod[];
}

export type TExpressMiddleware = RequestHandler | RequestHandler[];

/**
 * (expressの）Middleware定義
 */
export type TDefMiddlewares = {
  [key: any]: RequestHandler | RequestHandler[];
};

/**
 * Middleware設定の型
 */
export interface IConfigMiddleware<T> extends IConfig {
  middleware: T;
}

export type Req4Guard = Request;
export type Res4Guard = Response;
export interface GuardParams<T> {
  options: T;
  req: Req4Guard;
  res: Res4Guard;
}

/**
 * Guard middleware関数 の定義
 */
export interface TGuardMiddleware<T> {
  (params: GuardParams<T>): boolean | BaseError | Promise<boolean | BaseError>;
}

/**
 *  Guardの定義
 */
// export type TDefGuards = {
//   [key in HttpMethod]: TGuardMiddleware;
// };
// export interface TDefGuard<T> {
//   [key in T]: TGuardMiddleware;
// }

/**
 * Guard設定の型
 */
export interface IConfigGuard<T> extends IConfig {
  guard: T;
}

/**
 * アプリケーション設定
 */
export interface AppInitializer {
  <TypeDefExpressMiddlewares, TypeDefGuards>(middlewares: {
    express: TypeDefExpressMiddlewares;
    guards: TypeDefGuards;
  }):
    | IConfigMiddleware<keyof TypeDefExpressMiddlewares>
    | IConfigGuard<keyof TypeDefGuards>;
}
