import dotenv from 'dotenv';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import MasterRouter from '@routes/MasterRouter';
import ErrorHandler from '@models/ErrorHandler';

dotenv.config({
  path: '.env',
});

class Server {
  public app = express();
  public router = MasterRouter;
}

const server = new Server();

server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());
server.app.use(helmet());
server.app.use(cors({ origin: true }));
server.app.use(morgan('combined'));

//api route
server.app.use('/api/v1/', server.router);

// last middleware should be error handler
server.app.use(
  (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
    // next()
  }
);

const port = process.env.PORT || 5000;

server.app.listen(port, () => console.log(`> Listening on port ${port}`));
