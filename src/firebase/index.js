import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useAuthStore } from "../store/authStore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVn48wnBDQeKeW2GVeO9efZMmEHMd42kE",
  authDomain: "task-bruwer.firebaseapp.com",
  projectId: "task-bruwer",
  storageBucket: "task-bruwer.appspot.com",
  messagingSenderId: "356333955183",
  appId: "1:356333955183:web:ebb5a4b755a50ec2b1859a",
  measurementId: "G-758YE57N3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged')
  const authStore = useAuthStore()
  if(user) {
    authStore.currentUser = user
  } else {
    authStore.currentUser = null
  }
})

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  auth,
  db
}

