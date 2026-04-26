import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/login" /> ;
    }

    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black'
        }}>
            <Stack.Screen
                name="index"
                options={{ title: 'Каталог товарів' }}
            />
            <Stack.Screen
                name="details/[id]"
                options={{ title: 'Деталі товару' }}
            />
            <Stack.Screen
                name="settings"
                options={{ title: 'Налаштування' }}
            />
        </Stack>
    );
}