// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcrSzzY_WbzIkbsTgBmwBnsNj7IPHkDV4",
  authDomain: "test-6c839.firebaseapp.com",
  projectId: "test-6c839",
  storageBucket: "test-6c839.appspot.com",
  messagingSenderId: "209979496649",
  appId: "1:209979496649:web:657bf98026fcdc3a215518",
  measurementId: "G-TLXR839X8H"
};

// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);


// Get a reference to the storage service, which is used to create references in your storage bucket
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}