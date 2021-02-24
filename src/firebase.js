import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4s5Pw2MFx1YzdqjrGkryI5bjr6Bt9BdQ",
    authDomain: "crud-fcdd0.firebaseapp.com",
    projectId: "crud-fcdd0",
    storageBucket: "crud-fcdd0.appspot.com",
    messagingSenderId: "68138399660",
    appId: "1:68138399660:web:d655beab18e89bea602c09"
  };

  export const firebaseApp=firebase.initializeApp(firebaseConfig);