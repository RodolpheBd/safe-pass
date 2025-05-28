// App.js - Composant principal avec commentaires explicatifs pour épreuve E5

// Import de React et des hooks nécessaires
import React, { useState, useEffect } from "react";

// Import des instances Firebase d'authentification et de base de données
import { auth, db } from "./firebase";

// Import des composants personnalisés
import AuthForm from "./components/AuthForm";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";

// Import des fonctions de Firebase Authentication
import { onAuthStateChanged, signOut } from "firebase/auth";

// Import des fonctions Firestore pour le CRUD
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Import de CryptoJS pour le chiffrement AES des mots de passe
import CryptoJS from "crypto-js";

// Import du fichier CSS pour le style de l'application
import "./App.css";

// Clé secrète utilisée pour le chiffrement des mots de passe
const SECRET_KEY = "cle-secrete-pour-chiffrement";

// Fonction pour chiffrer un texte avec AES
function encrypt(text) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

// Fonction pour déchiffrer un texte chiffré avec AES
function decrypt(cipher) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Erreur lors du déchiffrement :", err);
    return "Erreur de déchiffrement";
  }
}

// Composant principal de l'application
export default function App() {
  // État de l'utilisateur connecté
  const [user, setUser] = useState(null);
  // Liste des mots de passe de l'utilisateur
  const [passwordList, setPasswordList] = useState([]);

  // Hook exécuté au chargement pour surveiller l'état de connexion de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Met à jour l'état utilisateur
      if (currentUser) loadPasswords(currentUser.uid); // Charge les mots de passe s'il est connecté
    });
    return () => unsubscribe(); // Nettoie l'écouteur à la destruction du composant
  }, []);

  // Fonction pour se déconnecter
  const logout = async () => {
    await signOut(auth);
    setPasswordList([]); // Vide la liste des mots de passe après déconnexion
  };

  // Fonction pour ajouter un mot de passe chiffré à Firestore
  const addPassword = async (site, login, userPassword) => {
    const encryptedPassword = encrypt(userPassword); // Chiffrement du mot de passe
    await addDoc(collection(db, "passwords"), {
      uid: user.uid, // Lien avec l'utilisateur connecté
      site,
      login,
      password: encryptedPassword,
    });
    loadPasswords(user.uid); // Recharge les mots de passe
  };

  // Fonction pour charger les mots de passe depuis Firestore et les déchiffrer
  const loadPasswords = async (uid) => {
    const querySnapshot = await getDocs(collection(db, "passwords"));
    const data = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((entry) => entry.uid === uid) // Filtrage par utilisateur
      .map((entry) => ({
        ...entry,
        password: decrypt(entry.password), // Déchiffrement
      }));
    setPasswordList(data);
  };

  // Fonction pour supprimer un mot de passe
  const deletePassword = async (id) => {
    await deleteDoc(doc(db, "passwords", id));
    loadPasswords(user.uid); // Recharge la liste après suppression
  };

  // Affichage de l'application : formulaire d'auth si non connecté, gestionnaire sinon
  return (
    <div className="container">
      {!user ? (
        // Affiche le formulaire de connexion/inscription
        <AuthForm />
      ) : (
        // Affiche l'application principale
        <div>
          <h1 className="title">SafePass - Gestionnaire de mots de passe</h1>
          <button className="logout-btn" onClick={logout}>
            Déconnexion
          </button>
          <PasswordForm onAdd={addPassword} />
          <PasswordList entries={passwordList} onDelete={deletePassword} />
        </div>
      )}
    </div>
  );
}
