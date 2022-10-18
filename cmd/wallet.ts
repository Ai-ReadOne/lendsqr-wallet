import express from 'express';
import dotenv from 'dotenv';

import {router} from '../settings/routes';
import DBConnection from '../config/database';


const wallet = express();
dotenv.config({path: '../.env'});

const port = process.env.HOST || 8080

// verify database connection
DBConnection.raw("SELECT VERSION()").then(() => {
        console.log(`connected to database successfully`);
  }).catch((e) => {
    console.log(e);
  });

// parse JSON bodies (as sent by API clients)
wallet.use(express.json());

// declare api endpoints
// wallet.use('/api/v1/register', )
// wallet.use('/api/v1/login', )
wallet.use("/api/v1", router);


wallet.listen(port, () => console.log(`wallet api running and listening on  port ${port}`))
