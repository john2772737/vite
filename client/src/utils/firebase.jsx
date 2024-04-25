// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7pGSxV5uytiHKiWtH46yeHw27xMQeYwk",
  authDomain: "auth-c921f.firebaseapp.com",
  projectId: "auth-c921f",
  storageBucket: "auth-c921f.appspot.com",
  messagingSenderId: "389343469622",
  appId: "1:389343469622:web:7ce35d8394ee0e65253897"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app as default };
// Initialize Firebase
