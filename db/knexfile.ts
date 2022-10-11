import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

// interface IknexConfig {

// }

export const DBConfig = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 8000,
        database: 'lendsqr_wallet',
        user: 'aireadone',
        password: 'password',
    },
    pool: {
    min: 0,
    max: 10
    },
    migrations: {
        directory: __dirname + '/migrations',
    },
    useNullAsDefault: true,
};
