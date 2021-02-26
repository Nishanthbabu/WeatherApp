/**
 * Starting point
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import CityNameInputScreen from './app/screens/CityNameInputScreen';
import store from './app/redux/store';
import {createStackNavigator} from '@react-navigation/stack';
import WeatherList from './app/screens/WeatherList';
import WeatherDetails from './app/screens/WeatherDetails';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CityNameInputScreen">
          <Stack.Screen
            name="CityNameInputScreen"
            component={CityNameInputScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WeatherList"
            component={WeatherList}
            options={({route}) => ({
              title: route.params.name,
              headerStyle: {
                backgroundColor: '#5116f4',
              },
              headerTintColor: '#fff',
            })}
          />
          <Stack.Screen
            name="WeatherDetails"
            component={WeatherDetails}
            options={({route}) => ({
              title: route.params.name,
              headerStyle: {
                backgroundColor: '#5116f4',
              },
              headerTintColor: '#fff',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
