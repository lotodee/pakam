const router = require("express").Router()
const {depositController,withdrawController,transferController,getAccountBalanceController,getTransactionController , getAccountController} = require("../controllers/transactionsController")
const { verifyTokenAndAuthorization } = require("./verifyToken");
//DEPOSIT
router.post("/cash/deposit/:userId" ,verifyTokenAndAuthorization,depositController)//
router.get("cash/history/:userId" ,verifyTokenAndAuthorization,getTransactionController)
router.get("/cash/:userId" ,verifyTokenAndAuthorization,getAccountController)//
router.get("/cash/balance/:userId" ,verifyTokenAndAuthorization,getAccountBalanceController)//
router.post("/cash/withdraw/:userId" ,verifyTokenAndAuthorization,withdrawController)//
router.post("/cash/transfer/:senderId" ,verifyTokenAndAuthorization,transferController)//

module.exports=router;
