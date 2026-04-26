import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const { login } = useAuth();

    return (
        <View style={styles.box}>
            <Text style={styles.head}>Вхід</Text>

            <TextInput
                style={styles.pole}
                placeholder="Email"
                value={mail}
                onChangeText={setMail}
            />

            <TextInput
                style={styles.pole}
                placeholder="Пароль"
                secureTextEntry
                value={pass}
                onChangeText={setPass}
            />

            <TouchableOpacity style={styles.btn} onPress={() => login(mail, pass)}>
                <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>

            <Link href="/register" style={{ marginTop: 15 }}>
                <Text style={{ color: 'blue' }}>Створити акаунт</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    head: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        marginBottom: 20,
    },
    btn: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    pole: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});