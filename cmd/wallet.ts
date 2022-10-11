import express from 'express';
import dotenv from 'dotenv';


import {router} from '../settings/routes';
import database from '../config/database';

const wallet = express();
dotenv.config();

const port = process.env.HOST || 8080

database.raw("SELECT VERSION()").then(() => {
    console.log(`connected to database successfully`);
});

console.log(database.client.config);
// parse JSON bodies (as sent by API clients)
wallet.use(express.json());

// declare api endpoints
wallet.use("/api/v1", router);

wallet.listen(port, () => console.log(`wallet api running and listening on  port ${port}`))

