import path from 'path';
import express from 'express';
import { getConfig } from './config';

const runServer = (): Promise<express.Application> => new Promise((resolve) => {
  const port = 5000;
  const { host } = getConfig();

  const app = express();
  const publicDir = path.resolve('public');

  // Set public dir
  app.use(express.static(publicDir));

  // Example route
  app.get('/api', (req, res) => {
    res.json({
      status: '[Backend API] Hello World!'
    });
  });

  // Run server
  app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV?.toUpperCase()} mode on ${host}`);
    resolve(app);
  });
});

export {
  runServer
};
