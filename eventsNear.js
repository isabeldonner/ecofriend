import * as React from 'react';
import { View, Text } from 'react-native';

const token = 'P7BKAVOFLVKD7JTOPW';
const apiUrl = 'https://www.eventbrite.com/oauth/token';

fetch(apiUrl, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => 
  {console.log('User data:', data);
})
.catch(error => {
  console.error('Error fetching user data:', error);
});

export default function eventsNear() {
  return (
    <View><Text>Events</Text></View>
  );
}