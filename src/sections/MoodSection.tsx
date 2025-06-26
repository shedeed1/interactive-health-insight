import React from 'react';
import {Button, Text, XStack, YStack} from 'tamagui';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import AnimatedEmoji from '../components/AnimatedEmoji';

interface MoodSectionProps {
  selectedMood: number | null;
  setSelectedMood: (index: number) => void;
  moodError: boolean;
  setMoodError: (error: boolean) => void;
  moodSectionStyle: ReturnType<typeof useAnimatedStyle>;
  errorPopupStyle: ReturnType<typeof useAnimatedStyle>;
}

const moods = [
  {emoji: '😊', label: 'Happy'},
  {emoji: '😐', label: 'Neutral'},
  {emoji: '😔', label: 'Sad'},
  {emoji: '😡', label: 'Angry'},
  {emoji: '😴', label: 'Tired'},
];

const MoodSection: React.FC<MoodSectionProps> = ({
  selectedMood,
  setSelectedMood,
  moodError,
  setMoodError,
  moodSectionStyle,
  errorPopupStyle,
}) => {
  return (
    <Animated.View style={moodSectionStyle}>
      <YStack
        gap="$4"
        flex={1}
        justifyContent="center"
        alignItems="center"
        marginTop="$2">
        <Text fontSize="$8" fontWeight="bold" textAlign="center">
          How are you feeling today?
        </Text>
        <XStack
          flexWrap="wrap"
          gap="$3"
          width="100%"
          maxWidth={400}
          justifyContent="center">
          {moods.map((mood, index) => (
            <Button
              key={index}
              size="$6"
              fontSize="$6"
              theme={selectedMood === index ? 'blue' : 'gray'}
              onPress={() => {
                setSelectedMood(index);
                setMoodError(false);
              }}>
              <AnimatedEmoji
                emoji={mood.emoji}
                mood={mood.label}
                isSelected={selectedMood === index}
              />
            </Button>
          ))}
        </XStack>
        {selectedMood !== null ? (
          <Text fontSize="$4">You selected: {moods[selectedMood].label}</Text>
        ) : null}

        {moodError && (
          <Animated.View style={errorPopupStyle}>
            <Text
              fontSize="$4"
              color="red"
              fontWeight="bold"
              textAlign="center">
              Please select how you're feeling today to continue
            </Text>
          </Animated.View>
        )}
      </YStack>
    </Animated.View>
  );
};

export default MoodSection;
