import { Sequelize } from 'sequelize';
import { getConfig } from '../config';

const { dbUrl } = getConfig();
const db = new Sequelize(dbUrl);

const runDatabase = () =>  db.authenticate().then(async () => {
  const ver = await db.databaseVersion();
  const dialect = db.getDialect();
  console.log(`✅ Connected to database (${dialect} ${ver})`);
});

export { runDatabase };