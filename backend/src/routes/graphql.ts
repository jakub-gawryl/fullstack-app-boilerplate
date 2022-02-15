import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { isDevEnv } from '../utils';
import schema from '../graphql';

const router = Router();

router.all('/', graphqlHTTP({
  schema,
  graphiql: isDevEnv()
}));


export default router;