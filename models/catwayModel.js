const mongoose = require('mongoose');

const CatwaySchema = mongoose.Schema({
    catwayNumber: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez le numéro de catway réservé.`],
        unique: true,
    },
    catwayType: {
        type: String, 
        trim: true,
        required: [true,'long' || 'short'],
    },
    catwayState: {
        type: String, 
        trim: true,
        required: [true, `Décrivez-nous l'état de la passerelle.`],
    },
});

module.exports = mongoose.model('CatwayModel', CatwaySchema);