const express = require('express');
const router = express.Router();

// Liens avec mes autres fichiers routes :
const catwayRouter = require('./catwayRoutes');
const userRouter = require('./userRoutes');
const reservationRouter = require('./reservationRoutes');
const connexionRouter = require('./connexionRoutes');
const dashboardRouter = require('./dashboardRoutes');

// Page d'accueil : 
router.get('/', async(req, res)=>{
    res.status(200);
    res.render('accueil');
});

// Routes enfants :
router.use('/catways', catwayRouter);
router.use('/users', userRouter);
router.use('/reservations', reservationRouter);
router.use('/connexion', connexionRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;