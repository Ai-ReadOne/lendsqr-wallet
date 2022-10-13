import { knex } from 'knex';
import dotenv from 'dotenv';


import DBConfig from '../knexfile';

dotenv.config({path: '../.env'});


const DBConnection = knex(DBConfig);

// const database = knex(DBConfig);
// .raw("SELECT VERSION()").then(() => {
//     console.log(`connected to database successfully`);
// });


export default DBConnection;