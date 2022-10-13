import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config({path: './.env'});

 const DBConfig = {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
    useNullAsDefault: true,
};

export default DBConfig;