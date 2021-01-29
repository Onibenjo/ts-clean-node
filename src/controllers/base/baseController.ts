import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
import ErrorHandler from '@models/ErrorHandler';
import APIFeatures from 'utils/apiFeatures';

// const APIFeatures = require('../utils/apiFeatures');

// type Model = Model;

const deleteOne = (Model: Model<Document>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new ErrorHandler(404, 'fail', 'No document found with that id')
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = (Model: Model<Document>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new ErrorHandler(404, 'fail', 'No document found with that id')
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createOne = (Model: Model<Document>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getOne = (Model: Model<Document>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(
        new ErrorHandler(404, 'fail', 'No document found with that id')
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = (Model: Model<Document>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const features = new APIFeatures(Model.find(), req.query).sort().paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

const baseController = Object.freeze({
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
});
export default baseController;
