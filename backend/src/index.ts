import passport from 'passport';
import { runPrecheck, runDatabase, runServer } from './core';
import './core/passport/jwtStrategy';

const runApp = async () => {
  try {
    await runPrecheck();
    await runDatabase();
    await runServer([
      passport.initialize()
    ]);
  }
  catch (err) {
    console.error(`❌ Application error: ${err.message}`);
  }
};

runApp();