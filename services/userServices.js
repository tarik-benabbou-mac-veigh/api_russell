const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

/*Référence à la méthode GET (getAllUsers) userController.js */
exports.getAllUsers = () => {
  return userModel.find();
};

/*Référence à la méthode GET userController.js */
exports.getUserId = (userId)=>{
    return userModel.findById(userId);
};

/*Référence à la méthode POST userController.js */
exports.createUser = (userData)=>{
    const user = new userModel(userData);
    return user.save();
};

/*Référence à la méthode PUT userController.js */
exports.updateUser = async(userId, userData) => {
    if (userData.userPassword) {
    const salt = await bcrypt.genSalt(10);
    userData.userPassword = await bcrypt.hash(userData.userPassword, salt);
  }
  return userModel.findByIdAndUpdate(userId, userData, { new: true });
};

/*Référence à la méthode DELETE userController.js */
exports.deleteUser = (userId)=>{
    return userModel.findByIdAndDelete(userId);
};  

/*Référence à la méthode POST (authentification) userController.js */
exports.findByEmail = (email) => {
    return userModel.findOne({ userEmail: email });
};