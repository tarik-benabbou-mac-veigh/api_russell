const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    userName: {
        type: String, 
        trim: true,
        required: [true, `Ajoutez votre nom utilisateur`],
    },
    userEmail: {
        type: String,
        trim: true,
        required: [true, 'Ajoutez votre adresse email'],
        unique : true,
    },
    userPassword: {
        type: String,
        trim: true,
        required: [true, 'Ajoutez votre mot de passe'],
        minlength: [4, '4 caractères minimum pour votre mot de passe'],
    },
}, {timestamps: true});

// Hasher le mot de passe une fois modifié :
UserSchema.pre('save', function(next){
    if(!this.isModified('userPassword')){
        return next();
    }
    this.userPassword = bcrypt.hashSync(this.userPassword, 10);
    next();
});

module.exports = mongoose.model('UserModel', UserSchema);