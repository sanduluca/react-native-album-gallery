// In App.js in a new project

import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import { Stack } from './src/navigation'
import HomeScreen from './src/screens/Home'
import AlbumScreen from './src/screens/AlbumPhotos'



function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Gallery" component={HomeScreen} options={{ headerTitle: 'Albums' }} />
            <Stack.Screen name="Album" component={AlbumScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;