import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { getConfig } from '../config';
import routes from '../routes';

const runServer = (middlewares: express.RequestHandler[] = []): Promise<express.Application> => new Promise((resolve) => {
  const { host, port } = getConfig();

  const app = express();
  const publicDir = path.resolve('public');

  // Use body parser
  app.use(bodyParser.json());

  // Set public dir
  app.use(express.static(publicDir));

  // Set routes
  app.use(routes);

  // Set middlewares
  app.use(middlewares);

  // Run server
  app.listen(port, () => {
    const mode = process.env.NODE_ENV?.toUpperCase();
    console.log(`✅ Server is running in ${mode} mode on ${host}`);
    resolve(app);
  });
});

export { runServer };
