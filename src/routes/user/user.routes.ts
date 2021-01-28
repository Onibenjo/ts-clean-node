import userController from '@controllers/user/userController';
import { NextFunction, Request, Response, Router } from 'express';

class TestRouter {
  private _router = Router();
  private _controller = userController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    // read
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(200).json(this._controller.defaultMethod());
      } catch (error) {
        next(error);
      }
    });
    // create
    this._router.post('/new', (req, res: Response) =>
      this._controller.createUser(req, res)
    );
    // create
    this._router.patch('/:id', (req, res: Response) =>
      this._controller.editUser(req, res)
    );
    // read
    this._router.get('/error', (_, res: Response, next: NextFunction) => {
      try {
        const result = this._controller.throwError();
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
  }
}

export = new TestRouter().router;
