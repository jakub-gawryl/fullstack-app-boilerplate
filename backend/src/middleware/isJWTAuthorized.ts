import passport from 'passport';

const isJWTAuthorized = passport.authenticate('jwt', {
  session: false
});

export {
  isJWTAuthorized
};