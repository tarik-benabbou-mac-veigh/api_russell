const catwayModel = require('../models/catwayModel');

/*Référence à la méthode GET (getAllCatways) catwayControllers.js */
exports.getAllCatways = () => {
  return catwayModel.find();
};

/*Référence à la méthode GET catwayControllers.js */
exports.getCatwayId = (catwayId)=>{
    return catwayModel.findById(catwayId);
};

/*Référence à la méthode POST catwayControllers.js */
exports.createCatway = (catwayData)=>{
    const catway = new catwayModel(catwayData);
    return catway.save();
};

/*Référence à la méthode PUT catwayControllers.js */
exports.updateCatway = (catwayId, catwayData) => {
  return catwayModel.findByIdAndUpdate(catwayId, catwayData, { new: true });
};

/*Référence à la méthode DELETE catwayControllers.js */
exports.deleteCatway = (catwayId)=>{
    return catwayModel.findByIdAndDelete(catwayId);
};  