import { runPrecheck, runDatabase, runServer } from './boot';

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