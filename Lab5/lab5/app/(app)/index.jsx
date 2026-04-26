import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../constants/data';

export default function Catalog() {
    const { logout } = useAuth();

    return (
        <View style={styles.main}>
            <View style={styles.top}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Магазин</Text>
                <TouchableOpacity onPress={logout}>
                    <Text style={{ color: 'red' }}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={PRODUCTS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Link href={`/details/${item.id}`} asChild>
                        <TouchableOpacity style={styles.itemCard}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    itemCard: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
    },
    name: {
        fontSize: 18,
        color: 'black',
    },
    price: {
        color: 'blue',
        fontWeight: 'bold',
    },
});