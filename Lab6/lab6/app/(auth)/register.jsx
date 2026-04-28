import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Register() {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [fio, setFio] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");

    const { register } = useAuth();
    const router = useRouter();

    const onReg = async () => {
        if (!mail || !pass || !fio) {
            return Alert.alert("Помилка", "Ім'я, пошта та пароль обов'язкові!");
        }

        try {
            await register(mail, pass, { name: fio, city, age });
        } catch (e) {
            Alert.alert("Помилка при реєстрації", e.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.center}>
            <View style={styles.box}>
                <Text style={styles.head}>Реєстрація</Text>

                <TextInput
                    placeholder="Ім'я"
                    value={fio}
                    onChangeText={setFio}
                    style={styles.inpt}
                />

                <TextInput
                    placeholder="Місто"
                    value={city}
                    onChangeText={setCity}
                    style={styles.inpt}
                />

                <TextInput
                    placeholder="Вік"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    style={styles.inpt}
                />

                <TextInput
                    placeholder="Email"
                    value={mail}
                    onChangeText={setMail}
                    style={styles.inpt}
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Пароль"
                    value={pass}
                    onChangeText={setPass}
                    style={styles.inpt}
                    secureTextEntry
                />

                <View style={styles.btn}>
                    <Button
                        title="Створити аккаунт"
                        onPress={onReg}
                        color="#000"
                    />
                </View>

                <TouchableOpacity onPress={() => router.push("/login")} style={styles.goLogin}>
                    <Text style={styles.goText}>Увійти</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flexGrow: 1,
        backgroundColor: "white",
        justifyContent: "center",
        padding: 20,
    },
    box: {
        width: "100%",
    },
    head: {
        fontSize: 24,
        fontWeight: "700",
        color: "black",
        marginBottom: 25,
        textAlign: "center",
    },
    inpt: {
        height: 45,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 15,
    },
    btn: {
        marginTop: 15,
    },
    goLogin: {
        marginTop: 20,
        alignItems: "center",
    },
    goText: {
        color: "blue",
        fontSize: 14,
        textDecorationLine: "underline"
    },
});