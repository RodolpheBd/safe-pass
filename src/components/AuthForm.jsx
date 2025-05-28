// AuthForm.js - Formulaire d'authentification avec commentaires explicatifs

// Import de React et du hook useState pour gérer les champs
import React, { useState } from "react";

// Import de l'objet auth configuré dans firebase.js
import { auth } from "../firebase";

// Import des fonctions Firebase Authentication pour inscription et connexion
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Composant AuthForm pour permettre à l'utilisateur de s'authentifier
export default function AuthForm() {
  // États pour stocker les données du formulaire
  const [email, setEmail] = useState(""); // Adresse email
  const [password, setPassword] = useState(""); // Mot de passe

  // Fonction d'inscription (appelée lorsqu'on clique sur le bouton "Inscription")
  const register = async () => {
    try {
      // Création d'un nouvel utilisateur avec Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Affiche une erreur si l'inscription échoue
      alert("Erreur lors de l'inscription : " + error.message);
    }
  };

  // Fonction de connexion (appelée lorsqu'on clique sur "Connexion")
  const login = async () => {
    try {
      // Connexion d'un utilisateur existant avec Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Affiche une erreur si la connexion échoue
      alert("Erreur lors de la connexion : " + error.message);
    }
  };

  // Rendu du formulaire HTML
  return (
    <div className="auth-form">
      <h2>Connexion / Inscription</h2>

      {/* Champ email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Champ mot de passe */}
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Bouton de connexion */}
      <button onClick={login}>Connexion</button>

      {/* Bouton d'inscription */}
      <button onClick={register}>Inscription</button>
    </div>
  );
}
