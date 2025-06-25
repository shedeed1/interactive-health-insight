import React from 'react';
import Slider from '@react-native-community/slider';

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  minimumTrackTintColor = '#007AFF',
  maximumTrackTintColor = '#d3d3d3',
  thumbTintColor = '#007AFF',
  style = {
    width: '100%',
    maxWidth: 400,
    height: 40,
  },
}) => {
  return (
    <Slider
      style={style}
      value={value}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={thumbTintColor}
      onValueChange={onValueChange}
    />
  );
};

export default CustomSlider;
