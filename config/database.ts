import { knex } from 'knex';
import { DBConfig } from '../db/knexfile';

const database = knex(DBConfig);

// verify connection
// database.raw("SELECT VERSION()").then(() => {
//     console.log(`connected to database successfully`);
// });

export default database;