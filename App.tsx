import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  createTamagui,
  Slider,
  TamaguiProvider,
  Text,
  TextArea,
  Theme,
  XStack,
  YStack,
} from 'tamagui';
import {defaultConfig} from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);

const moods = [
  {emoji: '😊', label: 'Happy'},
  {emoji: '😐', label: 'Neutral'},
  {emoji: '😔', label: 'Sad'},
  {emoji: '😡', label: 'Angry'},
  {emoji: '😴', label: 'Tired'},
];

function App(): React.JSX.Element {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [sleepHours, setSleepHours] = useState(7);
  const [notes, setNotes] = useState('');

  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <SafeAreaView style={{flex: 1}}>
          <YStack padding="$4" gap="$4" flex={1}>
            <Text fontSize="$6" fontWeight="bold">
              Interactive Health Insights
            </Text>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="bold">
                How are you feeling today?
              </Text>
              <XStack flexWrap="wrap" gap="$2">
                {moods.map((mood, index) => (
                  <Button
                    key={index}
                    size="$4"
                    fontSize="$6"
                    theme={selectedMood === index ? 'blue' : 'gray'}
                    onPress={() => setSelectedMood(index)}>
                    <Text fontSize={24}>{mood.emoji}</Text>
                  </Button>
                ))}
              </XStack>
              {selectedMood !== null && (
                <Text fontSize="$4">
                  You selected: {moods[selectedMood].label}
                </Text>
              )}
            </YStack>

            <YStack gap="$5">
              <Text fontSize="$5" fontWeight="bold">
                Hours of sleep last night
              </Text>
              <Text fontSize="$4">{sleepHours} hours</Text>
              <Slider
                size="$4"
                width="100%"
                defaultValue={[7]}
                min={1}
                max={12}
                step={1}
                onValueChange={values => setSleepHours(values[0])}>
                <Slider.Track>
                  <Slider.TrackActive />
                </Slider.Track>
                <Slider.Thumb circular index={0} />
              </Slider>
            </YStack>

            <YStack gap="$2" flex={1}>
              <Text fontSize="$5" fontWeight="bold" marginTop="$3">
                Notes
              </Text>
              <TextArea
                size="$4"
                placeholder="Enter any additional notes here..."
                value={notes}
                onChangeText={setNotes}
                autoCapitalize="none"
                flex={1}
              />
            </YStack>

            <Button
              size="$4"
              theme="active"
              onPress={() => {
                // TODO: Implement small backend to accept values and return a response
              }}>
              Save
            </Button>
          </YStack>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

export default App;
