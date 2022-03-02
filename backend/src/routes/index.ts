import { Router } from 'express';
import authRouter from './auth';
import grqphqlRouter from './graphql';

const router = Router();

const authErrorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }

  next();
};

// Authentication
router.use('/auth', authRouter, authErrorHandler);

// GraphQL endpoint
router.use('/graphql', grqphqlRouter);

export default router;