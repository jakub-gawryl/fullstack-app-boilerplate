import passport from 'passport';
import { runPrecheck, runDatabase, runServer } from './core';
import './config/passport-strategy/jwt-strategy';

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