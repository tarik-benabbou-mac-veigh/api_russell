# 📘 Informations sur l'API du port de plaisance Russell

Cette API permet de gérer des utilisateurs, des réservations de catways, et les catways eux-mêmes. L'authentification se fait par JSON Web Token (JWT), assurant une session sécurisée pour les utilisateurs connectés.

---

## 📍 Accéder à la Documentation Complète

Une fois connecté à l'application, vous pouvez accéder à la documentation complète de l'API.
Rendez-vous simplement dans la **barre de navigation** et cliquez sur le bouton **'Documentation API'** pour obtenir tous les détails.

---

## 🔐 Authentification et Connexion

L'authentification est basée sur les **JSON Web Tokens (JWT)**. Après une connexion réussie, un token JWT est généré et stocké dans un **cookie HTTP-only**. Ce cookie est automatiquement envoyé avec vos requêtes aux routes protégées, vous donnant accès aux fonctionnalités qui nécessitent une session active.

### Démarrage Rapide

Pour lancer l'API et y accéder :

1.  **Clonez le dépôt :**
    ```bash
    git clone [https://github.com/tarik-benabbou-mac-veigh/api_russell.git](https://github.com/tarik-benabbou-mac-veigh/api_russell.git)
    ```
2.  **Accédez au répertoire de l'API et démarrez le serveur :**
    ```bash
    cd api
    npm install # Installe les dépendances si ce n'est pas déjà fait
    npm run start
    ```
3.  **Accédez à l'application via votre navigateur :**
    Ouvrez votre navigateur et naviguez vers : `http://localhost:3000/`

### Connexion Utilisateur

Connectez-vous avec un email et un mot de passe pour obtenir un token d'authentification et accéder à votre tableau de bord.

[**POST** `/connexion/login`](http://localhost:3000/connexion/login)

#### Exemple de corps de requête (`body`) :
```json
{
  "email": "alain@gmail.com",
  "password": "2025"
}
