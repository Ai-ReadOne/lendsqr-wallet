import { knex } from 'knex';
import dotenv from 'dotenv';


import DBConnection from '../config/database';
import User from '../models/user';

dotenv.config({path: '../.env'});

// interface IUserRepos {
//     CreateUser(user: User): User | void;
//     GetUsers(companyId: string): [User] | void;
//     GetUser(companyId: string, userId: string): User | void;
//     UpdateUser(companyId: string, userId: string, user: User): User | void;
//     DeleteUser(companyId: string, userId: string, user: User): string | void;
// }

export function CreateUser(user: User): any{
 const res = DBConnection('user').insert(user).then((result) => {
    console.log(result);
    return result;

  }).catch((e) => {
    console.log(e.code);
    console.log(e.sqlMessage);
    // return e;
  });
  // console.log('console mxessage', res);

  return res;
}


export function GetUsers(): any{
 const res = DBConnection.select().from('user').then((result) => {
    console.log(result);
    return result;
  }).catch((e) => {
    console.log(e.code);
    console.log(e.sqlMessage);
  });;


  return res;
}