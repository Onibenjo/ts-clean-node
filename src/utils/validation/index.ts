import Joi from 'joi';

const validator = (schema: Joi.Schema) => (
  payload: unknown
): boolean | { error: string } => {
  const { error } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const message = error.details.map((el) => el.message).join('\n');
    return {
      error: message,
    };
  }
  return true;
};

export default validator;
