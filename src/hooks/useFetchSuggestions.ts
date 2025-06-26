import {useState} from 'react';
import {Platform} from 'react-native';


export const useFetchSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (
    selectedMood: number | null,
    sleepHours: number,
    notes: string,
  ) => {
    setIsLoading(true);
    try {
      const backendUrl =
        Platform.OS === 'android'
          ? 'http://10.0.2.2:3000/api/insights'
          : 'http://localhost:3000/api/insights';

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: selectedMood,
          sleepHours,
          notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuggestions(data.suggestions);
        setShowSuggestions(true);
      } else {
        console.error('Failed to get suggestions:', data.error);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestions,
    isLoading,
    showSuggestions,
    fetchSuggestions,
    setShowSuggestions,
  };
};
