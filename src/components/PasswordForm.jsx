// PasswordForm.js - Formulaire pour ajouter un mot de passe avec commentaires explicatifs

// Import du hook useState pour gérer les états locaux
import React, { useState } from "react";

// Composant PasswordForm reçoit une fonction onAdd en props pour ajouter un mot de passe
export default function PasswordForm({ onAdd }) {
  // États pour gérer les valeurs des champs du formulaire
  const [site, setSite] = useState(""); // Nom du site web ou service
  const [login, setLogin] = useState(""); // Identifiant utilisateur
  const [userPassword, setUserPassword] = useState(""); // Mot de passe à stocker

  // Fonction appelée lors du clic sur le bouton "Ajouter"
  const handleSubmit = () => {
    // Vérifie que tous les champs sont remplis
    if (site && login && userPassword) {
      // Appelle la fonction de création fournie par le composant parent (App.js)
      onAdd(site, login, userPassword);
      // Réinitialise les champs du formulaire
      setSite("");
      setLogin("");
      setUserPassword("");
    }
  };

  return (
    <div className="password-form">
      <h2>Ajouter un mot de passe</h2>

      {/* Champ pour le nom du site */}
      <input
        placeholder="Nom du site"
        value={site}
        onChange={(e) => setSite(e.target.value)}
      />

      {/* Champ pour l'identifiant utilisateur */}
      <input
        placeholder="Identifiant"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      {/* Champ pour le mot de passe */}
      <input
        placeholder="Mot de passe"
        type="password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />

      {/* Bouton pour soumettre le formulaire */}
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
}
