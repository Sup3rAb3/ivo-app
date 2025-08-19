import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOXL2xCuv7C3SdfKUprTEuqS96cV4GyLQ",
  authDomain: "ivo-backend-app.firebaseapp.com",
  projectId: "ivo-backend-app",
  storageBucket: "ivo-backend-app.firebasestorage.app",
  messagingSenderId: "148241708805",
  appId: "1:148241708805:web:b1bc923c7430d29639a96c",
  measurementId: "G-EFXGZ9RMDS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
