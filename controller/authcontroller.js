const UserModel = require("../models/user");
const TodoModel = require("../models/todoModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require("../middleware/confirmation");
const crypto = require("crypto");

const tempUsers = {};

module.exports.signup = async(req, res)=> {

  try {
  const { name, email, password } = req.body; 
      // 🔹 Check if user already exists
      const user = await UserModel.findOne({ email });
      if (user) {
          return res.status(400).json({ message: "Email already registered" });
      }

      // 🔹 Generate a confirmation code (6-digit)
      const confirmationCode = crypto.randomInt(100000, 999999).toString();
      const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 min

      
      tempUsers[email]={
          name,
          email,
          password: await bcrypt.hash(password,10),
          confirmationCode,
          codeExpiresAt,
      };
      await sendConfirmationEmail(email, confirmationCode);

      res.status(200).json({ message: "Confirmation email sent! Please verify your email.",success: true });

  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.confirmEmail = async (req, res) => {
  try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({ message: "Email and confirmation code required!" });
    }

      if (!tempUsers[email]) {
          return res.status(400).json({ message: "Invalid or expired confirmation code" });
      }

      const userData = tempUsers[email];

      if (userData.confirmationCode !== code) {
          return res.status(400).json({ message: "Incorrect confirmation code" });
      }

      // Save user to the database
      const newUser = new UserModel({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          isVerified: true,
      });
      await newUser.save();

      // Remove from temp storage
      delete tempUsers[email];

      res.status(200).json({ message: "Email confirmed! You can now log in.",success: true });
  } catch (error) {
      console.error("Error confirming email:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.login = async(req, res)=> {
    try{
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(!user){
          return res.status(403)
          .json({message: "User not found!",success: false});
      }
      const ispassEqual = await bcrypt.compare(password,user.password);
      if(!ispassEqual){
        return res.status(403)
        .json({message:"Incorrect password. Please try again.",success:false});
      }
      const jwtToken = jwt.sign(
        {email: user.email,_id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
      )
      res.status(200)
      .json({message: "Login successfully",
        success:true,
        jwtToken,
        email,
        name:user.name
    });
    }
    catch(err){
        res.status(500)
        .json({message:"Login failed",success: false});
    }
  };

  module.exports.removeAccount = async (req, res) => {
    try {
      const { userId } = req.params; // Extract user ID from token
      const deletedTodo = await TodoModel.findByIdAndDelete(userId);
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      if (!deletedUser || !deletedTodo) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "Account deleted successfully!" });
  } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }

  };