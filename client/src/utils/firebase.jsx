import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import necessary storage functions

// Import necessary storage functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7pGSxV5uytiHKiWtH46yeHw27xMQeYwk",
  authDomain: "auth-c921f.firebaseapp.com",
  projectId: "auth-c921f",
  storageBucket: "auth-c921f.appspot.com",
  messagingSenderId: "389343469622",
  appId: "1:389343469622:web:c111b4f5c0cb6996253897"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig,'seller');

// Get the auth instance
const auth = getAuth(app);
const imageDb= getStorage(app)

// Export the `auth` object and the `uploadImage` function
export { auth, imageDb, app as default };