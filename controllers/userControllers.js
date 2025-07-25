const userService = require('../services/userServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* Afficher la page HTML avec les réservations */
exports.renderUserList = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render('users/userList', { title: 'Liste des utilisateurs', users });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/* Afficher la page HTML du formulaire pour ajouter un nouveau bateau */
exports.renderNewUserForm = async(req, res) => {
  try {
    res.render('users/userForm', { title: 'Ajouter un nouvel utilisateur' });
  } catch (error) {
    console.error(`Erreur lors du rendu du formulaire d'un nouvel utilisateur :`, error);
    res.status(500).send('Erreur serveur lors du chargement du formulaire.');
  }
};

/*Référence à la méthode GET (getAllUsers) userRoute.js */
exports.getAllUsers = async(req, res)=>{
    const users = await userService.getAllUsers();
    res.json(users);
};

/*Référence à la méthode GET userRoute.js */
exports.getUserId = async(req, res)=>{
    const user = await userService.getUserId(req.params.id);
    if(!user){
        return res.status(404).json({message:'Utilisateur non trouvé'});
    }else{
        res.json(user);
    }   
};

/*Référence à la méthode POST userRoute.js */
exports.createUser = async(req, res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
    await userService.createUser({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
    });

    res.redirect('/users/view');
  }catch(error){
    console.error(`Erreur lors de l'ajout d'un nouvel utilisateur:`, error);
    res.status(500).send(`Erreur lors de l'ajout d'un utilisateur`);
  }
};

/*Référence à la méthode PUT userRoute.js */
exports.updateUser = async(req, res)=>{
    const { id } = req.params;
    const { userName, userEmail, userPassword} = req.body;

  try{
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    await userService.updateUser(id, {
      userName: req.body.userName,
      userEmail : req.body.userEmail,
      userPassword: hashedPassword,
    });
    
    res.redirect('/users/view');
  }catch(error){
    res.status(500).send(error.message);
  }
};

exports.renderEditUserForm = async(req, res)=>{
    try{
        const user = await userService.getUserId(req.params.id);
        if (!user){
            return res.status(404).send('Utilisateur non trouvé');
        }
        res.render('users/userEdit', {title: 'Modifier un utilisateur', user});
    } catch (error) {
        console.error(`Erreur lors de l’affichage du formulaire d’édition :`, error);
        res.status(500).send(`Erreur serveur`);
    }
};

/*Référence à la méthode DELETE userRoute.js */
exports.deleteUser = async(req, res)=>{
    await userService.deleteUser(req.params.id);
    res.status(204).send('/');
};

exports.authenticateUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    // Vérification de l'adresse email :  
    const user = await userService.findByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    const verificationEmail = await bcrypt.compare(userPassword, user.userPassword);
    if (!verificationEmail) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Création du token pour le JWT :
    const payload = {
      _id: user._id,
      userName: user.userName,
      userEmail: user.userEmail
    };
    const expireIn = 24 * 60 * 60;
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: expireIn });

    // Stocker dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24h
    });
    res.redirect('/users/view');


  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};