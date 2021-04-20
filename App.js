import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';
import Notes from './screens/Notes';
// importam navigtorul pe care l-am creat

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './routes/homeStack';

export default function App() {
  return (
        //nav stack for home
        <HomeStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
