const express = require('express');
const User = require("../model/UserModel")

const jwt = require("jsonwebtoken");

const Account = require("../model/accountModel")


//GET ACCOUNT



//DEPOSIT
const depositController = async (req, res) => {
  try {

    const amount = parseFloat(req.body.amount);
    const description = req.body.description
    const pin = parseFloat(req.body.pin)
console.log(amount,description,pin)
    const user = await User.findById(req.params.userId);
    console.log(user)
    if(pin !==user.pin){
     return res.status(403).json("inccorect pin")
    }
    const account = await Account.findById(user.account);

    if (!account) {
      return res.status(404).json("Account not found");
    }



    // Calculate the updated account balance
    const updatedBalance = account.accountBalance + amount;

    // Create a deposit transaction
    const depositTransaction = {
      date: new Date(),
      amount,
      type: "credit",
      description:`${description || "Money deposit into your account"} `
    };

    // Push the transaction into the account's transactions array
    account.transactions.push(depositTransaction);

    // Update the account balance
    account.accountBalance = updatedBalance;

    // Save the updated account
    await account.save();

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json(error);
  }
};


//WITHDRAWAL
const withdrawController = async (req, res) => {
  try {

    const amount = parseFloat(req.body.amount);
    const description = req.body.description
    const pin = parseFloat(req.body.pin)
    const user = await User.findById(req.params.userId);

    if(!user){
      return res.status(404).json("User not found")
    }
    if(pin !==user.pin){
      return res.status(403).json("inccorect pin")
     }
    const account = await Account.findById(user.account);
console.log(account)
    if (!account) {
      return res.status(404).json("Account not found");
    }

console.log(amount)
console.log(account.accountBalance)
if (account.accountBalance < amount) {
  return res.status(400).json({ error: "Insufficient balance" });
}
    // Calculate the updated account balance
    const updatedBalance = account.accountBalance - amount;

    // Create a deposit transaction
    const depositTransaction = {
      date: new Date(),
      amount,
      type: "debit",
      description:`${description || "Money withdrawn from your account"} `
    };

    // Push the transaction into the account's transactions array
    account.transactions.push(depositTransaction);

    // Update the account balance
    account.accountBalance = updatedBalance;

    // Save the updated account
    await account.save();

    return res.status(200).json(account);
  } catch (error) {
    res.status(500).json(error);
  }
};

//TRANSFER
const transferController = async (req, res) => {
 
  try {
    const senderId = req.params.senderId;
    const { accountNumber } = req.body;
    const amount = parseFloat(req.body.amount);
    const pin = parseFloat(req.body.pin)


    const sender = await User.findById(senderId);
    const senderAccount = await Account.findById(sender.account);
    const receiverAccount = await Account.findOne({
      accountNumber: accountNumber ,
    });
 
    if(!receiverAccount){
      return res.send('reciever doesnot have an account')
    }
    if(pin !==sender.pin){
      return res.status(403).json("inccorect pin")
     }
 
    // Check if sender has sufficient balance
    if (senderAccount.accountBalance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient balance for transfer" });
    }

    // Withdraw from sender's account
    senderAccount.accountBalance = senderAccount.accountBalance- amount;
    const senderDebitTransaction = {
      type: "debit",
      amount,
      date: new Date(),
      description: `Transfer to ${receiverAccount.accountName}`,
    };
    senderAccount.transactions.push(senderDebitTransaction);

    // Deposit into receiver's account
    receiverAccount.accountBalance = receiverAccount.accountBalance+ amount;
    const receiverCreditTransaction = {
      type: "credit",
      amount,
      date: new Date(),
      description: `Transfer from ${senderAccount.accountName}`,
    };
    receiverAccount.transactions.push(receiverCreditTransaction);

    // Save updated sender and receiver accounts
    const updatedSender = await senderAccount.save();
    const updatedReceiver = await receiverAccount.save();
   
    res.send({ updatedReceiver, updatedSender});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: "An error occurred while processing the transfer" });
  }
};


//GET TRANSACTIONS HISTORY

const getTransactionController =async(req,res)=>{
  const {userId} = req.params

try{
  const user = await User.findById(userId)
if(!user){
 return res.status(403).json("not found")
}
  const account = await Account.findById(user.account)
 if(!account){ return res.status(403).json("not found")}

 return  res.json([...account?.transactions])
}catch(err){
  res.status(500).json("Error getting transactions")
}
}
// GET ACCOUNT BY ID

const getAccountController = async(req,res)=>{
  const {userId} = req.params

  try{
    const user = await User.findById(userId)
  if(!user){
   return res.status(403).json("not found")
  }
    const account = await Account.findById(user.account)
   if(!account){ return res.status(403).json("not found")}
   console.log(account?.transactions)
   return  res.json(account)
  }catch(err){
    res.status(500).json("Error getting transactions")
  }
}

//GET ACCOUNT BALANCE
const getAccountBalanceController = async (req,res)=>{
  const {userId} = req.params
  
  try{
    const user = await User.findById(userId)
  if(!user){
   return res.status(403).json("not found")
  }
  const account = await Account.findById(user.account)
  if(!account){ return res.status(403).json("not found")}
  console.log(account?.transactions)
  return  res.json(account.accountBalance)
 }catch(err){
   res.status(500).json("Error getting transactions")
 }
}
module.exports={depositController,getAccountBalanceController,getAccountController,withdrawController,transferController,getTransactionController}


//DOCUMENTATION FOR DEPOSIT, WITHDRAW, TRANSFER  , GET ACCOUNT , GET ACCOUNT BALANCE , GET ACCOUNT BALANCE

//DEPOSIT
/**
 * @swagger
 * /api/account/cash/deposit/{userId}:
 *   post:
 *     summary: Deposit money into the user's account
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user's account to deposit into
 *         schema:
 *           type: string

 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to deposit
 *               description:
 *                 type: string
 *                 description: Description of the deposit (optional)
 *               pin:
 *                 type: number
 *                 description: The user's PIN for authorization
 *             example:
 *               amount: 100.0
 *               description: Deposit from ATM
 *               pin: 1234
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountNumber:
 *                   type: string
 *                   description: The user's account number
 *                 accountName:
 *                   type: string
 *                   description: The user's account name
 *                 accountBalance:
 *                   type: number
 *                   description: The updated account balance
 *                 transactions:
 *                   type: array
 *                   description: List of transactions including the deposit
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Transaction date and time
 *                       amount:
 *                         type: number
 *                         description: Transaction amount
 *                       type:
 *                         type: string
 *                         description: Transaction type (e.g., credit)
 *                       description:
 *                         type: string
 *                         description: Transaction description
 *       403:
 *         description: Incorrect PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Incorrect pin"
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Account not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Internal server error
 */

//======================================================================
//WITHDRAW


/**
 * @swagger
 * /api/account/cash/withdraw/{userId}:
 *   post:
 *     summary: Withdraw money from the user's account
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user's account to withdraw from
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to withdraw
 *               description:
 *                 type: string
 *                 description: Description of the withdrawal (optional)
 *               pin:
 *                 type: number
 *                 description: The user's PIN for authorization
 *             example:
 *               amount: 50.0
 *               description: ATM withdrawal
 *               pin: 1234
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountNumber:
 *                   type: string
 *                   description: The user's account number
 *                 accountName:
 *                   type: string
 *                   description: The user's account name
 *                 accountBalance:
 *                   type: number
 *                   description: The updated account balance after withdrawal
 *                 transactions:
 *                   type: array
 *                   description: List of transactions including the withdrawal
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Transaction date and time
 *                       amount:
 *                         type: number
 *                         description: Transaction amount
 *                       type:
 *                         type: string
 *                         description: Transaction type (e.g., debit)
 *                       description:
 *                         type: string
 *                         description: Transaction description
 *       400:
 *         description: Insufficient balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 description:
 *                   type: string
 *               example:
 *                 error: Insufficient balance
 *                 description: The account does not have enough balance for the withdrawal
 *       403:
 *         description: Incorrect PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Incorrect pin"
 *       404:
 *         description: User or account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Internal server error
 */

//======================================================================
//TRANSFER
/**
 * @swagger
 * /api/account/cash/transfer/{senderId}:
 *   post:
 *     summary: Transfer money from one user's account to another
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         description: The ID of the sender's account
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 description: The account number of the receiver
 *               amount:
 *                 type: number
 *                 description: The amount to transfer
 *               pin:
 *                 type: number
 *                 description: The sender's PIN for authorization
 *             example:
 *               accountNumber: "1234567890"
 *               amount: 100.0
 *               pin: 1234
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedSender:
 *                   type: object
 *                   description: The updated sender's account information
 *                 updatedReceiver:
 *                   type: object
 *                   description: The updated receiver's account information
 *       400:
 *         description: Insufficient balance or invalid receiver account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 description:
 *                   type: string
 *               example:
 *                 error: Insufficient balance for transfer
 *       403:
 *         description: Incorrect PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Incorrect pin"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: An error occurred while processing the transfer
 */

//======================================================================
//GET ACCOUNT

/**
 * @swagger
 * /api/account/cash/{userId}:
 *   get:
 *     summary: Get a list of transactions for a user's account
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user's account to retrieve transactions for
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of transactions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Transaction date and time
 *                   amount:
 *                     type: number
 *                     description: Transaction amount
 *                   type:
 *                     type: string
 *                     description: Transaction type (e.g., credit, debit)
 *                   description:
 *                     type: string
 *                     description: Transaction description
 *       403:
 *         description: User or account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error getting transactions"
 */

//======================================================================
//GET ACCOUNT BALANCE

/**
 * @swagger
 * /api/account/cash/balance/{userId}:
 *   get:
 *     summary: Get the account balance for a user
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user's account to retrieve the balance for
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               description: The user's account balance
 *       403:
 *         description: User or account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error getting account balance"
 */
