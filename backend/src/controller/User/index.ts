import { SequelizeUser } from '../../model/User';

const createUser = async (args: any) => {
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

const getUserById = async (userId: string) => {
  const user = await SequelizeUser.findOne({
    where: {
      id: userId
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