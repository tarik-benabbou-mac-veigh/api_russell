const express = require('express');
const router = express.Router();

/* Lien fichier reservationService.js */ 
const reservationController = require('../controllers/reservationControllers');

/* Méthode GET : afficher l'ensemble des reservations */
router.get('/view', reservationController.renderReservationsList);

/* Méthode GET : Afficher le formulaire d'ajout d'un bateau */
router.get('/add', reservationController.renderNewReservationForm);

/* Méthode GET : lire l'ensemble des reservations */
router.get('/', reservationController.getAllReservations);

/* Méthode GET : lire informations reservation */
router.get('/:id', reservationController.getReservationId);

/* Méthode POST : ajouter un reservation */
router.post('/add', reservationController.createReservation);

/* Méthode PUT : modifier un reservation */
router.put('/:id', reservationController.updateReservation);

/* Affiche le formulaire d'édition */
router.get('/:id/edit', reservationController.renderEditReservationForm);

/* Méthode DELETE : supprimer un reservation */
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;