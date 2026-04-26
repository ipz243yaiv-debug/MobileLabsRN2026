import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useGame } from './Stats';

const SafeView = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.isDark ? 'black' : 'white'};`;

const ChallengeCard = styled.View`
    flex-direction: row;
    background-color: ${props => props.cardColor};
    margin: 10px;
    padding: 15px;
    border-radius: 10px;`;

export default function ChallengesScreen() {
    const game = useGame();

    const challengeList = [
        { id: '1', name: 'Натиснути 10 разів', current: game.taps, goal: 10, icon: '👆' },
        { id: '2', name: '5 подвійних кліків', current: game.doubleTaps, goal: 5, icon: '✌️' },
        { id: '3', name: 'Потягати об\'єкт', current: game.isDragged ? 1 : 0, goal: 1, icon: '🎯' },
        { id: '4', name: 'Зробити свайп', current: game.isSwiped ? 1 : 0, goal: 1, icon: '↔️' },
        { id: '5', name: 'Змінити розмір', current: game.isPinched ? 1 : 0, goal: 1, icon: '🔍' },
        { id: '6', name: 'Бонус: 100 очок', current: game.score, goal: 100, icon: '🏆' },
    ];

    return (
        <SafeView isDark={game.isDark}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 15, color: game.isDark ? 'white' : 'black' }}>
                Завдання:
            </Text>

            <FlatList
                data={challengeList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    let isDone = false;
                    if (item.current >= item.goal) {
                        isDone = true;
                    }

                    let cardColor;
                    if (isDone) {
                        cardColor = 'green';
                    } else if (game.isDark) {
                        cardColor = 'gray';
                    } else {
                        cardColor = 'lightgrey';
                    }

                    let textColor;
                    if (isDone) {
                        textColor = 'white';
                    } else if (game.isDark) {
                        textColor = 'white';
                    } else {
                        textColor = 'black';
                    }

                    let statusText;
                    if (isDone) {
                        statusText = 'OK';
                    } else {
                        statusText = item.current + '/' + item.goal;
                    }

                    let progressPercent = (item.current / item.goal) * 100;
                    if (progressPercent > 100) {
                        progressPercent = 100;
                    }

                    let barColor;
                    if (isDone) {
                        barColor = 'white';
                    } else {
                        barColor = 'blue';
                    }

                    return (
                        <ChallengeCard cardColor={cardColor}>
                            <Text style={{ fontSize: 30 }}>{item.icon}</Text>

                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={{ color: textColor, fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>

                                <View style={{ height: 10, backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                                    <View style={{
                                        height: '100%',
                                        width: progressPercent + '%',
                                        backgroundColor: barColor,
                                        borderRadius: 5
                                    }} />
                                </View>
                            </View>

                            <Text style={{ color: 'white', marginLeft: 10, alignSelf: 'center' }}>
                                {statusText}
                            </Text>
                        </ChallengeCard>
                    );
                }}
            />
        </SafeView>
    );
}