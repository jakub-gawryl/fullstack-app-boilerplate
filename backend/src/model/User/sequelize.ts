import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../../core/database';
import bcrypt from 'bcrypt';

type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

interface UserInterface extends Model<UserType>, UserType {}

type UserModel = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInterface;
};

const User: UserModel = db.define('User', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING(64),
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email address'
      }
    }
  },
  firstName: DataTypes.STRING(64),
  lastName: DataTypes.STRING(64),
  password: {
    type: DataTypes.STRING(60)
  }
}, {
  hooks: {
    beforeCreate: (user, opts) => {
      // Hash the password // TODO FIX Types!
      // @ts-ignore
      user.password = bcrypt.hashSync(user.password, 10);
    },
    afterCreate: (user, opts) => {
      // Prevent from return password when use `create`
      // @ts-ignore
      delete user.dataValues.password;
    }
  },
  defaultScope: {
    attributes: {
      exclude: [
        'password'
      ]
    }
  },
  scopes: {
    withPassword: {
      attributes: {
        include: [
          'password'
        ]
      }
    }
  }
});

export {
  User
};
