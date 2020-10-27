import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { TDefMiddlewares } from '../../../../src/index';

export const defMiddlewares: TDefMiddlewares = {
  cookiePrser: cookieParser(),
  bodyParser: [express.json(), express.urlencoded({ extended: true })],
  enhancedSecurity: helmet(),
} as const;
