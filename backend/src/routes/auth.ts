import { Request, Router } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SequelizeUser } from '../model/User';
import { isJWTAuthorized } from '../middleware/isJWTAuthorized';
import { getConfig } from '../config';

const {
  jwt: {
    secret,
    expiresIn
  }
} = getConfig();

const router = Router();

/**
 * Login user
 * 
 * @route   POST /auth/login
 */
router.post('/login', async (req, res, next) => {

  try {
    const { email, password } = req.body;

    if (!email || ! password) {
      throw Error('Username and password required!');
    }

    // Get user by email address
    const user = await SequelizeUser.scope('withPassword').findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw Error('Given email address is not registered!');
    }

    // Verify password
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Password incorrect!');
    }

    // Generate JWT
    const jwtData = {
      sub: user.id
    };

    const jwtOpts = {
      expiresIn
    };

    res.json({
      success: true,
      jwt: jsonwebtoken.sign(jwtData, secret, jwtOpts)
    });
  }
  catch (err) {
    next(err);
  }
});


/**
 * Get user information based on JWT
 * 
 * @route   GET /auth/me
 */
router.get('/me', isJWTAuthorized, (req: Request, res) => {
  // TODO Fix types and remove ts-ignore. Seems like there's problem in
  // nodemon, but VSC doesn't complains about firstName and lastName
  // @ts-ignore
  const { user: { firstName, lastName } } = req;

  res.json({
    fullName: `${firstName} ${lastName}`
  });
});


/**
 * Send "Method not allowed" for any other request to the auth
 * 
 * @request  ALL /auth/*
 */
router.all('*', (req, res, next) => {
  throw Error('Method not allowed');
});

export default router;