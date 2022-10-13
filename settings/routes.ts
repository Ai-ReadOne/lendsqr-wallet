import express from 'express';

import { CreateUserController, GetUsersController } from '../controllers/user';

export const router = express.Router();

// admin users endpoints
router.route("/users")
.post(CreateUserController)
.get(GetUsersController)

router.route("/users/:user_id")
.get()
.put()  
.delete()

// admin wallets endpoits
router.route("/wallets")
.post()
.get()

router.route("/wallets/:wallet_id")
.get()
.put()
.delete()

// admin transactions endpoints
router.route("/transactions")
.post()
.get()

router.route("/transactions/:wallet_id")
.get()
.put()
.delete()

// user endpoint
router.route("/user/:user_id")
.get()
.put()
.delete()

// user wallet endpoint
router.route("/user/:user_id/wallet/:wallet_id")
.get()
.put()

// user transactions endpoint
router.route("/user/:user_id/transactions")
.get()
router.route("/user/:user_id/transactions/:transaction_id")
.get()
