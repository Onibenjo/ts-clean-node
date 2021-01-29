import buildMakeUser from './user';
// let {studentValidator} = require('../../validator')
import Joi from 'joi';
import validator from 'utils/validation';

const userSchema = Joi.object().keys({
  name: Joi.string().required().error(new Error('must have name as string')),
  username: Joi.string().required().min(3),
  // .error(new Error('username required')),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm Password')
    .messages({ 'any.only': '{{#label}} does not match' }),
  email: Joi.string().email().required(),
});
const userValidator = validator(userSchema);

const makeUser = buildMakeUser(userValidator);

export default makeUser;
