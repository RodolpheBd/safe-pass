// PasswordList.js - Liste des mots de passe avec commentaires explicatifs

// Import de React (nécessaire même sans hooks car on utilise JSX)
import React from "react";

// Composant PasswordList qui reçoit deux props :
// - entries : tableau d'objets contenant les informations des mots de passe
// - onDelete : fonction appelée pour supprimer un mot de passe
export default function PasswordList({ entries, onDelete }) {
  return (
    <div className="password-list">
      <h2>Mes mots de passe</h2>

      {/* Si aucun mot de passe n'est enregistré, on affiche un message */}
      {entries.length === 0 ? (
        <p>Aucun mot de passe enregistré.</p>
      ) : (
        // Sinon, on affiche chaque mot de passe dans une carte
        entries.map((entry) => (
          <div key={entry.id} className="password-item">
            <div>
              {/* Affichage du nom du site */}
              <p>
                <strong>Site:</strong> {entry.site}
              </p>

              {/* Affichage de l'identifiant */}
              <p>
                <strong>Login:</strong> {entry.login}
              </p>

              {/* Affichage du mot de passe déchiffré */}
              <p>
                <strong>Password:</strong> {entry.password}
              </p>
            </div>

            {/* Bouton pour supprimer le mot de passe, déclenche la fonction onDelete avec l'ID */}
            <button onClick={() => onDelete(entry.id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}
