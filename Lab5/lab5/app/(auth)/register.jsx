import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [uName, setUName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');

    const { register } = useAuth();

    const onReg = () => {
        if (pass !== pass2) {
            alert("Паролі не співпадають!");
            return;
        }
        register(mail, pass, uName);
    };

    return (
        <View style={styles.box}>
            <Text style={styles.title}>Новий акаунт</Text>

            <TextInput
                style={styles.pole}
                placeholder="Ім'я"
                value={uName}
                onChangeText={setUName}
            />

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

            <TextInput
                style={styles.pole}
                placeholder="Ще раз пароль"
                secureTextEntry
                value={pass2}
                onChangeText={setPass2}
            />

            <TouchableOpacity style={styles.btn} onPress={onReg}>
                <Text style={styles.btnText}>Створити</Text>
            </TouchableOpacity>

            <Link href="/login" style={{ marginTop: 15, alignSelf: 'center' }}>
                <Text style={{ color: 'blue' }}>Вже є акаунт? Вхід</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    pole: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
    },
    btn: {
        backgroundColor: 'black',
        padding: 15,
        alignItems: 'center',
        marginTop: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: '600',
    },
});