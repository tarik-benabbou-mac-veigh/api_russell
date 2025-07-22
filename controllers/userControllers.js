const userService = require('../services/userServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*Référence à la méthode GET (getAllUsers) userRoute.js */
exports.getAllUsers = async(req,res)=>{
    const users = await userService.getAllUsers();
    res.json(users);
};

/*Référence à la méthode GET userRoute.js */
exports.getUserId = async(req,res)=>{
    const user = await userService.getUserId(req.params.id);
    if(!user){
        return res.status(404).json({message:'Utilisateur non trouvé'});
    }else{
        res.json(user);
    }   
};

/*Référence à la méthode POST userRoute.js */
exports.createUser = async(req,res)=>{
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
};

/*Référence à la méthode PUT userRoute.js */
exports.updateUser = async(req,res)=>{
    const updateUser = await userService.updateUser(req.params.id, req.body);
    res.json(updateUser);
};

/*Référence à la méthode DELETE userRoute.js */
exports.deleteUser = async(req,res)=>{
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

    // Statuts de vérification token
    res.header('Authorization', 'Bearer ' + token);
    return res.status(200).json({
      message: '✅ Authentification utilisateur réussie',
      token,
      user: payload
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};