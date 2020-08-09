import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import MainScreen from '../screens/MainScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

// const LanchStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         initialRouteName: 'SplashScreen',
//       }}>
//       <Stack.Screen name="SplashScreen" component={SplashScreen} />
//     </Stack.Navigator>
//   );
// };

// const MainStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         initialRouteName: 'MainScreen',
//         gestureEnabled: false,
//       }}>
//       <Stack.Screen name="MainScren" component={MainScreen} />
//     </Stack.Navigator>
//   );
// };

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            initialRouteName: 'SplashScreen',
            gestureEnabled: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            options={{
              animationEnabled: false,
            }}
            name="MainScreen"
            component={MainScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
