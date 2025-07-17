const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    catwayNumber: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez le numéro de catway réservé`],
    },
    clientName: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez votre nom client`],
    },
    boatName: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez le nom du bateau amarré`],
    },
    startDate: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez la date de début de réservation`],
    },
    endDate: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez la date de fin de réservation`],
    },
});

module.exports = mongoose.model('ReservationModel', ReservationSchema);