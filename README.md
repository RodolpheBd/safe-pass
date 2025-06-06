# SafePass – Gestionnaire de mots de passe

SafePass est une application web développée avec **React** et **Firebase**. Elle permet à un utilisateur de :

- S'inscrire et se connecter (Firebase Auth)
- Ajouter, consulter et supprimer ses mots de passe chiffrés (AES)
- Les données sont stockées de façon sécurisée dans Firestore (base de données NoSQL)

---

## 🔧 Technologies utilisées

- React (create-react-app)
- Firebase Authentication
- Firebase Firestore
- CryptoJS (chiffrement AES)
- CSS natif (style inspiré des leaders du marché)

---

## 🚀 Fonctionnalités

- 🔐 Authentification email / mot de passe
- 📄 Ajout d'un mot de passe (site, identifiant, mot de passe)
- 🔒 Chiffrement AES des mots de passe avant stockage
- 📂 Liste des mots de passe personnels
- ❌ Suppression sécurisée
- 🧼 Interface claire et responsive

---

## 🛠️ Installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/ton-compte/safepass.git
cd safepass
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer Firebase**

Créer un fichier `firebase.js` dans `/src` et y coller votre configuration Firebase :

```js
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  ...
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

4. **Lancer l'application**

```bash
npm start
```

---

## ✅ À propos

Ce projet a été réalisé dans le cadre de l’épreuve **E5 du BTS SIO option SLAM**. Il met en œuvre des compétences en développement web, sécurité, base de données, et organisation modulaire du code.

## 📃 Licence

Projet libre à but pédagogique.
