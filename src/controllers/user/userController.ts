import ErrorHandler from '@models/ErrorHandler';
import User from '@models/User';

class TestController {
  defaultMethod() {
    return {
      text: 'Testing testing testing',
    };
  }
  getAll(req: Request, res: Response) {
    try {
      base.getAll(User);
    } catch (error) {
      this.throwError(500, 'Error creating user');
    }
  }
  getUser(req: Request, res: Response) {
    try {
      base.updateOne(User);
    } catch (error) {
      this.throwError(500, 'Error creating user');
    }
  }
  createUser(req: Request, res: Response) {
    const { name, username, photoURL } = req.body;
    try {
    } catch (error) {
      this.throwError(500, 'Error creating user');
    }
  }
  editUser(req, res) {
    try {
      base.updateOne(User);
    } catch (error) {
      this.throwError(500, 'Error creating user');
    }
  }
  deleteUser(req, res) {
    try {
      base.deleteOne(User);
    } catch (error) {
      this.throwError(500, 'Error creating user');
    }
  }
  deleteMe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
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

export = new TestController();
