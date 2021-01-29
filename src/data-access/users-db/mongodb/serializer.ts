import { IUserDocument } from '@models/User';

const _serializeSingle = (user: IUserDocument) => {
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const serializer = (data) => {
  if (!data) {
    return null;
  }
  // if (Array.isArray(data)) {
  //   return data.map(_serializeSingle);
  // }
  return _serializeSingle(data);
};

export default serializer;
