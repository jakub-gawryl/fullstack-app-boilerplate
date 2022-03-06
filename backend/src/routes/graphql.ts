import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { isDevEnv } from '../utils';
import schema from '../graphql';
import { validateAndParseJWTForGraphQL } from '../middleware/validateAndParseJWTForGraphQL';

const router = Router();

router.all('/', validateAndParseJWTForGraphQL, graphqlHTTP({
  schema,
  graphiql: isDevEnv()
}));

export default router;