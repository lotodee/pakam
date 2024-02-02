const express = require('express');
const User = require("../model/UserModel")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const Account = require("../model/accountModel")
const bcrypt = require("bcrypt")




const registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const { firstName, lastName, username, email, phone, password, pin } = req.body;

    let isValid = true; // Add a flag to track validation status

    const validateField = (field, minLength, errorMessage) => {
      if (!field || field.length < minLength) {
        res.status(400).json(errorMessage);
        isValid = false; // Set the flag to false if validation fails
      }
    };



    validateField(password, 6, 'Password is required and must be at least 6 characters.');

   

    // Check if all validations are successful
    if (!isValid) {
      return; // Don't proceed further if any validation failed
    }
  
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
    
      password: hashedPassword,
    
    });

    const savedUser = await newUser.save();
    
    const accessToken = jwt.sign(
      {
        id: savedUser.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
console.log(accessToken)
    res.status(200).json(accessToken);
    
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation failed', details: err.errors });
    } else {
      res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  }
};




const comparePasswords = async (passwordInDatabase, passwordFromRequest) => {
  try {
    return await bcrypt.compare(passwordInDatabase, passwordFromRequest);
  } catch (error) {
    throw error;
  }
};






//LOGIN 
const loginUser = async(req,res)=>{
  try {
    console.log(req.body)
    const { username,password } = req.body;

console.log("cool")
    if (!req.body || !username|| !password) {
      return res.status(401).json("missing fields");
    } else {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json("user not found");
      } else {
        console.log("befro cjs")
        console.log(user)
const isPasswordValid = await comparePasswords( user.password ,password);
        if (isPasswordValid) {
          return res.status(401).json("Incorrect Login details");
        }else{
          const accessToken = jwt.sign({
            id:user.id,
           
          },process.env.SECRET_KEY,
          {expiresIn:"1d"})
            const {password , ...others} = user._doc;
            console.log(accessToken)
        return res.status(200).json({...others,accessToken});
        
        }
       
      }
    
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
 }

module.exports = {registerUser ,loginUser}



