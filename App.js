import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import orgMap from './map';        // make sure these default-export a component
import eventsNear from './eventsNear';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={orgMap} />
      <Tab.Screen name="Events" component={eventsNear} />
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