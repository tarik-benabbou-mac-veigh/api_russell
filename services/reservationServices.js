const reservationModel = require('../models/reservationModel');

/*Référence à la méthode GET (getAllReservations) reservationControllers.js */
exports.getAllReservations = () => {
  return reservationModel.find();
};

/*Référence à la méthode GET reservationControllers.js */
exports.getReservationId = (reservationId)=>{
    return reservationModel.findById(reservationId);
};

/*Référence à la méthode POST reservationControllers.js */
exports.createReservation = (reservationData)=>{
    const reservation = new reservationModel(reservationData);
    return reservation.save();
};

/*Référence à la méthode PUT reservationControllers.js */
exports.updateReservation = (reservationId, reservationData) => {
  return reservationModel.findByIdAndUpdate(reservationId, reservationData, { new: true });
};

/*Référence à la méthode DELETE reservationControllers.js */
exports.deleteReservation = (reservationId)=>{
    return reservationModel.findByIdAndDelete(reservationId);
};  