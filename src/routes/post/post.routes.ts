import postController from '@controllers/post/postController';
import authController from '@controllers/auth/authController';
import { Router } from 'express';

class UserRouter {
  private _router = Router();
  private _controller = postController;
  private _authController = authController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    // read
    this._router.get('/', this._controller.getAll);

    // Protect all routes after this middleware
    this._router.use(this._authController.protect);

    this._router.delete('/delete', this._controller.deleteMe);
    this._router
      .route('/:id')
      .get(this._controller.getPost)
      .patch(this._controller.editPost);

    // Only admin have permission to access for the below APIs
    this._router.use(this._authController.restrictTo('admin'));

    this._router.route('/').get(this._controller.getAll);

    this._router
      .route('/:id')
      .get(this._controller.getUser)
      .patch(this._controller.editUser)
      .put(this._controller.editUser)
      .delete(this._controller.deleteUser);
  }
}

export = new UserRouter().router;
