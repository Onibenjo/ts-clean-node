import ErrorHandler from '@models/ErrorHandler';
import baseController from '@controllers/base/baseController';
import { Request, Response } from 'express';
import Post from '@models/Post';

class PostController {
  private _base = baseController;
  defaultMethod() {
    return {
      text: 'Testing testing testing',
    };
  }

  getAll = this._base.getAll(Post);
  getPost = this._base.getOne(Post);
  editPost = this._base.updateOne(Post);
  deletePost = this._base.deleteOne(Post);

  deleteMe = async (req: Request, res: Response, next) => {
    try {
      await Post.findByIdAndUpdate(req.body.id, {
        active: false,
      });

      res.status(201).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
  throwError(code = 500, message = 'An error occurred') {
    throw new ErrorHandler(code, 'failure', message);
  }
}

export = new PostController();
