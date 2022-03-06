import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { createUser, getUserById, listUsers } from '../../controller/User';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLString},
    email: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString}
  }
});

// ***** Query *****
const UserQuery = {
  user: {
    type: UserType,
    args: {
      id: {type: GraphQLString}
    },
    resolve: (_, args) => getUserById(args.id)
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: () => listUsers()
  }
};

// ***** Mutations *****
const UserMutations = {
  createUser: {
    type: UserType,
    args: {
      email: {type: new GraphQLNonNull(GraphQLString)},
      firstName: {type: new GraphQLNonNull(GraphQLString)},
      lastName: {type: GraphQLString},
      password: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: async(_, args) => createUser(args)
  }
};

export {
  UserQuery,
  UserMutations
};