import React, { useState, Children } from 'react';
import { View } from 'react-native';
import Card from './Card';

export default function CardDeck(props) {
  const maxSideItems = props.itemsPerSide ? props.itemsPerSide : 3;
  const width = props.width ? props.width : 500;
  const height = props.height ? props.height : 435;

  const size = Children.count(props.children);

  const [currentIndex, setCurrentIndex] = useState(0);

  const setIndex = (index) => {
    let maxIndex = size - 1;
    if (index < 0) {
      setCurrentIndex(0);
    } else if (index > maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(index);
    }
  };

  const zIndex = (index) => {
    if (index + 0.5 < currentIndex) {
      return -(size - index);
    } else {
      return size - index;
    }
  };

  const scale = (index) => {
    return 1.0 - 0.1 * Math.abs(currentPosition(index));
  };

  const rotate = (index) => {
    return `${-currentPosition(index) * 2}deg`;
  };

  const currentPosition = (index) => {
    return currentIndex - index;
  };

  const translateX = (index) => {
    let topCardProgress = currentPosition(index);
    let padding = 35.0;
    let x = (index - currentIndex) * padding;
    if (topCardProgress > 0 && topCardProgress < 0.99 && index < size - 1) {
      return x * swingOutMultiplier(topCardProgress);
    }
    return x;
  };

  const swingOutMultiplier = (index) => {
    return Math.sin(Math.pi * index) * 15;
  };

  const onSwipe = (index, direction) => {
    if (direction === 'left') {
      if (index < size - 1) {
        setCurrentIndex(index + 1);
      }
    } else if (direction === 'right') {
      if (index > 0) {
        setCurrentIndex(index - 1);
      }
    }
  };

  const indexInRange = (index, start, end) => {
    return index >= Math.min(start, end) && index < Math.max(start, end);
  };

  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    >
      {Children.map(props.children, (element, index) => {
        return indexInRange(
          index,
          currentIndex - maxSideItems + 1,
          currentIndex + maxSideItems + 1
        ) ? (
          <Card
            key={index}
            index={index}
            zIndex={zIndex(index)}
            scale={scale(index)}
            rotate={rotate(index)}
            translateX={translateX(index)}
            setIndex={setIndex}
            onSwipe={onSwipe}
          >
            {element}
          </Card>
        ) : null;
      })}
    </View>
  );
}
