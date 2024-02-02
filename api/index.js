const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
//ROUTE IMPORTS
const authRoute = require("./routes/auth");
const transactionRoute = require("./routes/transactions");
const assessmentRoute = require('./routes/assessment');
app.use(cors());
app.use(express.json());
app.use("/api/user", authRoute);

app.use("/api/assessment" , assessmentRoute)






const dbURL = process.env.MONGO_URL;
mongoose
  .connect(dbURL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });



const port = process.env.PORT;

const server = app.listen(port || 5000, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server is running on port ${port}`);
  }
});

module.exports = app;
module.exports = server;
