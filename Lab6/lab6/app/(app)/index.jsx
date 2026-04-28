import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { db, auth } from "../../config/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export default function Profile() {
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState({ name: "", age: "", city: "" });
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((snap) => {
                if (snap.exists()) {
                    setUserData(snap.data());
                }
            }).catch(err => console.log("Помилка завантаження:", err));
        }
    }, [user]);

    const handleUpdate = async () => {
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, userData);
            Alert.alert("Готово", "Збережено");
        } catch (e) {
            Alert.alert("Щось пішло не так", e.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (!password) {
            Alert.alert("Увага", "Введіть пароль");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(auth.currentUser);

            Alert.alert("Прощавайте", "Аккаунт видалено");
        } catch (e) {
            Alert.alert("Помилка", "Пароль не підійшов або сталася помилка");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.form}>
                <Text style={styles.txt}>Ваше ім'я</Text>
                <TextInput
                    style={styles.pole}
                    value={userData.name}
                    onChangeText={(t) => setUserData({...userData, name: t})}
                />

                <Text style={styles.txt}>Місто</Text>
                <TextInput
                    style={styles.pole}
                    value={userData.city}
                    onChangeText={(t) => setUserData({...userData, city: t})}
                />

                <Text style={styles.txt}>Вік</Text>
                <TextInput
                    style={styles.pole}
                    value={userData.age}
                    keyboardType="numeric"
                    onChangeText={(t) => setUserData({...userData, age: t})}
                />

                <View style={styles.btns}>
                    <Button title="Оновити профіль" color="green" onPress={handleUpdate} />
                    <Button title="Вийти" color="gray" onPress={logout} />
                </View>
            </View>

            <View style={styles.danger}>
                <Text style={styles.dangerTitle}>Видалення акаунту</Text>
                <Text style={styles.dangerNote}>Введіть пароль для підтвердження:</Text>
                <TextInput
                    style={styles.pole}
                    placeholder="Пароль"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Button title="Видалити мене з системи" color="red" onPress={handleDeleteAccount} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 20,
        backgroundColor: "white",
        flexGrow: 1,
    },
    form: {
        marginBottom: 25,
    },
    txt: {
        fontSize: 14,
        color: "gray",
        marginBottom: 4,
    },
    pole: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        marginBottom: 15,
        borderRadius: 4,
        fontSize: 16,
    },
    btns: {
        gap: 10,
    },
    danger: {
        marginTop: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 8,
    },
    dangerTitle: {
        color: "red",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 5,
    },
    dangerNote: {
        fontSize: 13,
        marginBottom: 8,
        color: "black",
    }
});