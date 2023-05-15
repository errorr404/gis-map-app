import React from 'react';
import { StyleSheet, View } from 'react-native';

import FieldMapView from './Components/MapView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login';
import Register from './Components/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
 
      <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Register} />
        <Stack.Screen name="GISFIELDS" component={FieldMapView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '90%',
  },
});