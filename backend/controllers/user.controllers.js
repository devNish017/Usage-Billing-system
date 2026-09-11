const User =require("../models/user.model");

const createUser =async(req,res)=>{
  try {
    const {name,email} =req.body;
    if (!name || !email) {
      return res.status(400).json({
        message:"Name and email are required"
      });
    }
    const user =await User.create({
      name,
      email
    });

    res.status(201).json({message:"User created successfully",user });
}catch (error) {
    res.status(500).json({message:"Failed to create user",
      error:error.message});
  }
};

const getUsers = async (req, res) => {
  try {
    const users =await User.find();

    res.status(200).json({
      users
    });
  } catch (error){
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
};

module.exports = {createUser,getUsers};