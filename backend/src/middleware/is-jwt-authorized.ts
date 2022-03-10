import passport from 'passport';

const isJWTAuthorized = passport.authenticate('jwt', {
  session: false
});

export default isJWTAuthorized;