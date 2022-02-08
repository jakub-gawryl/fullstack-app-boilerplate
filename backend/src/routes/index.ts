import { Router } from 'express';
import grqphqlRouter from './graphql';

const router = Router();

// GraphQL endpoint
router.use('/graphql', grqphqlRouter);

export default router;