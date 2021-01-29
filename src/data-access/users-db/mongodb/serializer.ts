const _serializeSingle = (user) => {
  return {
    id: user._id,
    name: user.name,
    username: user.username,
  };
};

const serializer = (data) => {
  if (!data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
};

export default serializer;
