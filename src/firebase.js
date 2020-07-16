import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCD0GyQZUgCX3WRO91nSSQiGUjZx0H5NLg",
    authDomain: "todolist-app-21f11.firebaseapp.com",
    databaseURL: "https://todolist-app-21f11.firebaseio.com",
    projectId: "todolist-app-21f11",
    storageBucket: "todolist-app-21f11.appspot.com",
    messagingSenderId: "887571848169",
    appId: "1:887571848169:web:9d41fe4a74e733da01c978",
    measurementId: "G-R58DB684WH"
});

const db=firebaseApp.firestore();

export default db;