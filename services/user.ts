import User from '../models/user';
import {v4 as uuid} from 'uuid';

import DBConnection from '../config/database';

class UserServices {

    async createUser(user: User): Promise<{data: any, error: any}> {
        var data: any;
        var error: any;

        user.ID = uuid();

        await DBConnection('user').insert(user)
        .then( async () => {
            const userRecord = await this.getUser(user.ID);
            
            data = userRecord.data;
            error = userRecord.error;
        })
        .catch((err) => {
            error = err.sqlMessage;
        });

        return {data, error};
    }

    async getUsers(): Promise<{data: any, error: any}>{
        var data: any;
        var error: any;

        DBConnection('user').select()
        .then((result) =>{
            if (!result){
                error = {error: "unexpected error while fecthing records"};
                return;
            }
            data = result;
        })
        .catch((err) => {
            error = err;
        })
            
        return {data, error};
    }

    async getUser(id: any): Promise<{data: any, error: any}>{
        var data: any;
        var error: any;

        await DBConnection('user').where({'id': id}).first()
        .then((user) => {
            if (!user){
                error = {error: "user record not found"};
                return;
            }
            data =  user;
        })
        .catch((err) => {
            console.log(err);
            error = err;
        });

        return {data, error};
    }

    async updateUser(user_id: any, record: User): Promise<{error: any}> {
        var error: any;

        await DBConnection('user').update(record).where({'id': user_id})
        .then((result) => {
            if (result == 0){
                error = {error: "no user matches update parameter"}
            }
        })
        .catch((err) => {
            error = err;
        });
        
        return error;
    }
    
    async deleteUser(user_id: any): Promise<{error: any}> {
        var error: any;

        await DBConnection('user').delete().where({'id': user_id})
        .then((result) => {
            if (result == 0){
                error = {error: "no user matches update parameter"}
            }
        })
        .catch((err) => {
            error = err;
        });
        
        return error;
    }
}

export default UserServices;
