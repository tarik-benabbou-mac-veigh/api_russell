const express = require('express');
const router = express.Router();
const connexionController = require('../controllers/connexionControllers');

/* Méthode POST pour être redirigé vers le tableau de bord (dashboard.ejs) */
router.post('/login', connexionController.loginUser);

module.exports = router;