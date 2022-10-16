import {request, response} from 'express';
import {v4 as uuid} from 'uuid';


import User from '../models/user'
import DBConnection from '../config/database';

export class Users{

   CreateUserController(req: typeof request, res: typeof response): void {
      let user: User = req.body;

      if (req.headers.is_admin){
         console.log(true)
         user.IsAdmin = true;
      }
      user.ID = uuid();

      DBConnection.insert(user).into('user').then(() => {
         res.status(200).json(user);

       }).catch((e) => {

        res.status(500).json({error: e.sqlMessage});
       });
   }

   GetUsersController(req: typeof request, res: typeof response): void {
      if (!req.headers.is_admin || req.headers.is_admin == 'false'){
         res.status(401).json({error: "unauthorized user !"});
         return;
      }

      DBConnection.select().from('user').then((result) => {
         res.status(200).json(result);

       }).catch((e) => {
         res.status(500).json(e.sqlMessage);

       });
   }

   GetUserController(req: typeof request, res: typeof response): void {
      let user_id = req.headers.user_id

      DBConnection.select().from('user').where({'id': user_id})
      .then((result) => {
         if (result.length != 0) {
            res.status(200).json(result);
         } else {
            res.status(404).json({"error": "user not found"});
         }
       })
      .catch((e) => {
         console.log(e)
         res.status(500).json(e.sqlMessage);

       });

   }

   AdminGetUserController(req: typeof request, res: typeof response): void {
      let user_id = req.params.user_id

      DBConnection.select().from('user').where({'id': user_id})
      .then((result) => {
         if (result.length != 0) {
            res.status(200).json(result);
         } else {
            res.status(404).json({"error": "user not found"});
         }
       })
      .catch((e) => {
         console.log(e)
         res.status(500).json(e.sqlMessage);

       });

   }

   UpdateUserController(req: typeof request, res: typeof response): void {
      let user_id = req.headers.user_id
      let user: User = req.body;

      DBConnection('user').update(user).where({'id': user_id})
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


   AdminUpdateUserController(req: typeof request, res: typeof response): void {
      let user_id = req.params.user_id
      let user: User = req.body;

      DBConnection('user').update(user).where({'id': user_id})
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

   DeleteUserController(req: typeof request, res: typeof response): void {
      let user_id = req.params.user_id

      if (req.headers.is_admin  != 'true'){
         res.status(401).json({error: "user not authorized"})
      }

      DBConnection.delete().from('user').where({'id': user_id})
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

export class AdminUsers{

   CreateUserController(req: typeof request, res: typeof response): void {
      let user: User = req.body;
      user.ID = uuid();
      user.IsAdmin = true;

      DBConnection.insert(user).into('user').then(() => {
         res.status(200).json(user);

       }).catch((e) => {

        res.status(500).json(e.sqlMessage);
       });
   }

   GetUsersController(req: typeof request, res: typeof response): void {
      let header = req.headers;
      console.log(header);

      DBConnection.select().from('user').then((result) => {
         res.status(200).json(result);

       }).catch((e) => {
         res.status(500).json(e.sqlMessage);

       });
   }

   GetUserController(req: typeof request, res: typeof response): void {
      let user_id = req.params.user_id

      DBConnection.select().from('user').where({'id': user_id})
      .then((result) => {
         if (result.length != 0) {
            res.status(200).json(result);
         } else {
            res.status(404).json({"error": "user not found"});
         }
       })
      .catch((e) => {
         console.log(e)
         res.status(500).json(e.sqlMessage);

       });

   }

   UpdateUserController(req: typeof request, res: typeof response): void {
      let user_id = req.params.user_id
      let user: User = req.body;

      DBConnection('user').update(user).where({'id': user_id})
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

   DeleteUserController(req: typeof request, res: typeof response): void {
      let user_id = req.params.user_id

      DBConnection.delete().from('user').where({'id': user_id})
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