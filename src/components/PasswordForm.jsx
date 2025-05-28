// PasswordForm.js - Formulaire pour ajouter un mot de passe
import React, { useState } from "react";

export default function PasswordForm({ onAdd }) {
  const [site, setSite] = useState("");
  const [login, setLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = () => {
    if (site && login && userPassword) {
      onAdd(site, login, userPassword);
      setSite("");
      setLogin("");
      setUserPassword("");
    }
  };

  return (
    <div className="password-form">
      <h2>Ajouter un mot de passe</h2>
      <input
        placeholder="Nom du site"
        value={site}
        onChange={(e) => setSite(e.target.value)}
      />
      <input
        placeholder="Identifiant"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
}
