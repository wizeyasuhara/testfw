import { TGuardMiddleware } from '../../../../src/index';
import { needNewFlagGuard } from './needNewFlagGuard';

type defGuard = 'needNewsFlag' | 'hoge';

export const defGuards: { [key in defGuard]: TGuardMiddleware } = {
  needNewsFlag: needNewFlagGuard,
  hoge: needNewFlagGuard,
};
