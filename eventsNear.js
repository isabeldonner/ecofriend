import * as React from 'react';
import { View, Text, ScrollView, Linking, StyleSheet } from 'react-native';

const volunteerEvents = require('./listings-api-sample-volops (2) 2/volops.json').volops;

export default function eventsNear() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Volunteer Events Near You</Text>
      {volunteerEvents.map((event, index) => (
        event.isPublished &&
        <View key={event.id || index} style={styles.card}>
          <Text style={styles.name}>{event.name}</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(event.url.en)}
          >
            View Details
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    marginBottom: 6,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
