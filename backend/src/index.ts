import { runPrecheck, runDatabase, runServer } from './core';

const runApp = async () => {
  try {
    await runPrecheck();
    await runDatabase();
    await runServer();
  }
  catch (err) {
    console.error(`❌ Application error: ${err.message}`);
  }
};

runApp();