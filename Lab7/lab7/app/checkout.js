import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cart/cartSlice';
import { saveUser } from '../store/users/usersSlice';
import { addOrder } from '../store/orders/ordersSlice';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleOrder = () => {
        if (!name || !email || !phone || !address) {
            Alert.alert('Помилка', 'Заповніть всі поля');
            return;
        }

        const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            items: cartItems,
            total: totalSum
        };

        dispatch(saveUser({ name, email, phone, address }));
        dispatch(addOrder(newOrder));
        dispatch(clearCart());

        Alert.alert('Успіх', 'Замовлення оформлено!');
        router.replace('/orders');
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="ПІБ" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Телефон" value={phone} onChangeText={setPhone} />
            <TextInput style={styles.input} placeholder="Адреса" value={address} onChangeText={setAddress} />
            <Button title="Підтвердити" onPress={handleOrder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    }
});