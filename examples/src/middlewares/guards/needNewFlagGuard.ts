import { TGuardMiddleware, Req4Guard, Res4Guard } from '../../../../src/index';

export const needNewFlagGuard: TGuardMiddleware<undefined> = (params: {
  req: Req4Guard;
}): boolean => !!params.req.body.new;
