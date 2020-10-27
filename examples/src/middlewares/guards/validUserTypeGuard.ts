import { TGuardMiddleware, Req4Guard, Res4Guard } from '../../../../src/index';

type UserType = 'expert' | 'orderer' | 'unknown';

export const validUserTypeGuard: TGuardMiddleware<UserType> = (params: {
  options: UserType;
  req: Req4Guard;
}): boolean => {
  if (params.options === 'orderer') {
    return !!params.req.body.orderer_id;
  } else if (params.options === 'expert') {
    return !!params.req.body.expert_id;
  } else {
    return false;
  }
};
