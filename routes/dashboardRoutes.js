const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const Reservation = require('../models/reservationModel');
const connexionController = require('../controllers/connexionControllers');

const User = require('../models/userModel');

router.get('/', auth, async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user.userId);
    if(!loggedInUser){
      return res.status(401).render('accueil', {error: 'Utilisateur non trouvé'})
    };

    const reservations = await Reservation.find({ userId: loggedInUser._id });

    res.render('dashboard', {
      user: loggedInUser,
      reservations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l’affichage du tableau de bord');
  }
});

router.get('/documentation', auth, (req, res) => {
  res.render('documentation_api');
});

router.get('/logout', connexionController.logout);


module.exports = router;