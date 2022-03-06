import passport from 'passport';
import PassportJWT from 'passport-jwt';
import { User } from '../../sequelize/User';
import { getConfig } from '../../config';

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

  const user = await User.findOne({
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