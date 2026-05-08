import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../store/cart/cartSlice';
import { useRouter } from 'expo-router';

export default function CartScreen() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const router = useRouter();

    const totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Ціна: {item.price} грн</Text>
            <Text>Кількість: {item.quantity}</Text>
            <Text>Сума: {item.price * item.quantity} грн</Text>

            <View style={styles.buttons}>
                <Button title="-" onPress={() => dispatch(changeQuantity({ id: item.id, amount: -1 }))} />
                <Button title="+" onPress={() => dispatch(changeQuantity({ id: item.id, amount: 1 }))} />
                <Button title="Видалити" color="red" onPress={() => dispatch(removeFromCart(item.id))} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Кнопка та сума тепер зверху */}
            <Button
                title="Оформити замовлення"
                disabled={items.length === 0}
                onPress={() => router.push('/checkout')}
            />
            <Text style={styles.total}>Загальна сума: {totalSum} грн</Text>

            {/* Список товарів під ними */}
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
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
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    }
});