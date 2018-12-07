import firebase from "firebase/app";
import "firebase/database";
// Initialize Firebase
const config = {
  apiKey: "AIzaSyD8Ch38DUObNNd-f6cPYrdNYA_3NWmT69E",
  authDomain: "comments-devpleno-1.firebaseapp.com",
  databaseURL: "https://comments-devpleno-1.firebaseio.com",
  projectId: "comments-devpleno-1",
  storageBucket: "comments-devpleno-1.appspot.com",
  messagingSenderId: "793387937077"
};
firebase.initializeApp(config);

export const database = firebase.database();
