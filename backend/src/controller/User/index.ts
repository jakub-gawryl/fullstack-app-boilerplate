import { SequelizeUser } from '../../model/User';

const createUser = async (_, args) => {
  console.log(args);
  const user = await SequelizeUser.create({
    ...args
  }).catch(err => {
    if (err.parent?.code === 'ER_DUP_ENTRY') {
      throw Error('User with given email address already exist!');
    }

    throw err;
  });

  return user;
};

const getUserById = async (_, args) => {
  const user = await SequelizeUser.findOne({
    where: {
      id:args.id
    }
  });

  return user;
};

const listUsers = async () => {
  const users = await SequelizeUser.findAll();

  return users;
};

export {
  createUser,
  getUserById,
  listUsers
};