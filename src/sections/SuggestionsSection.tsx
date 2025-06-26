import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {Button, Card, Text, YStack} from 'tamagui';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCard = Animated.createAnimatedComponent(Card);

interface SuggestionsSectionProps {
  suggestions: string[];
  isLoading: boolean;
  onClose: () => void;
}

const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({
  suggestions,
  isLoading,
  onClose,
}) => {
  return (
    <YStack
      padding="$4"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="white"
      zIndex={20}>
      <YStack padding="$4" gap="$4" flex={1}>
        <Text fontSize="$6" fontWeight="bold">
          Your Personalized Suggestions
        </Text>

        {isLoading ? (
          <YStack flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text marginTop="$4">Analyzing your health data...</Text>
          </YStack>
        ) : (
          <ScrollView style={{flex: 1}}>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                suggestion={suggestion}
                index={index}
              />
            ))}
          </ScrollView>
        )}

        <Button theme="blue" onPress={onClose}>
          Back to Input
        </Button>
      </YStack>
    </YStack>
  );
};

interface SuggestionItemProps {
  suggestion: string;
  index: number;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({suggestion, index}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    const delay = index * 150;

    opacity.value = withDelay(
      delay,
      withTiming(1, {duration: 500, easing: Easing.out(Easing.cubic)}),
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {duration: 500, easing: Easing.out(Easing.cubic)}),
    );

    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1.05, {duration: 300, easing: Easing.out(Easing.cubic)}),
        withTiming(1, {duration: 200, easing: Easing.inOut(Easing.cubic)}),
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  return (
    <AnimatedCard style={animatedStyle} marginBottom="$3" padding="$3">
      <Text>{suggestion}</Text>
    </AnimatedCard>
  );
};

export default SuggestionsSection;
