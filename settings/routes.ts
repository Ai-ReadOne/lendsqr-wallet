import express from 'express';

import {Users} from '../controllers/user';
import {Wallets} from '../controllers/wallet';

export const router = express.Router();

const user = new Users();
const wallet = new Wallets();

//users endpoints
router.route("/users")
.post(user.CreateUserController)
.get(user.GetUserController)
.put(user.UpdateUserController)  

router.route("/wallets")
.post(wallet.CreateWallet)
.get(wallet.GetWallet)
.put(wallet.UpdateWallet)

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
router.route("/admin/wallets/")
.get(wallet.GetWallets)

router.route("/admin/wallets/:wallet_id")
.get(wallet.AdminGetWallet)
.put(wallet.AdminUpdateWallet)

// user transactions endpoint
router.route("/users/:user_id/transactions")
.get()
router.route("/users/:user_id/transactions/:transaction_id")
.get()
