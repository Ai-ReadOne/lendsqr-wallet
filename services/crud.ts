import {v4 as uuid} from 'uuid';
import dotenv from 'dotenv';

import DBConnection from '../config/database';


class BasicServices {
    constructor(){
        this.createService;
        
    }

   async createService(tableName: string, payload: any){
        payload.ID = uuid();

        const result = await DBConnection.insert(payload).into(tableName);

        return result;
   }

  async GetServices(tableName: string){
        const data = await DBConnection.select().from(tableName);

        return data;
  }

  async GetService(tableName: string, params1: any){
    const data = await DBConnection.select().from(tableName).where(params1: params1);

    return data;
}
}

export default BasicServices;
