import { knex } from 'knex';
import dotenv from 'dotenv';


import DBConfig from '../knexfile';

dotenv.config({path: '../.env'});


const DBConnection = knex(DBConfig);

export default DBConnection;