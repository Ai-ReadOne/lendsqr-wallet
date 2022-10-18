import express from 'express';

import {Users} from '../controllers/user';
import {Wallets} from '../controllers/wallet';
import {Transactions} from '../controllers/transaction';
import { VerifyAuthTokenMiddleware } from '../utilities/auth';

export const router = express.Router();
// router.use(VerifyAuthTokenMiddleware);

const user = new Users();
const wallet = new Wallets();
const transaction = new Transactions();

//users endpoints
router.route("/users")
.post(user.CreateUserController)
.get(user.GetUserController)
.put(user.UpdateUserController)  

// Wallets endpoints
router.route("/wallets")
.post(wallet.CreateWallet)
.get(wallet.GetWallet)
.put(wallet.UpdateWallet)


// user transactions endpoint
router.route("/users/:user_id/transactions")
.get(transaction.GetTransactions)
router.route("/users/:user_id/transactions/:transaction_id")
.get(transaction.GetTransaction)


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

// admin transactions endpoints
router.route("/admin/transactions")
.get(transaction.GetTransactions)

router.route("/admin/transactions/:wallet_id")
.get(transaction.AdminGetUserTransactions)

router.route("/admin/transactions/:wallet_id/t/:transaction_id")
.get(transaction.AdminGetTransaction)
.put(transaction.AdminGetTransaction)
