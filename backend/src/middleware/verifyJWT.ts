import passport from 'passport';

// TODO - Rename?
const verifyJWT = passport.authenticate('jwt', {
  session: false
});

export {
  verifyJWT
};