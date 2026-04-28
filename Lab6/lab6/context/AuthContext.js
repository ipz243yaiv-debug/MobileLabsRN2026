import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return checkAuth;
    }, []);

    const signup = async (email, pass, info) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, pass);
            const uid = res.user.uid;

            await setDoc(doc(db, "users", uid), {
                email: email,
                name: info.name || "Користувач",
                age: info.age || "",
                city: info.city || "",
                date: new Date().toLocaleDateString()
            });
        } catch (err) {
            console.error("Помилка при створенні юзера:", err.message);
            throw err;
        }
    };

    const login = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const logout = () => {
        return signOut(auth);
    };

    const forgotPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const contextData = {
        user, loading, register: signup, login, logout, resetPassword: forgotPass};

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);