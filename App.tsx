import React from 'react';
import {View} from 'react-native';
import {createTamagui, TamaguiProvider} from '@tamagui/core';
import {defaultConfig} from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);

function App(): React.JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <View></View>
    </TamaguiProvider>
  );
}

export default App;
