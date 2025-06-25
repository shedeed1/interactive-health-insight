import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface SectionAnimationStyles {
  moodSectionStyle: ReturnType<typeof useAnimatedStyle>;
  sleepSectionStyle: ReturnType<typeof useAnimatedStyle>;
  notesSectionStyle: ReturnType<typeof useAnimatedStyle>;
}


export const useSectionAnimations = (): {
  currentSection: number;
  navigateToSection: (sectionIndex: number) => void;
  sectionStyles: SectionAnimationStyles;
} => {
  const [currentSection, setCurrentSection] = useState(0);

  const screenWidth = Dimensions.get('window').width;

  const moodSectionX = useSharedValue(0);
  const moodSectionOpacity = useSharedValue(1);

  const sleepSectionX = useSharedValue(screenWidth);
  const sleepSectionOpacity = useSharedValue(0);

  const notesSectionX = useSharedValue(screenWidth);
  const notesSectionOpacity = useSharedValue(0);

  const navigateToSection = (sectionIndex: number) => {
    if (sectionIndex === currentSection) return;

    const duration = 500;
    const easing = Easing.bezier(0.25, 1, 0.5, 1);

    const isForward = sectionIndex > currentSection;

    if (currentSection === 0) {
      moodSectionX.value = withTiming(isForward ? -screenWidth : screenWidth, {
        duration,
        easing,
      });
      moodSectionOpacity.value = withTiming(0, {duration});
    } else if (currentSection === 1) {
      sleepSectionX.value = withTiming(isForward ? -screenWidth : screenWidth, {
        duration,
        easing,
      });
      sleepSectionOpacity.value = withTiming(0, {duration});
    } else if (currentSection === 2) {
      notesSectionX.value = withTiming(isForward ? -screenWidth : screenWidth, {
        duration,
        easing,
      });
      notesSectionOpacity.value = withTiming(0, {duration});
    }

    if (sectionIndex === 0) {
      moodSectionX.value = isForward ? screenWidth : -screenWidth;

      moodSectionX.value = withTiming(0, {duration, easing});
      moodSectionOpacity.value = withTiming(1, {duration});
    } else if (sectionIndex === 1) {
      sleepSectionX.value = isForward ? screenWidth : -screenWidth;

      sleepSectionX.value = withTiming(0, {duration, easing});
      sleepSectionOpacity.value = withTiming(1, {duration});
    } else if (sectionIndex === 2) {
      notesSectionX.value = isForward ? screenWidth : -screenWidth;

      notesSectionX.value = withTiming(0, {duration, easing});
      notesSectionOpacity.value = withTiming(1, {duration});
    }

    setCurrentSection(sectionIndex);
  };

  useEffect(() => {
    moodSectionX.value = 0;
    moodSectionOpacity.value = 1;

    sleepSectionX.value = screenWidth;
    sleepSectionOpacity.value = 0;

    notesSectionX.value = screenWidth;
    notesSectionOpacity.value = 0;
  }, []);

  const moodSectionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: moodSectionX.value}],
      opacity: moodSectionOpacity.value,
      position: 'absolute',
      width: '85%',
      height: '80%',
      zIndex: currentSection === 0 ? 3 : 0,
      left: '7.5%',
      right: '7.5%',
      top: '10%',
    };
  });

  const sleepSectionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: sleepSectionX.value}],
      opacity: sleepSectionOpacity.value,
      position: 'absolute',
      width: '85%',
      height: '80%',
      zIndex: currentSection === 1 ? 3 : 0,
      left: '7.5%',
      right: '7.5%',
      top: '10%',
    };
  });

  const notesSectionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: notesSectionX.value}],
      opacity: notesSectionOpacity.value,
      position: 'absolute',
      width: '85%',
      height: '80%',
      zIndex: currentSection === 2 ? 3 : 0,
      left: '7.5%',
      right: '7.5%',
      top: '10%',
    };
  });

  return {
    currentSection,
    navigateToSection,
    sectionStyles: {
      moodSectionStyle,
      sleepSectionStyle,
      notesSectionStyle,
    },
  };
};
