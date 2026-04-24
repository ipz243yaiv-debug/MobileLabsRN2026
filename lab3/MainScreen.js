import React, { useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import { useGame } from './Stats';
import {
    TapGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    State,
    Directions
} from 'react-native-gesture-handler';

const MainContainer = styled.View`
    flex: 1;
    background-color: ${props => props.isDark === true ? 'black' : 'white'};
    align-items: center;
    justify-content: center;`;

const ClickerObject = styled.View`
    width: 200px;
    height: 200px;
    background-color: blue;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    border-width: 4px;
    border-color: lightblue;`;

export default function GameScreen() {
    const game = useGame();

    const translationX = useRef(new Animated.Value(0)).current;
    const translationY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const doubleTapRef = useRef(null);

    function handleTap(event) {
        if (event.nativeEvent.state === State.ACTIVE) {
            game.setScore(game.score + 1);
            game.setTaps(game.taps + 1);
        }
    }

    function handleDoubleTap(event) {
        if (event.nativeEvent.state === State.ACTIVE) {
            game.setScore(game.score + 2);
            game.setDoubleTaps(game.doubleTaps + 1);
        }
    }

    function handleFling(event) {
        if (event.nativeEvent.state === State.ACTIVE) {
            game.setScore(game.score + 10);
            game.setIsSwiped(true);
        }
    }

    const handlePan = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translationX,
                    translationY: translationY,
                },
            },
        ],
        {
            useNativeDriver: true,
            onHandlerStateChange: (event) => {
                if (event.nativeEvent.state === State.ACTIVE) {
                    game.setIsDragged(true);
                }
            }
        }
    );

    const handlePinch = Animated.event(
        [{ nativeEvent: { scale: scale } }],
        {
            useNativeDriver: true,
            onHandlerStateChange: (event) => {
                if (event.nativeEvent.state === State.ACTIVE) {
                    game.setIsPinched(true);
                }
            }
        }
    );

    return (
        <MainContainer isDark={game.isDark}>
            <View style={{ marginBottom: 20, padding: 10, backgroundColor: 'lightgrey', borderRadius: 10 }}>
                <Text style={{ fontSize: 30, color: 'black' }}>
                    Очки: {game.score}
                </Text>
            </View>

            <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={(e) => {if(e.nativeEvent.state === State.ACTIVE) game.setIsDragged(true)}}>
                <Animated.View style={{ transform: [{ translateX: translationX }, { translateY: translationY }, { scale: scale }] }}>

                    <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={(e) => {if(e.nativeEvent.state === State.ACTIVE) game.setIsPinched(true)}}>
                        <Animated.View>
                            <FlingGestureHandler direction={Directions.RIGHT | Directions.LEFT} onHandlerStateChange={handleFling}>
                                <Animated.View>
                                    <TapGestureHandler
                                        onHandlerStateChange={handleDoubleTap}
                                        numberOfTaps={2}
                                        ref={doubleTapRef}
                                    >
                                        <Animated.View>
                                            <TapGestureHandler
                                                onHandlerStateChange={handleTap}
                                                waitFor={doubleTapRef}
                                            >
                                                <ClickerObject>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>НАТИСНИ</Text>
                                                </ClickerObject>
                                            </TapGestureHandler>

                                        </Animated.View>
                                    </TapGestureHandler>

                                </Animated.View>
                            </FlingGestureHandler>

                        </Animated.View>
                    </PinchGestureHandler>

                </Animated.View>
            </PanGestureHandler>
        </MainContainer>
    );
}