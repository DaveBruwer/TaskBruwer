import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useAuthStore } from "../store/authStore"
import { useTaskStore } from "../store/taskStore"
import { config } from "../../config"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged')
  const authStore = useAuthStore()
  const taskStore = useTaskStore()
  console.log(user)
  if(user) {
    console.log(`User: ${user.displayName}`)
    authStore.currentUser = user
    loadData(user.uid, taskStore.$state, authStore.dataInit)
  } else {
    console.log('no user')
    authStore.currentUser = null
    taskStore.$state = {
      tasks: {
      },
      projects: {
      }
    }
    authStore.dataInit = false
  }
})

async function loadData(userID) {
  const authStore = useAuthStore()
  const taskStore = useTaskStore()
  await getDoc(doc(db, "users", userID))
    .then((doc_Snapp) => {
      taskStore.$state = JSON.parse(doc_Snapp.data().data)
      authStore.dataInit = true
    }).catch((error) => {
      console.log(error.message)
      alert(error.message)
    })
}

export {
  auth,
  db
}



