const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const Reservation = require('../models/reservationModel');

router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.userId });

    res.render('dashboard', {
      user: req.user,
      reservations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l’affichage du tableau de bord');
  }
});
module.exports = router;