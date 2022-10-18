import {request, response} from 'express';
import {v4 as uuid} from 'uuid';
import dotenv from 'dotenv';

import User from '../models/user'
import DBConnection from '../config/database';
import UserServices from '../services/user';
// import { CreateToken } from '../utilities/auth';

dotenv.config();
const services = new UserServices();

export class Users{

   async CreateUserController(req: typeof request, res: typeof response): Promise<void> {
      let user: User = req.body;

      const createdUser =  await services.createUser(user);
      if (createdUser.error){
         res.status(500).json(createdUser.error);
         return;
      }

      res.status(201).json(createdUser.data);
   }

   async GetUsersController(res: typeof response): Promise<void> {
      const usersRecord = await services.getUsers();
      if (usersRecord.error){
         res.status(500).json(usersRecord.error);
         return;
      }

      res.status(200).json(usersRecord.data);
   }

   async GetUserController(req: typeof request, res: typeof response): Promise<void> {
      const user_id = req.headers.user_id;
 
      const userRecord = await services.getUser(user_id);
      if (userRecord.error){
         res.status(500).json(userRecord.error);
         return;
      }

      res.status(200).json(userRecord.data);
   }

   async AdminGetUserController(req: typeof request, res: typeof response): Promise<void> {
      let user_id = req.params.user_id

      const userRecord = await services.getUser(user_id);
      if (userRecord.error){
         res.status(500).json(userRecord.error);
         return;
      }

      res.status(200).json(userRecord.data);
   }

   async UpdateUserController(req: typeof request, res: typeof response): Promise<void> {
      let user_id = req.headers.user_id
      let record: User = req.body;

      const error = await services.updateUser(user_id, record);
      if (error){
         res.status(500).json(error);
      }
      res.status(204);
   }

   async AdminUpdateUserController(req: typeof request, res: typeof response): Promise<void> {
      let user_id = req.params.user_id
      let record: User = req.body;

      const error = await services.updateUser(user_id, record);
      if (error){
         res.status(500).json(error);
      }
      res.status(204);
   }

   async DeleteUserController(req: typeof request, res: typeof response): Promise<void> {
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