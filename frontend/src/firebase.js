import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm0l2oJDAWNwpR_VunjK5pvGONhnOl4jk",
  authDomain: "krishi-maitri-fb43c.firebaseapp.com",
  projectId: "krishi-maitri-fb43c",
  storageBucket: "krishi-maitri-fb43c.firebasestorage.app",
  messagingSenderId: "579997030076",
  appId: "1:579997030076:web:7cd9c8001c90f05c3d22b9",
};

const app = initializeApp(firebaseConfig);

// 🔥 MUST BE NAMED EXPORT
export const auth = getAuth(app);
