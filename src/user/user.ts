const buildMakeUser = (studentValidator) => {
  return ({ name, username }) => {
    const { error } = studentValidator({ name, username });
    if (error) throw new Error(error);

    return Object.freeze({
      getName: () => name,
      getUsername: () => username,
    });
  };
};

export default buildMakeUser;
