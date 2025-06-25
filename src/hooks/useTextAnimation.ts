import {useEffect} from 'react';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';


export const useTextAnimation = <T>(
  value: T,
): ReturnType<typeof useAnimatedStyle> => {
  const textScale = useSharedValue(1);
  const textOpacity = useSharedValue(1);

  useEffect(() => {
    textScale.value = withTiming(1.2, {duration: 200}, () => {
      textScale.value = withTiming(1, {duration: 200});
    });

    textOpacity.value = withTiming(0.7, {duration: 150}, () => {
      textOpacity.value = withTiming(1, {duration: 150});
    });
  }, [value]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: textScale.value}],
      opacity: textOpacity.value,
    };
  });

  return animatedTextStyle;
};
