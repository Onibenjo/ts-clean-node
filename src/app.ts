import dotenv from 'dotenv';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import MasterRouter from '@routes/MasterRouter';
import ErrorHandler from '@models/ErrorHandler';
import 'db/mongodb/connection';

dotenv.config({
  path: '.env',
});

class Server {
  public app = express();
  public router = MasterRouter;
}

const server = new Server();

server.app.use(express.urlencoded({ extended: true }));
server.app.use(
  express.json({
    limit: '15kb',
  })
);
// Set security HTTP headers
server.app.use(helmet());
// Allow Cross-Origin requests
server.app.use(cors({ origin: true }));
server.app.use(morgan('combined'));
// Data sanitization against Nosql query injection
server.app.use(mongoSanitize());
// Data sanitization against XSS(clean user input from malicious HTML code)
server.app.use(xss());
// Prevent parameter pollution
server.app.use(hpp());

// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour',
});

//api route
// server.app.use('/api', limiter);
//api route
server.app.use('/api/v1/', limiter, server.router);
// server.app.use('/api/v1/', server.router);

// handle undefined Routes
server.app.use('*', (_req, _res, next) => {
  const err = new ErrorHandler(404, 'fail', 'undefined route');
  next(err);
});

// last middleware should be error handler
server.app.use(
  (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      statusCode: err.statusCode || 500,
      message: err.message,
    });
    // next()
  }
);

const port = process.env.PORT || 5000;

server.app.listen(port, () => console.log(`> Listening on port ${port}`));
