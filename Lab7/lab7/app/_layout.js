import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text, View, StyleSheet } from 'react-native';
import { store, persistor } from '../store/index';

const CustomLoader = () => (
    <View style={styles.loader}>
        <Text>Завантаження...</Text>
    </View>
);

export default function Layout() {
    return (
        <Provider store={store}>
            <PersistGate loading={<CustomLoader />} persistor={persistor}>
                <Stack />
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});