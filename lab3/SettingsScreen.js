import React from 'react';
import { View, Text, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useGame } from './Stats';

const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: ${props => props.isDark ? 'black' : 'white'};`;

export default function SettingsScreen() {
    const { isDark, setIsDark } = useGame();

    return (
        <Container isDark={isDark}>
            <Text style={{ fontSize: 24, color: isDark ? 'white' : 'black', marginBottom: 20 }}>
                Налаштування
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
                backgroundColor: isDark ? 'gray' : 'lightgrey',
                borderRadius: 10
            }}>
                <Text style={{ color: isDark ? 'white' : 'black' }}>Темна тема</Text>
                <Switch
                    value={isDark}
                    onValueChange={(value) => setIsDark(value)}
                />
            </View>
        </Container>
    );
}