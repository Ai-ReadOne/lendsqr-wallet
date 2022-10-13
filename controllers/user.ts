import {request, response} from 'express';

import User from '../models/user'
import {CreateUser as cru, GetUsers as gu} from '../services/user'

export function CreateUserController(req: typeof request, res: typeof response): void {
   let user: User = req.body;

   let createdUser: User = cru(user);

   res.status(201).json(createdUser)
}

export function GetUsersController(req: typeof request, res: typeof response): void {
   let header = req.headers;
   console.log(header);

   let users = gu();

   res.status(200).json(users);
}
