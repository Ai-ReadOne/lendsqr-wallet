import express from 'express';

import {Users} from '../controllers/user';

export const router = express.Router();

const user = new Users();

//users endpoints
router.route("/users")
.post(user.CreateUserController)
.get(user.GetUserController)
.put(user.UpdateUserController)  

// admin wallets endpoits
router.route("/wallets")
.post()
.get()

router.route("/wallets/:wallet_id")
.get()
.put()

// admin transactions endpoints
router.route("/transactions")
.get()

router.route("/transactions/:wallet_id")
.get()

// admin users endpoint
router.route("/admin/users")
.post(user.CreateUserController)
.get(user.GetUsersController)

router.route("/admin/users/:user_id")
.get(user.AdminGetUserController)
.put(user.AdminUpdateUserController)
.delete(user.DeleteUserController)

// user wallet endpoint
router.route("/admin/:user_id/wallet/:wallet_id")
.get()
.put()

// user transactions endpoint
router.route("/user/:user_id/transactions")
.get()
router.route("/user/:user_id/transactions/:transaction_id")
.get()
