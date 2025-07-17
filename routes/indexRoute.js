const express = require('express');
const router = express.Router();

// Liens avec mes autres fichiers routes :
const catwayRouter = require('./routes/catwayRoutes');
const userRouter = require('./routes/userRoutes');
const reservationRouter = require('./routes/reservationRoutes');

// Page d'accueil : 
router.get('/', async(req, res)=>{
    res.status(200);
    res.render('Accueuil');
});