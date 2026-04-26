import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Упс!', headerShown: true }} />

            <View style={styles.container}>
                <Text style={styles.emoji}>🔍</Text>
                <Text style={styles.title}>Екран не знайдено</Text>
                <Text style={styles.message}>
                    На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
                </Text>

                <Link href="/" style={styles.link}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Повернутися на головну</Text>
                    </View>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
    },
});