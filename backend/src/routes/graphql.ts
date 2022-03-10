import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { isDevEnv } from '../utils';
import schema from '../graphql';
import validateAndParseJWTForGraphQL from '../middleware/validate-and-parse-jwt-for-graphql';

const router = Router();

router.all('/', validateAndParseJWTForGraphQL, graphqlHTTP({
  schema,
  graphiql: isDevEnv()
}));

export default router;