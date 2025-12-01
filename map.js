import React, { useEffect, useState, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator, TextInput } from 'react-native';
import { geocode } from 'react-native-geocodex';

const INITIAL_REGION = {
  latitude: 29.6516,
  longitude: -82.3248,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState(INITIAL_REGION);

  const loadStations = useCallback(async (lat, lon) => {
    setLoading(true);
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["leisure"="nature_reserve"](around:48000, ${lat}, ${lon});
          way["leisure"="nature_reserve"](around:48000, ${lat}, ${lon});
          relation["leisure"="nature_reserve"](around:48000, ${lat}, ${lon});
        );
        out center tags;
      `;

      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: `data=${encodeURIComponent(overpassQuery)}`,
      });

      const json = await res.json();

      const points =
        (json.elements || [])
          .map((el) => {
            const lat = el.lat ?? el.center?.lat;
            const lon = el.lon ?? el.center?.lon;
            return {
              id: `${el.type}/${el.id}`,
              name: el.tags?.name || 'Nature reserve',
              latitude: lat,
              longitude: lon,
            };
          })
          .filter((p) => p.latitude && p.longitude);

      setStations(points);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStations(INITIAL_REGION.latitude, INITIAL_REGION.longitude);
  }, [loadStations]);


  const handleSearch = useCallback(async () => {
    if (!location.trim()) return;

    try {
      setLoading(true);
      const results = await geocode(location);
      const first = Array.isArray(results) ? results[0] : results;

      if (!first) {
        setLoading(false);
        return;
      }

      const { latitude, longitude } = first;

      setRegion(prev => ({
        ...prev,
        latitude,
        longitude,
      }));

      await loadStations(latitude, longitude);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }, [location, loadStations]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={region}
      >
        {stations.map(s => (
          <Marker
            key={s.id}
            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
            title={s.name}
          />
        ))}
      </MapView>

      {loading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    height: 40,
  },
  spinner: { position: 'absolute', top: 20, right: 20 },
});
