import React, { useState } from 'react';
import { Animated, PanResponder } from 'react-native';

export default function Card(props) {
  const [cardPan, setCardPan] = useState(new Animated.ValueXY());
  const [cardAnim, setCardAnim] = useState(new Animated.Value(0));

  const cardPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dx > 20) {
        props.onSwipe(props.index, 'right');
      } else if (gestureState.dx < -20) {
        props.onSwipe(props.index, 'left');
      }

      cardPan.setValue({ x: gestureState.dx, y: cardPan.y });
      setCardPan(cardPan);
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (event, gestureState) => {
      Animated.spring(cardPan.x, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCardAnim(new Animated.Value(0));
      });
    },
  });

  return (
    <Animated.View
      {...cardPanResponder.panHandlers}
      style={{
        margin: 10,
        cursor: 'grab',
        position: 'absolute',
        zIndex: props.zIndex,
        left: props.translateX + 95,
        transform: [
          {
            translateX: cardPan.x.interpolate({
              inputRange: [-100, 100],
              outputRange: [-25, 25],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: props.scale,
          },
          {
            rotate: props.rotate,
          },
        ],
      }}
    >
      {props.children}
    </Animated.View>
  );
}
