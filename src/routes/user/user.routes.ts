import userController from '@controllers/user/userController';
import authController from '@controllers/auth/authController';
import { NextFunction, Request, Response, Router } from 'express';

class UserRouter {
  private _router = Router();
  private _controller = userController;
  private _authController = authController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    // read
    this._router.get(
      '/',
      (_req: Request, res: Response, next: NextFunction) => {
        try {
          return res.status(200).json(this._controller.defaultMethod());
        } catch (error) {
          next(error);
        }
      }
    );
    // create
    // this._router.post('/new', this._controller.createUser);
    this._router.post('/login', this._authController.login);
    this._router.post('/signup', this._authController.signup);

    // Protect all routes after this middleware
    this._router.use(this._authController.protect);

    this._router.delete('/deleteMe', userController.deleteMe);

    // Only admin have permission to access for the below APIs
    this._router.use(this._authController.restrictTo('admin'));

    this._router.route('/').get(this._controller.getAll);

    this._router
      .route('/:id')
      .get(this._controller.getUser)
      .patch(this._controller.editUser)
      .delete(this._controller.deleteUser);
  }
}

export = new UserRouter().router;
