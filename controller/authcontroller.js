const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async(req, res)=> {
  try{
    const {name, email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        return res.status(409)
        .json({message: "user already registered",success: false});
    }
    const userModel= new UserModel({name, email, password});
    userModel.password= await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201)
    .json({message: "signup successfully",success:true});
  }
  catch(err){
      res.status(500)
      .json({message:"signup failed",success: false});
  }
};

module.exports.login = async(req, res)=> {
    try{
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(!user){
          return res.status(403)
          .json({message: "user not found!",success: false});
      }
      const ispassEqual = await bcrypt.compare(password,user.password);
      if(!ispassEqual){
        return res.status(403)
        .json({message:"auth failed",success:false});
      }
      const jwtToken = jwt.sign(
        {email: user.email,_id: user.id},
        process.env.jwt_secret,
        {expiresIn: '24h'}
      )
      res.status(200)
      .json({message: "signup successfully",
        success:true,
        jwtToken,
        email,
        name:user.name
    });
    }
    catch(err){
        res.status(500)
        .json({message:"signup failed",success: false});
    }
  };

