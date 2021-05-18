import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';
import Notes from './screens/Notes';
// importam navigtorul pe care l-am creat

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './routes/homeStack';
 import DrawerStack from './routes/drawerStack'

import Database from 'expo-sqlite-hooks/database';
import { DBProvider } from 'expo-sqlite-hooks/context/database';


export default function App() {

  const db = new Database("Note-ez-app-DB-try", "1.0");

  return (
        //nav stack for home
        <DBProvider db={db}>
          <DrawerStack />
        </DBProvider>
        
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
