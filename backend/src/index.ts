import { runPrecheck } from './precheck';
import { runServer } from './server';

const runApp = async () => {
  try {
    await runPrecheck();
    await runServer();
  }
  catch (err) {
    console.error(err);
  }
};

runApp();