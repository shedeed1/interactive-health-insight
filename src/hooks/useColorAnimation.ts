import {useEffect, useState} from 'react';
import {interpolateColor, useSharedValue, withTiming} from 'react-native-reanimated';


export const useColorAnimation = (
  sleepHours: number,
): {
  colorState: string;
  colorAnimated: ReturnType<typeof useSharedValue<string>>;
} => {
  const colorAnimated = useSharedValue('rgb(0, 122, 255)');

  const [colorState, setColorState] = useState('rgb(0, 122, 255)');

  useEffect(() => {
    let newColor;
    if (sleepHours < 5) {
      newColor = interpolateColor(
        sleepHours,
        [1, 4],
        ['rgb(255, 59, 48)', 'rgb(255, 149, 0)'],
      );
    } else if (sleepHours < 9) {
      newColor = interpolateColor(
        sleepHours,
        [5, 8],
        ['rgb(255, 149, 0)', 'rgb(52, 199, 89)'],
      );
    } else {
      newColor = interpolateColor(
        sleepHours,
        [9, 12],
        ['rgb(52, 199, 89)', 'rgb(0, 122, 255)'],
      );
    }

    setColorState(newColor);

    colorAnimated.value = withTiming(newColor, {duration: 300});
  }, [sleepHours]);

  return {
    colorState,
    colorAnimated,
  };
};
