import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyC24CHVHjwo3Rn3EjurkkyyjeIxvidcUnM",
    authDomain: "lab6rmd-52ce8.firebaseapp.com",
    projectId: "lab6rmd-52ce8",
    storageBucket: "lab6rmd-52ce8.firebasestorage.app",
    messagingSenderId: "519960875769",
    appId: "1:519960875769:web:a8b67163cd297c1e7f8828",
    measurementId: "G-1F96850N33"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };




