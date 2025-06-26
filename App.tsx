import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  createTamagui,
  TamaguiProvider,
  Text,
  Theme,
  XStack,
  YStack,
} from 'tamagui';
import {defaultConfig} from '@tamagui/config/v4';
import MoodSection from './src/sections/MoodSection';
import SleepSection from './src/sections/SleepSection';
import NotesSection from './src/sections/NotesSection';
import SuggestionsSection from './src/sections/SuggestionsSection.tsx';
import {useSectionAnimations} from './src/hooks/useSectionAnimations';
import {useErrorPopupAnimation} from './src/hooks/useErrorPopupAnimation';
import {useTextAnimation} from './src/hooks/useTextAnimation';
import {useColorAnimation} from './src/hooks/useColorAnimation';
import {useFetchSuggestions} from './src/hooks/useFetchSuggestions';

const config = createTamagui(defaultConfig);

function App(): React.JSX.Element {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [sleepHours, setSleepHours] = useState(7);
  const [notes, setNotes] = useState('');
  const [moodError, setMoodError] = useState(false);

  const {
    suggestions,
    isLoading,
    showSuggestions,
    fetchSuggestions,
    setShowSuggestions,
  } = useFetchSuggestions();

  const {currentSection, navigateToSection, sectionStyles} =
    useSectionAnimations();
  const errorPopupStyle = useErrorPopupAnimation(moodError);
  const animatedTextStyle = useTextAnimation(sleepHours);
  const {colorState: sliderColorState, colorAnimated: sliderColorAnimated} =
    useColorAnimation(sleepHours);

  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <SafeAreaView style={{flex: 1}}>
          <YStack flex={1} position="relative">
            <YStack padding="$4" zIndex={10}>
              <Text fontSize="$6" fontWeight="bold">
                Interactive Health Insights
              </Text>
            </YStack>

            <MoodSection
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              moodError={moodError}
              setMoodError={setMoodError}
              moodSectionStyle={sectionStyles.moodSectionStyle}
              errorPopupStyle={errorPopupStyle}
            />

            <SleepSection
              sleepHours={sleepHours}
              setSleepHours={setSleepHours}
              sliderColorState={sliderColorState}
              sleepSectionStyle={sectionStyles.sleepSectionStyle}
              animatedTextStyle={animatedTextStyle}
            />

            <NotesSection
              notes={notes}
              setNotes={setNotes}
              notesSectionStyle={sectionStyles.notesSectionStyle}
            />

            {showSuggestions && (
              <SuggestionsSection
                suggestions={suggestions}
                isLoading={isLoading}
                onClose={() => setShowSuggestions(false)}
              />
            )}

            <YStack
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              padding="$4"
              zIndex={10}
              backgroundColor="white">
              <XStack justifyContent="space-between">
                <Button
                  size="$3"
                  theme="gray"
                  opacity={currentSection > 0 ? 1 : 0.3}
                  disabled={currentSection === 0}
                  onPress={() => navigateToSection(currentSection - 1)}>
                  Previous
                </Button>

                <XStack gap="$2" justifyContent="center" alignItems="center">
                  {[0, 1, 2].map(index => (
                    <Button
                      key={index}
                      size="$2"
                      circular
                      theme={currentSection === index ? 'blue' : 'gray'}
                      onPress={() => {
                        if (
                          currentSection === 0 &&
                          selectedMood === null &&
                          index !== 0
                        ) {
                          setMoodError(true);
                        } else {
                          setMoodError(false);
                          navigateToSection(index);
                        }
                      }}>
                      {index + 1}
                    </Button>
                  ))}
                </XStack>

                <Button
                  size="$3"
                  theme={'gray'}
                  opacity={1}
                  onPress={() => {
                    if (currentSection === 0 && selectedMood === null) {
                      setMoodError(true);
                    } else if (currentSection < 2) {
                      setMoodError(false);
                      navigateToSection(currentSection + 1);
                    } else {
                      fetchSuggestions(selectedMood, sleepHours, notes);
                    }
                  }}>
                  {currentSection === 2 ? 'Submit' : 'Next'}
                </Button>
              </XStack>
            </YStack>
          </YStack>
        </SafeAreaView>
      </Theme>
    </TamaguiProvider>
  );
}

export default App;
