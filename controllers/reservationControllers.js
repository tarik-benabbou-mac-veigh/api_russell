const reservationService = require('../services/reservationServices');
const Reservation = require('../models/reservationModel');

/* Afficher la page HTML avec les réservations */
exports.renderReservationsList = async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.render('reservations/reservationList', { title: 'Liste des réservations', reservations });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/* Afficher la page HTML du formulaire pour ajouter un nouveau bateau */
exports.renderNewReservationForm = async(req, res) => {
  try {
    res.render('reservations/reservationForm', { title: 'Ajouter un nouveau bateau' });
  } catch (error) {
    console.error('Erreur lors du rendu du formulaire de nouveau bateau :', error);
    res.status(500).send('Erreur serveur lors du chargement du formulaire.');
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
// exports.createReservation = async(req,res)=>{
//     try{
//         await reservationService.createReservation(req.body);
//         res.redirect('/reservations/view');
//     }catch (error) {
//         console.error(`Erreur lors de l'ajout du bateau:`, error);
//         res.status(500).send(`Erreur lors de l'ajout du bateau`);
//     }
// };
exports.createReservation = async (req,res)=>{
    try{
        if(!req.user || !req.user.userId){
            return res.status(401).send('Utilisateur non trouvé');
        }
        const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

        const newReservation = await Reservation.create({
            catwayNumber,
            userId : req.user.userId,
            clientName,
            boatName, 
            startDate, 
            endDate,
        });
        res.redirect('/dashboard');
    }catch{
        console.error("Erreur lors de la création de la réservation :", error);
        res.status(500).send('Erreur lors de la création de la réservation.');
    }
};

/*Référence à la méthode PUT reservationRoutes.js */
exports.updateReservation = async(req,res)=>{
    const { id } = req.params;
    const { catwayNumber, clientName, boatName, startDate, endDate} = req.body;

    try{
        await reservationService.updateReservation(id, {
            catwayNumber,
            clientName,
            boatName,
            startDate,
            endDate,
        });
        res.redirect('/reservations/view');
    } catch (error){
        res.status(500).send(error.message);
    }
};

exports.renderEditReservationForm = async(req,res)=>{
    try{
        const reservation = await reservationService.getReservationId(req.params.id);
        if (!reservation){
            return res.status(404).send('Reservation non trouvé');
        }
        res.render('reservations/reservationEdit', {title: 'Modifier un bateau', reservation});
    } catch (error) {
        console.error(`Erreur lors de l’affichage du formulaire d’édition :`, error);
        res.status(500).send(`Erreur serveur`);
    }
};

/*Référence à la méthode DELETE reservationRoutes.js */
exports.deleteReservation = async(req,res)=>{
    await reservationService.deleteReservation(req.params.id);
    res.redirect('/reservations/view');
};