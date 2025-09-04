const userModel=require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
module.exports.registerUser = async(req, res) => {
    const{ name , email, password}=req.body;
  try{
      
   let user= await userModel.findOne({email});
   if(user){
    return res.status(400).send("Your Account already exist ,please login.");
   }
   
   let salt =await bcrypt.genSalt();
   let hash =await bcrypt.hash(password,salt);

   user = await userModel.create({
      email,
      password: hash,
      name,
   });
  let token = generateToken({email});

  res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(201).send("Logged in Sucessfully");
  }catch(err){
   res.status(500).send(err.message);
  }
};

module.exports.loginUser = async(req, res) => {
    const{email,password}=req.body;
    try{
        let user =await userModel.findOne({email});

    if(!user){
        return res.status(500).send("Email or Password Incorrect.");

    }
    let result = await bcrypt.compare(password,user.password);
    if(result){
        let token = generateToken({email});

    res.cookie("token",token,{
      httpOnly:true,
      secure:true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
   });
    res.status(201).send(user);
   }else{
    return res.status(500).send("Email or Password Incorrect.");
   }

    }catch(err){
        res.status(500).send(err.message);

    }
};

module.exports.logoutUser = (req, res) => {
    res.cookie("token","",{
    httpOnly:true,
    secure:true,
  });
  res.status(201).send("Logged out Sucessfully");
};

module.exports.getUserProfile = (req, res) => {
    console.log(req.user);
    res.send("loggedin ho aap");
};
