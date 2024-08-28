import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration object containing your Firebase project's details
const firebaseConfig = {
  apiKey: process.env.APIKEY as string,
  authDomain: process.env.AUTHDOMAIN as string,
  projectId: process.env.PROJECTID as string,
  storageBucket: process.env.STORAGEBUCKET as string,
  messagingSenderId: process.env.MESSAGINGSENDERID as string,
  appId: process.env.APPID as string,
  measurementId: process.env.MEASUREMENTID as string,
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Get Firebase Storage instance
const storage = getStorage(app);

export { storage };
