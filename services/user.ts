import { CreateUserController } from "../controllers/user";
import User from '../models/user';
import {v4 as uuid} from 'uuid';

import { CreateUser as cru, GetUsers as gu} from "../repos/user";

// interface IUserServices {
//     CreateUser(user: User): User | void;
//     GetUsers(companyId: string): [User] | void;
//     GetUser(companyId: string, userId: string): User | void;
//     UpdateUser(companyId: string, userId: string, user: User): User | void;
//     DeleteUser(companyId: string, userId: string, user: User): string | void;
// }


 export function CreateUser(user: User): any {
    user.ID = uuid();

//    return user;
    return cru(user);
}

export function GetUsers(): any {
    return gu();
}