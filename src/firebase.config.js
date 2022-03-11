import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyAiwH27lqG8IDR8hbC9bcD6D33IMDSlOGk",
  authDomain: "nodemcu-iot-a8e67.firebaseapp.com",
  databaseURL: "https://nodemcu-iot-a8e67.firebaseio.com",
  projectId: "nodemcu-iot-a8e67",
  storageBucket: "nodemcu-iot-a8e67.appspot.com",
  messagingSenderId: "274516753894",
  appId: "1:274516753894:web:c90e0e85fdbf9c3b75ea27",
  measurementId: "G-EJM7DLNVX7"
});

export const auth = app.auth();
export const db = app.database();
export const fs = app.firestore();
export default app;
