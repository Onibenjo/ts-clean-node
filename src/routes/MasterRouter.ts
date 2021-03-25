import testRoutes from 'routes/test/test.routes';
import { Router } from 'express';
import userRoutes from './user/user.routes';

class MasterRouter {
  private _router = Router();
  private _testRoute = testRoutes;
  private _userRoute = userRoutes;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use('/test', this._testRoute);
    this._router.use('/user', this._userRoute);
  }
}

export = new MasterRouter().router;
