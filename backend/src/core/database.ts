import { Sequelize } from 'sequelize';
import { isDevEnv } from '../utils';
import { getConfig } from '../config';

const { dbUrl } = getConfig();
const db = new Sequelize(dbUrl);

const runDatabase = () =>  db.authenticate().then(async () => {
  await db.sync({
    alter: isDevEnv()
  });
  const ver = await db.databaseVersion();
  const dialect = db.getDialect();
  console.log(`✅ Connected to database (${dialect} ${ver})`);
});

export {
  db as default,
  runDatabase
};