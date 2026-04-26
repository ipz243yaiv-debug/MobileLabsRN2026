import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { GameProvider, useGame } from './Stats';

import GameScreen from './MainScreen';
import ChallengesScreen from './ChallengesScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

function MenuNavigator() {
    const game = useGame();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Гра') iconName = 'game-controller';
                        else if (route.name === 'Завдання') iconName = 'list';
                        else iconName = 'settings';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: { backgroundColor: game.isDark ? 'black' : 'white' },
                    headerStyle: { backgroundColor: game.isDark ? 'black' : 'white' },
                    headerTintColor: game.isDark ? 'white' : 'black',
                })}>
                <Tab.Screen name="Гра" component={GameScreen} />
                <Tab.Screen name="Завдання" component={ChallengesScreen} />
                <Tab.Screen name="Налаштування" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GameProvider>
                <MenuNavigator />
            </GameProvider>
        </GestureHandlerRootView>
    );
}