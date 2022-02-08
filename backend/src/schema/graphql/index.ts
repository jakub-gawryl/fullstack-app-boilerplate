import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserQuery, UserMutations } from './User';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...UserQuery
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    ...UserMutations
  }
});

const schema = new GraphQLSchema({query, mutation});

export default schema;