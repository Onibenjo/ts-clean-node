import User from '@models/User';
import makeUser from 'user';
import serialize from './serializer';

const listUsers = () => {
  return User.find({}).then(serialize);
};

const findUser = (prop: string, val: unknown) => {
  if (prop === 'id') {
    prop = '_id';
  }
  return User.find({ [prop]: val }).then((resp) => {
    return serialize(resp[0]);
  });
};

const findUsersBy = (prop: string, val: unknown) => {
  return User.find({ [prop]: val }).then(serialize);
};

const addUser = (userInfo: { name: string; username: string }) => {
  const user = makeUser(userInfo);
  const newUser = {
    name: user.getName(),
    username: user.getUsername(),
  };
  return User.create(newUser).then(serialize);
};

const deleteUser = (id: string) => {
  return User.findByIdAndDelete(id)
    .then((resp) => {
      return {
        id: resp?._id.toString(),
        status: 'success',
      };
    })
    .catch(() => {
      return {
        status: 'fail',
      };
    });
};

const dropAll = () => {
  return User.remove();
};

export default Object.freeze({
  listUsers,
  findUser,
  findUsersBy,
  addUser,
  deleteUser,
  dropAll,
});

// export { listUsers, findUser, findUsersBy, addUser, deleteUser, dropAll };
