export * from './types/index';

// import express, {
//   RequestHandler,
//   ErrorRequestHandler,
//   Router,
//   Request,
//   Response,
//   NextFunction,
// } from 'express';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';

// type Middleware = RequestHandler | ErrorRequestHandler;

// export default class App {
//   private readonly app = express();

//   constructor() {
//     this.app.use(cookieParser());

//     // this.app.set('trust proxy', 1);
//     // this.app.use((req, res, next) => {
//     //   if (req.headers['cloudfront-forwarded-proto']) {
//     //     req.headers['x-forwarded-proto'] = req.headers['cloudfront-forwarded-proto'];
//     //   }
//     //   next();
//     // });

//     // this.app.use(
//     //   session({
//     //     ...
//     //   }),
//     // );

//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(helmet());
//     // this.app.use(
//     //   fileUpload({
//     //     useTempFiles: true,
//     //     tempFileDir: './tmp/',
//     //   }),
//     // );

//     // health check

//     // session
//   }

//   setRouter(router: Router, baseUrl: string): void {
//     this.app.use(baseUrl, router);
//   }

//   setMiddleware(handlers: Middleware | Middleware[]): void {
//     this.app.use(handlers);
//   }

//   start(port = 4000): void {
//     this.app.listen(port, () => {
//       console.log(`Express server listening on port ${port}`);
//     });
//   }
// }
