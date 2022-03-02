import passport from 'passport';
import PassportJWT from 'passport-jwt';
import { User } from '../../sequelize/User';

const strategyProps = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret' // TODO ❗❗❗❗❗ move to ENV!
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