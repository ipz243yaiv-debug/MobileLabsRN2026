import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const { login, resetPassword } = useAuth();
    const router = useRouter();

    const doLogin = async () => {
        if (!mail || !pass) {
            Alert.alert("Заповни пошту і пароль");
            return;
        }
        try {
            await login(mail, pass);
        } catch (err) {
            Alert.alert("Неправильна пошта або пароль");
        }
    };

    const doReset = async () => {
        if (!mail) {
            Alert.alert("Помилка", "Введіть email");
            return;
        }
        try {
            await resetPassword(mail);
            Alert.alert("Ок", "Лист надіслано");
        } catch (err) {
            Alert.alert("Помилка", "Такого юзера немає в базі");
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Вхід</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={mail}
                onChangeText={setMail}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Пароль"
                style={styles.input}
                value={pass}
                onChangeText={setPass}
                secureTextEntry
            />

            <View style={styles.btnBox}>
                <Button title="Увійти" color="black" onPress={doLogin} />
            </View>

            <TouchableOpacity onPress={doReset} style={styles.forgotBtn}>
                <Text style={styles.forgotTxt}>Забули пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")} style={styles.regLink}>
                <Text style={styles.regTxt}>Зареєструватися</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 35,
        color: "black",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    btnBox: {
        marginTop: 10,
    },
    forgotBtn: {
        marginTop: 15,
    },
    forgotTxt: {
        color: "#666",
        textAlign: "center",
        fontSize: 14,
    },
    regLink: {
        marginTop: 25,
    },
    regTxt: {
        color: "blue",
        textAlign: "center",
        fontWeight: "500",
    }
});