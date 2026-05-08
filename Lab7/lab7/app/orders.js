import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrdersScreen() {
    const history = useSelector((state) => state.orders.history);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.date}>Дата: {item.date}</Text>
            {item.items.map(product => (
                <Text key={product.id}>- {product.name} (x{product.quantity})</Text>
            ))}
            <Text style={styles.total}>Сума: {item.total} грн</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Історія порожня</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    total: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
    }
});