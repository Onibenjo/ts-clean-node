import buildMakeUser from './user';
// let {studentValidator} = require('../../validator')
import Joi from 'joi';
import validator from 'utils/validation';

const userSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .error(() => 'must have name as string'),
  username: Joi.string()
    .required()
    .error(() => 'username required'),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
const userValidator = validator(userSchema);

const makeUser = buildMakeUser(userValidator);

export default makeUser;
