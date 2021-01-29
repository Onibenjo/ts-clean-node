import ErrorHandler from '@models/ErrorHandler';
import User from '@models/User';
import baseController from '@controllers/base/baseController';
import { Request, Response } from 'express';

class UserController {
  private _base = baseController;
  defaultMethod() {
    return {
      text: 'Testing testing testing',
    };
  }

  getAll = this._base.getAll(User);
  getUser = this._base.getOne(User);
  editUser = this._base.updateOne(User);
  deleteUser = this._base.deleteOne(User);

  deleteMe = async (req: Request, res: Response, next) => {
    try {
      await User.findByIdAndUpdate(req.body.id, {
        active: false,
      });

      res.status(204).json({
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

export = new UserController();
