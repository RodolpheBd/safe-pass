import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import AuthForm from "./components/AuthForm";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import "./App.css";

const SECRET_KEY = "cle-secrete-pour-chiffrement";

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

function decrypt(cipher) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Erreur lors du déchiffrement :", err);
    return "Erreur de déchiffrement";
  }
}

export default function App() {
  const [user, setUser] = useState(null);
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) loadPasswords(currentUser.uid);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setPasswordList([]);
  };

  const addPassword = async (site, login, userPassword) => {
    const encryptedPassword = encrypt(userPassword);
    await addDoc(collection(db, "passwords"), {
      uid: user.uid,
      site,
      login,
      password: encryptedPassword,
    });
    loadPasswords(user.uid);
  };

  const loadPasswords = async (uid) => {
    const querySnapshot = await getDocs(collection(db, "passwords"));
    const data = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((entry) => entry.uid === uid)
      .map((entry) => ({
        ...entry,
        password: decrypt(entry.password),
      }));
    setPasswordList(data);
  };

  const deletePassword = async (id) => {
    await deleteDoc(doc(db, "passwords", id));
    loadPasswords(user.uid);
  };

  return (
    <div className="container">
      {!user ? (
        <AuthForm />
      ) : (
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
