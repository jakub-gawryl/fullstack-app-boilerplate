import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { isDevEnv } from '../utils';
import schema from '../schema/graphql';

const router = Router();

router.all('/', graphqlHTTP({
  schema,
  graphiql: isDevEnv()
}));


export default router;