// PasswordList.js - Liste des mots de passe
import React from "react";

export default function PasswordList({ entries, onDelete }) {
  return (
    <div className="password-list">
      <h2>Mes mots de passe</h2>
      {entries.length === 0 ? (
        <p>Aucun mot de passe enregistré.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="password-item">
            <div>
              <p>
                <strong>Site:</strong> {entry.site}
              </p>
              <p>
                <strong>Login:</strong> {entry.login}
              </p>
              <p>
                <strong>Password:</strong> {entry.password}
              </p>
            </div>
            <button onClick={() => onDelete(entry.id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}
