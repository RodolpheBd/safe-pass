// App.js - Version complète avec structure modulaire + chiffrement AES
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import CryptoJS from "crypto-js";

const SECRET_KEY = "cle-secrete-pour-chiffrement"; // à stocker côté client uniquement pour tests

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [login, setLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) loadPasswords(currentUser.uid);
    });
    return () => unsubscribe();
  }, []);

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setPasswordList([]);
  };

  const addPassword = async () => {
    if (!site || !login || !userPassword) return;
    const encryptedPassword = encrypt(userPassword);
    await addDoc(collection(db, "passwords"), {
      uid: user.uid,
      site,
      login,
      password: encryptedPassword,
    });
    loadPasswords(user.uid);
    setSite("");
    setLogin("");
    setUserPassword("");
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
    <div className="p-6 max-w-xl mx-auto">
      {!user ? (
        <div className="space-y-2">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={loginUser}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Connexion
          </button>
          <button
            onClick={register}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Inscription
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold mb-4">
            SafePass - Gestionnaire de mots de passe
          </h1>
          <button
            onClick={logout}
            className="mb-4 bg-red-500 text-white p-2 rounded"
          >
            Déconnexion
          </button>

          <div className="space-y-2">
            <input
              placeholder="Nom du site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Identifiant"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Mot de passe"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={addPassword}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Ajouter
            </button>
          </div>

          <div className="mt-6">
            {passwordList.map((entry) => (
              <div
                key={entry.id}
                className="border p-3 rounded mb-2 flex justify-between items-center"
              >
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
                <button
                  onClick={() => deletePassword(entry.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
