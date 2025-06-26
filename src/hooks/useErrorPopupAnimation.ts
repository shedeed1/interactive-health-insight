import {useEffect} from 'react';
import {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';


export const useErrorPopupAnimation = (
  isVisible: boolean,
): ReturnType<typeof useAnimatedStyle> => {
  const errorPopupScale = useSharedValue(0.5);
  const errorPopupOpacity = useSharedValue(0);
  const errorPopupTranslateY = useSharedValue(20);

  useEffect(() => {
    if (isVisible) {
      errorPopupScale.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
      });
      errorPopupOpacity.value = withTiming(1, {duration: 300});
      errorPopupTranslateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      errorPopupScale.value = withTiming(0.5, {duration: 200});
      errorPopupOpacity.value = withTiming(0, {duration: 200});
      errorPopupTranslateY.value = withTiming(20, {duration: 200});
    }
  }, [isVisible]);

  const errorPopupStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: errorPopupScale.value},
        {translateY: errorPopupTranslateY.value},
      ],
      opacity: errorPopupOpacity.value,
      padding: 12,
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'red',
      marginTop: 8,
      alignSelf: 'center',
      elevation: 5,
    };
  });

  return errorPopupStyle;
};
