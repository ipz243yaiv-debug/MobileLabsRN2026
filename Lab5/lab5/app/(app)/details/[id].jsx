import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PRODUCTS } from '../../../constants/data';

export default function Details() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const item = PRODUCTS.find(p => p.id === id);

    if (!item) return <Text>Завантаження...</Text>;

    return (
        <View style={styles.cont}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: 'blue', marginBottom: 20 }}>Назад</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.cat}>{item.category}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <Text style={styles.info}>
                Гарна модель, повністю відповідає опису. В наявності на складі.
            </Text>

            <TouchableOpacity style={styles.buy}>
                <Text style={{ color: 'white' }}>Купити</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: 25,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        color: 'blue',
        marginVertical: 10,
    },
    cat: {
        color: 'gray',
    },
    info: {
        marginTop: 20,
        lineHeight: 20,
    },
    buy: {
        backgroundColor: 'black',
        padding: 15,
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 5,
    },
});