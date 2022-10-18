import {request, response} from 'express';
import {v4 as uuid} from 'uuid';


import DBConnection from '../config/database';
import Wallet from '../models/wallet'

export class Wallets {

   CreateWallet(req: typeof request, res: typeof response){
      let is_admin = req.headers.is_admin;
      let wallet: Wallet  = req.body;

      wallet.ID = uuid();

      DBConnection('wallet').insert(wallet)
      .then((result) => {
         res.status(201).json(result)
      })
      .catch((e) => {
         res.json(e)
      })

      console.log(res.status(201).json(wallet), is_admin)
   }

   GetWallets(req: typeof request, res: typeof response){
      if (!req.headers.is_admin || req.headers.is_admin == 'false'){
         res.status(401).json({error: "unauthorized user !"});
         return;
      }

      DBConnection.select().from('wallet').then((result) => {
         res.status(200).json(result);

         }).catch((e) => {
         res.status(500).json(e.sqlMessage);

         });
   }

   GetWallet(req: typeof request, res: typeof response){
      let wallet_id = req.headers.wallet_id

      DBConnection.select().from('wallet').where({'id': wallet_id})
      .then((result) => {
         if (result.length != 0) {
            res.status(200).json(result);
         } else {
            res.status(404).json({"error": "wallet not found"});
         }
      })
      .catch((e) => {
         console.log(e)
         res.status(500).json(e.sqlMessage);

      });

   }

   AdminGetWallet(req: typeof request, res: typeof response){
      let wallet_id = req.params.wallet_id

      DBConnection.select().from('wallet').where({'id': wallet_id})
      .then((result) => {
         if (result.length != 0) {
            res.status(200).json(result);
         } else {
            res.status(404).json({"error": "wallet not found"});
         }
      })
      .catch((e) => {
         console.log(e)
         res.status(500).json(e.sqlMessage);

      });

   }

    UpdateWallet(req: typeof request, res: typeof response){
        let wallet_id = req.headers.user_id
      let wallet: Wallet = req.body;

      DBConnection('wallet').update(wallet).where({'id': wallet_id})
      .then((sucess) => {
         if (!sucess){
            res.status(404).json({message:"invalid update credentials"});
            return;
         }

         res.status(204).json({"message": "user info has been updated succesfully"});
      }).catch((e) => {

       res.status(500).json(e);
      });
    }

    AdminUpdateWallet(req: typeof request, res: typeof response){
        let wallet_id = req.params.user_id
      let wallet: Wallet = req.body;

      DBConnection('wallet').update(wallet).where({'id': wallet_id})
      .then((sucess) => {
         if (!sucess){
            res.status(404).json({message:"invalid update credentials"});
            return;
         }

         res.status(204).json({"message": "user info has been updated succesfully"});
      }).catch((e) => {
       res.status(500).json(e.sqlMessage);
      });
    }

    DeleteWallet(req: typeof request, res: typeof response){
        let wallet_id = req.params.wallet_id

        if (req.headers.is_admin  != 'true'){
           res.status(401).json({error: "user not authorized"})
        }
  
        DBConnection.delete().from('wallet').where({'id': wallet_id})
        .then((sucess) => {
           if (!sucess){
              res.status(404).json({message:"invalid delete credentials"});
              return;
           }
  
           res.status(204).json({"message": "user info has been deleted succesfully"});
        }).catch((e) => {
  
         res.status(500).json(e);
        });
  
     }
}
