import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBQsc9A9lvuZlXUm06bd77xGy8sOrJZW8k",
  authDomain: "hirelink-91d85.firebaseapp.com",
  projectId: "hirelink-91d85",
  storageBucket: "hirelink-91d85.appspot.com",
  messagingSenderId: "973326403721",
  appId: "1:973326403721:web:65aa867c1e45472b9a5e58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const firestoredb = getFirestore(app);
export { firestoredb };
