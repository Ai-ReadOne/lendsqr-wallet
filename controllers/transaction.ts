import {request, response} from 'express';
import {v4 as uuid} from 'uuid';


import DBConnection from '../config/database';
import Transaction from '../models/transaction'

export class Transactions {
    CreateTransaction(req: typeof request, res: typeof response){
        let transaction: Transaction  = req.body;

        transaction.ID = uuid();

        DBConnection('transaction').insert(transaction)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((e) => {
            res.json(e)
        })
    }

   GetTransactions(req: typeof request, res: typeof response){
      if (!req.headers.is_admin || req.headers.is_admin == 'false'){
         res.status(401).json({error: "unauthorized user !"});
         return;
      }

      DBConnection.select().from('transaction').then((result) => {
         res.status(200).json(result);

         }).catch((e) => {
         res.status(500).json(e.sqlMessage);

         });
   }

   AdminGetUserTransactions(req: typeof request, res: typeof response){
      let wallet_id = req.params.user_id;

      if (!req.headers.is_admin || req.headers.is_admin == 'false'){
         res.status(401).json({error: "unauthorized user !"});
         return;
      }

      DBConnection.select().from('transaction').where({'wallet_id': wallet_id}).then((result) => {
         res.status(200).json(result);

         }).catch((e) => {
         res.status(500).json(e.sqlMessage);

         });
   }
  
      GetTransaction(req: typeof request, res: typeof response){
          let transaction_id = req.headers.wallet_id
  
          DBConnection.select().from('transaction').where({'id': transaction_id})
          .then((result) => {
             if (result.length != 0) {
                res.status(200).json(result);
             } else {
                res.status(404).json({"error": "transaction not found"});
             }
           })
          .catch((e) => {
             console.log(e)
             res.status(500).json(e.sqlMessage);
    
           });
    
      }
  
      AdminGetTransaction(req: typeof request, res: typeof response){
          let transaction_id = req.params.wallet_id
  
          DBConnection.select().from('transaction').where({'id': transaction_id})
          .then((result) => {
             if (result.length != 0) {
                res.status(200).json(result);
             } else {
                res.status(404).json({"error": "transaction not found"});
             }
           })
          .catch((e) => {
             console.log(e)
             res.status(500).json(e.sqlMessage);
    
           });
    
      }
  
}