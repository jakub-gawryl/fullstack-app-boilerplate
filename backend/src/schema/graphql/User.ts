import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import axios from 'axios';

// Example endpoint
const endpoint = 'https://jsonplaceholder.typicode.com/users/';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    website: {type: GraphQLString}
  }
});

// ***** Query *****
const UserQuery = {
  user: {
    type: UserType,
    args: {
      id: {type: GraphQLInt}
    },
    resolve(_, args) {
      return axios.get(`${endpoint}${args.id}`).then(res => res.data);
    }
  },
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return axios.get(endpoint).then(res => res.data);
    }
  }
};

// ***** Mutations *****
const UserMutations = {
  addUser: {
    type: UserType,
    args: {
      name: {type: new GraphQLNonNull(GraphQLString)},
      email: {type: new GraphQLNonNull(GraphQLString)},
      website: {type: GraphQLString}
    },
    resolve(_, args) {
      return axios.post(endpoint, args).then(res => res.data);
    }
  }
};

export {
  UserQuery,
  UserMutations
};