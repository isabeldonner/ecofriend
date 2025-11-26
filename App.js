import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { supabase } from './supabase';
import Auth from './auth';
import Account from './account';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import orgMap from './map'; 
import eventsNear from './eventsNear';
import { HabitTracker } from "./components/HabitTracker";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={orgMap} />
      <Tab.Screen name="Events" component={eventsNear} />
      <Tab.Screen name="Habit Tracker" component={HabitTracker} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default function App() {
  // Wrap your tabs in NavigationContainer
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}