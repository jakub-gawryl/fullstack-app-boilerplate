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
    const msg = typeof err === 'string'
      ? err
      : err.message || 'unknown error...';

    console.error(`❌ Application error: ${msg}`);
  }
};

runApp();