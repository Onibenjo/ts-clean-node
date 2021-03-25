import { IUser } from '@models/User';

const buildMakeUser = (studentValidator) => {
  return ({ name, username, password, email, confirmPassword }: IUser) => {
    const { error } = studentValidator({
      name,
      username,
      password,
      email,
      confirmPassword,
    });
    // if (error) throw error;
    if (error) throw new Error(error);

    return Object.freeze({
      getName: () => name,
      getUsername: () => username,
      getPassword: () => password,
      getEmail: () => email,
      getConfirmPassword: () => confirmPassword,
    });
  };
};

export default buildMakeUser;
