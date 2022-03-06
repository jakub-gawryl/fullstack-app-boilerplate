import passport from 'passport';
import PassportJWT from 'passport-jwt';
import { SequelizeUser } from '../../model/User';
import { getConfig } from '../index';

const {
  jwt: {
    secret
  }
} = getConfig();

const strategyProps = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const strategyResolver = async (jwtPayload, done) => {
  const id = jwtPayload?.sub || '';

  if (!id) {
    return done(null, false);
  }

  const user = await SequelizeUser.findOne({
    where: {
      id
    }
  });

  if (!user) {
    return done(null, false);
  }

  const {
    firstName,
    lastName,
    email
  } = user;

  done(null, {
    id,
    firstName,
    lastName,
    email
  });
};

const JWTStrategy = new PassportJWT.Strategy(strategyProps, strategyResolver);

export {
  JWTStrategy
};

passport.use(JWTStrategy);