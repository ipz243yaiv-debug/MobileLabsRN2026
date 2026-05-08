import { View, Text, Image, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/cartSlice';
import { Stack, useRouter } from 'expo-router'; // Додали імпорти

export default function CatalogScreen() {
    const products = useSelector((state) => state.products.items);
    const cartItems = useSelector((state) => state.cart.items); // Отримуємо кошик
    const dispatch = useDispatch();
    const router = useRouter();

    // Рахуємо загальну кількість товарів
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>{item.price} грн</Text>
            <Button
                title="Додати до кошика"
                onPress={() => dispatch(addToCart(item))}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Налаштовуємо заголовок сторінки і додаємо кнопку кошика */}
            <Stack.Screen
                options={{
                    title: 'Каталог',
                    headerRight: () => (
                        <Button
                            title={`Кошик (${cartCount})`}
                            onPress={() => router.push('/cart')}
                        />
                    ),
                }}
            />

            <FlatList
                data={products}
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
        marginBottom: 15,
    },
    img: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginBottom: 10,
    }
});