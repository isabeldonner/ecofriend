import * as React from 'react';
import { View, Text } from 'react-native';

const myToken = 'IEB3TDJEQOBY44QQ4TMZ';
const apiUrl = 'https://www.eventbriteapi.com/v3/events/search/?token=IEB3TDJEQOBY44QQ4TMZ&categories=111&location.address=gainesville&location.within=20mi';

fetch(apiUrl, {
  headers: {
    "Authorization": `Bearer ${myToken}`
  }
})

.then(response =>{
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
})

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