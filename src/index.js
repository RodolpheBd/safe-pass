// index.js - Point d'entrée principal de l'application React avec commentaires pédagogiques

// Import de React pour pouvoir utiliser la syntaxe JSX et créer des composants
import React from "react";

// Import de ReactDOM pour afficher notre application dans le DOM du navigateur
import ReactDOM from "react-dom/client";

// Import du composant racine de notre application
import App from "./App";

// Sélection de l'élément HTML ayant pour id "root" (présent dans public/index.html)
// Cet élément est le point d'ancrage de notre application React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu de notre composant App à l'intérieur du mode strict
// React.StrictMode est utilisé en développement pour détecter des problèmes potentiels
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
