import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

/**
 * This middleware allows to bypass the default passport behavior so that it
 * does not send '401 Unauthorized' response in case of empty/tampered JWT passed.
 * 
 * It still using jwt-strategy, so 'req.user' only contains data if token is valid
 * (otherwise it's set to null). This allows to check the scope and whether it is
 * required at the level of a single GraphQL query as some requests might be allowed
 * for anonymous users.
 * 
 * docs: https://github.com/jaredhanson/passport/blob/932c1b8a6ab17f81ff44a69825ce43c6434bb53a/lib/middleware/authenticate.js#L34
 */
const validateAndParseJWTForGraphQL = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      return next(err);
    }

    req.user = user || null;

    next();
  })(req, res, next);
};

export default validateAndParseJWTForGraphQL;