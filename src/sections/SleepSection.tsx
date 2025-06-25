import React from 'react';
import {Text, XStack, YStack} from 'tamagui';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import CustomSlider from '../components/CustomSlider';

interface SleepSectionProps {
  sleepHours: number;
  setSleepHours: (hours: number) => void;
  sliderColorState: string;
  sleepSectionStyle: ReturnType<typeof useAnimatedStyle>;
  animatedTextStyle: ReturnType<typeof useAnimatedStyle>;
}

const SleepSection: React.FC<SleepSectionProps> = ({
  sleepHours,
  setSleepHours,
  sliderColorState,
  sleepSectionStyle,
  animatedTextStyle,
}) => {
  return (
    <Animated.View style={sleepSectionStyle}>
      <YStack
        gap="$4"
        flex={1}
        justifyContent="center"
        alignItems="center"
        marginTop="$2">
        <Text fontSize="$8" fontWeight="bold" textAlign="center">
          Hours of sleep last night
        </Text>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          maxWidth={400}>
          <Animated.View style={animatedTextStyle}>
            <Text fontSize="$4" fontWeight="bold" color={sliderColorState}>
              {sleepHours} hours
            </Text>
          </Animated.View>
          <Text fontSize="$3" color={sliderColorState}>
            {sleepHours < 5
              ? 'Not enough sleep'
              : sleepHours < 9
              ? 'Good sleep range'
              : 'Too much sleep'}
          </Text>
        </XStack>
        <CustomSlider
          style={{
            width: '100%',
            maxWidth: 400,
            height: 40,
          }}
          value={sleepHours}
          minimumValue={1}
          maximumValue={12}
          step={1}
          minimumTrackTintColor={sliderColorState}
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={sliderColorState}
          onValueChange={value => setSleepHours(value)}
        />
      </YStack>
    </Animated.View>
  );
};

export default SleepSection;
