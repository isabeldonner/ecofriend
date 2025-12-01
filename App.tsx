import React, { useState, useEffect } from 'react';
import { CompositeNavigationProp, NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {supabase} from './supabase';
import Auth from './auth'; 
import orgMap from './map';
import eventsNear from './eventsNear'; 
import Account from './account'; 
import { Session } from '@supabase/supabase-js'
import { HabitTracker } from "./components/HabitTracker";
//import { Tabs } from 'react-tabs';

// Define types for the Tab and Stack navigators
type TabParamList = {
  Map: undefined;
  Events: undefined;
  HabitTracker: undefined;
  Account: undefined;
};

type StackParamList = {
  Auth: undefined;
  Tabs: undefined;
};

type CompositeTabNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabParamList>,
NativeStackNavigationProp<StackParamList>
>;

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<StackParamList>();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={orgMap} />
      <Tab.Screen name="Events" component={eventsNear} />
      <Tab.Screen name="HabitTracker" component={HabitTracker} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {session ? (
        <Tabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}