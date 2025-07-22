const mongoose = require('mongoose');
const clientOptions = {
    dbName : 'apinode',
};

// Connexion à la base de données MongoDB : 
exports.connexionMongoDB = async ()=>{
    /*Je vérifie la connexion*/
    try{
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log(`✅ Base de données MongoDB connectée.`);
    }catch(error){
        console.log(error);
    }
};