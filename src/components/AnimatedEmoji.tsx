import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'tamagui';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedEmojiProps {
  emoji: string;
  mood: string;
  isSelected: boolean;
}

const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({
  emoji,
  mood,
  isSelected,
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue('0deg');
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const backgroundColor = useSharedValue('transparent');
  const rotateX = useSharedValue('0deg');
  const rotateY = useSharedValue('0deg');
  const skewX = useSharedValue('0deg');
  const skewY = useSharedValue('0deg');

  const shadowOpacity = useSharedValue(0);
  const shadowRadius = useSharedValue(0);
  const shadowOffsetY = useSharedValue(0);
  const shadowColor = useSharedValue('rgba(0, 0, 0, 0.2)');

  const resetAnimations = () => {
    scale.value = withSpring(1);
    translateY.value = withSpring(0);
    translateX.value = withSpring(0);
    [rotate, rotateX, rotateY, skewX, skewY].forEach(
      val => (val.value = withSpring('0deg')),
    );

    opacity.value = withSpring(1);
    backgroundColor.value = withTiming('transparent');

    shadowOpacity.value = withSpring(0);
    shadowRadius.value = withSpring(0);
    shadowOffsetY.value = withSpring(0);
    shadowColor.value = withTiming('rgba(0, 0, 0, 0.2)');
  };

  useEffect(() => {
    const animatedValues = [
      scale,
      translateY,
      rotate,
      translateX,
      opacity,
      backgroundColor,
      rotateX,
      rotateY,
      skewX,
      skewY,
      shadowOpacity,
      shadowRadius,
      shadowOffsetY,
      shadowColor,
    ];

    animatedValues.forEach(cancelAnimation);

    if (isSelected) {
      switch (mood.toLowerCase()) {
        case 'happy':
          backgroundColor.value = withTiming('rgba(255, 255, 150, 0.3)', {
            duration: 300,
          });

          scale.value = withSequence(
            withTiming(1.3, {duration: 200, easing: Easing.out(Easing.back())}),
            withTiming(1.2, {duration: 150}),
          );

          translateY.value = withRepeat(
            withSequence(
              withTiming(-15, {duration: 250, easing: Easing.out(Easing.quad)}),
              withTiming(0, {duration: 300, easing: Easing.bounce}),
            ),
            -1,
            true,
          );
          rotate.value = withRepeat(
            withSequence(
              withTiming('10deg', {duration: 400}),
              withTiming('-10deg', {duration: 400}),
            ),
            -1,
            true,
          );

          opacity.value = withRepeat(
            withSequence(
              withTiming(1.2, {duration: 500}),
              withTiming(1, {duration: 500}),
            ),
            -1,
            true,
          );

          shadowColor.value = withTiming('rgba(255, 200, 0, 0.6)', {
            duration: 300,
          });
          shadowOpacity.value = withRepeat(
            withSequence(
              withTiming(0.8, {duration: 500}),
              withTiming(0.4, {duration: 500}),
            ),
            -1,
            true,
          );

          shadowRadius.value = withTiming(10, {duration: 300});
          shadowOffsetY.value = withRepeat(
            withSequence(
              withTiming(8, {duration: 250, easing: Easing.out(Easing.quad)}),
              withTiming(2, {duration: 300, easing: Easing.bounce}),
            ),
            -1,
            true,
          );
          break;

        case 'neutral':
          backgroundColor.value = withTiming('rgba(200, 200, 200, 0.2)', {
            duration: 300,
          });

          const sineEasing = Easing.inOut(Easing.sin);

          scale.value = withRepeat(
            withSequence(
              withTiming(1.05, {duration: 1000, easing: sineEasing}),
              withTiming(0.95, {duration: 1000, easing: sineEasing}),
            ),
            -1,
            true,
          );

          rotateX.value = withRepeat(
            withTiming('5deg', {duration: 2000, easing: sineEasing}),
            -1,
            true,
          );

          rotateY.value = withRepeat(
            withSequence(
              withTiming('5deg', {duration: 1000, easing: sineEasing}),
              withTiming('-5deg', {duration: 1000, easing: sineEasing}),
            ),
            -1,
            true,
          );

          translateX.value = withRepeat(
            withSequence(
              withTiming(3, {duration: 1500, easing: sineEasing}),
              withTiming(-3, {duration: 1500, easing: sineEasing}),
            ),
            -1,
            true,
          );

          shadowColor.value = withTiming('rgba(100, 100, 100, 0.5)', {
            duration: 300,
          });
          shadowOpacity.value = withTiming(0.3, {duration: 300});

          shadowRadius.value = withRepeat(
            withSequence(
              withTiming(4, {duration: 1500, easing: sineEasing}),
              withTiming(6, {duration: 1500, easing: sineEasing}),
            ),
            -1,
            true,
          );

          shadowOffsetY.value = withRepeat(
            withSequence(
              withTiming(3, {duration: 1500, easing: sineEasing}),
              withTiming(5, {duration: 1500, easing: sineEasing}),
            ),
            -1,
            true,
          );
          break;

        case 'sad':
          backgroundColor.value = withTiming('rgba(100, 150, 255, 0.2)', {
            duration: 500,
          });

          translateY.value = withSequence(
            withTiming(5, {duration: 300}),
            withTiming(15, {duration: 1000, easing: Easing.out(Easing.cubic)}),
          );

          scale.value = withTiming(0.85, {
            duration: 800,
            easing: Easing.out(Easing.quad),
          });

          rotate.value = withTiming('-8deg', {duration: 800});
          skewX.value = withTiming('5deg', {duration: 800});

          translateX.value = withRepeat(
            withSequence(
              withTiming(-3, {
                duration: 2000,
                easing: Easing.inOut(Easing.sin),
              }),
              withTiming(3, {
                duration: 2000,
                easing: Easing.inOut(Easing.sin),
              }),
            ),
            -1,
            true,
          );

          opacity.value = withRepeat(
            withSequence(
              withTiming(0.85, {duration: 1000}),
              withTiming(1, {duration: 1000}),
            ),
            -1,
            true,
          );

          shadowColor.value = withTiming('rgba(70, 130, 180, 0.6)', {
            duration: 500,
          });
          shadowRadius.value = withTiming(8, {duration: 800});

          shadowOpacity.value = withRepeat(
            withSequence(
              withTiming(0.7, {duration: 1000}),
              withTiming(0.5, {duration: 1000}),
            ),
            -1,
            true,
          );

          shadowOffsetY.value = withSequence(
            withTiming(5, {duration: 300}),
            withTiming(12, {duration: 1000, easing: Easing.out(Easing.cubic)}),
          );
          break;

        case 'angry':
          const quadEasing = Easing.out(Easing.quad);

          backgroundColor.value = withRepeat(
            withSequence(
              withTiming('rgba(255, 100, 100, 0.4)', {duration: 300}),
              withTiming('rgba(255, 50, 50, 0.2)', {duration: 300}),
            ),
            -1,
            true,
          );

          translateX.value = withRepeat(
            withSequence(
              withTiming(-8, {duration: 80, easing: quadEasing}),
              withTiming(8, {duration: 80, easing: quadEasing}),
              withTiming(-4, {duration: 80, easing: quadEasing}),
              withTiming(4, {duration: 80, easing: quadEasing}),
              withTiming(0, {duration: 80, easing: quadEasing}),
            ),
            -1,
            false,
          );

          scale.value = withRepeat(
            withSequence(
              withTiming(1.3, {
                duration: 200,
                easing: Easing.out(Easing.back()),
              }),
              withTiming(1.1, {duration: 200}),
            ),
            -1,
            true,
          );

          translateY.value = withSequence(
            withTiming(-5, {duration: 300}),
            withRepeat(
              withSequence(
                withTiming(-8, {duration: 400}),
                withTiming(-5, {duration: 400}),
              ),
              -1,
              true,
            ),
          );

          skewX.value = withRepeat(
            withSequence(
              withTiming('5deg', {duration: 200}),
              withTiming('-5deg', {duration: 200}),
            ),
            -1,
            true,
          );

          shadowColor.value = withRepeat(
            withSequence(
              withTiming('rgba(255, 0, 0, 0.7)', {duration: 200}),
              withTiming('rgba(200, 0, 0, 0.5)', {duration: 200}),
            ),
            -1,
            true,
          );

          shadowOpacity.value = withRepeat(
            withSequence(
              withTiming(0.8, {duration: 200}),
              withTiming(0.6, {duration: 200}),
            ),
            -1,
            true,
          );

          shadowRadius.value = withRepeat(
            withSequence(
              withTiming(6, {duration: 200}),
              withTiming(3, {duration: 200}),
            ),
            -1,
            true,
          );

          shadowOffsetY.value = withSequence(
            withTiming(3, {duration: 300}),
            withRepeat(
              withSequence(
                withTiming(5, {duration: 400}),
                withTiming(3, {duration: 400}),
              ),
              -1,
              true,
            ),
          );
          break;

        case 'tired':
          const quadOut = Easing.out(Easing.quad);
          const backOut = Easing.out(Easing.back());
          const sineInOut = Easing.inOut(Easing.sin);

          backgroundColor.value = withTiming('rgba(100, 100, 150, 0.2)', {
            duration: 500,
          });

          const noddingSequence = withSequence(
            withTiming('-15deg', {duration: 1500, easing: quadOut}),
            withTiming('0deg', {duration: 300, easing: backOut}),
            withTiming('0deg', {duration: 1000}),
          );

          rotate.value = withRepeat(noddingSequence, -1, false);

          translateY.value = withRepeat(
            withSequence(
              withTiming(10, {duration: 1500, easing: quadOut}),
              withTiming(0, {duration: 300, easing: backOut}),
              withTiming(0, {duration: 1000}),
            ),
            -1,
            false,
          );

          scale.value = withRepeat(
            withSequence(
              withTiming(0.9, {duration: 1500, easing: sineInOut}),
              withTiming(1, {duration: 1500, easing: sineInOut}),
            ),
            -1,
            true,
          );

          opacity.value = withRepeat(
            withSequence(
              withTiming(0.7, {duration: 2000}),
              withTiming(1, {duration: 1000}),
            ),
            -1,
            true,
          );

          shadowColor.value = withTiming('rgba(50, 50, 100, 0.5)', {
            duration: 500,
          });
          shadowRadius.value = withTiming(10, {duration: 500});

          shadowOpacity.value = withRepeat(
            withSequence(
              withTiming(0.2, {duration: 1500, easing: quadOut}),
              withTiming(0.4, {duration: 300, easing: backOut}),
              withTiming(0.4, {duration: 1000}),
            ),
            -1,
            false,
          );

          shadowOffsetY.value = withRepeat(
            withSequence(
              withTiming(8, {duration: 1500, easing: quadOut}),
              withTiming(4, {duration: 300, easing: backOut}),
              withTiming(4, {duration: 1000}),
            ),
            -1,
            false,
          );
          break;

        default:
          resetAnimations();
      }
    } else {
      resetAnimations();
    }

    return () => {
      animatedValues.forEach(cancelAnimation);
    };
  }, [isSelected, mood]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateY: translateY.value},
      {rotate: rotate.value},
      {translateX: translateX.value},
      {rotateX: rotateX.value},
      {rotateY: rotateY.value},
      {skewX: skewX.value},
      {skewY: skewY.value},
    ],
    opacity: opacity.value,
    backgroundColor: backgroundColor.value,
    shadowColor: shadowColor.value,
    shadowOffset: {width: 0, height: shadowOffsetY.value},
    shadowOpacity: shadowOpacity.value,
    shadowRadius: shadowRadius.value,
    elevation: shadowRadius.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text fontSize={32}>{emoji}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 30,
    overflow: 'hidden',
    width: 60,
    height: 60,
    aspectRatio: 1,
  },
});

export default AnimatedEmoji;
