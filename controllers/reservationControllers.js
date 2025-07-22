const reservationService = require('../services/reservationServices');

/* Afficher la page HTML avec les réservations */
exports.renderReservationsList = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.render('reservations/reservationsList', { title: 'Liste des réservations', reservations });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/*Référence à la méthode GET (getAllReservations) reservationRoutes.js */
exports.getAllReservations = async(req,res)=>{
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
};

/*Référence à la méthode GET reservationRoutes.js */
exports.getReservationId = async(req,res)=>{
    const reservation = await reservationService.getReservationId(req.params.id);
    if(!reservation){
        return res.status(404).json({message:'reservation non trouvée'});
    }else{
        res.json(reservation);
    }   
};

/*Référence à la méthode POST reservationRoutes.js */
exports.createReservation = async(req,res)=>{
    const newReservation = await reservationService.createReservation(req.body);
    res.status(201).json(newReservation);
};

/*Référence à la méthode PUT reservationRoutes.js */
exports.updateReservation = async(req,res)=>{
    const updateReservation = await reservationService.updateReservation(req.params.id, req.body);
    res.json(updateReservation);
};

/*Référence à la méthode DELETE reservationRoutes.js */
exports.deleteReservation = async(req,res)=>{
    await reservationService.deleteReservation(req.params.id);
    res.status(204).send('/');
};