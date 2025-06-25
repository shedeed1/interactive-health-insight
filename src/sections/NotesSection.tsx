import React from 'react';
import {Text, TextArea, YStack} from 'tamagui';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  notesSectionStyle: ReturnType<typeof useAnimatedStyle>;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  setNotes,
  notesSectionStyle,
}) => {
  return (
    <Animated.View style={notesSectionStyle}>
      <YStack
        gap="$4"
        flex={1}
        justifyContent="center"
        alignItems="center"
        marginTop="$2">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          Notes
        </Text>
        <TextArea
          size="$4"
          placeholder="Enter any additional notes here..."
          value={notes}
          onChangeText={setNotes}
          autoCapitalize="none"
          flex={1}
          marginBottom="$4"
          width="100%"
          minHeight={200}
          borderRadius="$2"
        />
      </YStack>
    </Animated.View>
  );
};

export default NotesSection;
