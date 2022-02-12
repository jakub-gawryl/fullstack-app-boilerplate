import path from 'path';
import express from 'express';
import { getConfig } from '../config';
import routes from '../routes';

const runServer = (): Promise<express.Application> => new Promise((resolve) => {
  const { host, port } = getConfig();

  const app = express();
  const publicDir = path.resolve('public');

  // Set public dir
  app.use(express.static(publicDir));

  // Set routes
  app.use(routes);

  // Run server
  app.listen(port, () => {
    const mode = process.env.NODE_ENV?.toUpperCase();
    console.log(`✅ Server is running in ${mode} mode on ${host}`);
    resolve(app);
  });
});

export { runServer };
