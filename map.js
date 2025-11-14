import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const GNV_REGION = {
  latitude: 29.6516,
  longitude: -82.3248,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Overpass API query: amenities=fuel within 5km of Gainesville center
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["leisure"="nature_reserve"](around:48000, ${GNV_REGION.latitude}, ${GNV_REGION.longitude});
        way["leisure"="nature_reserve"](around:48000, ${GNV_REGION.latitude}, ${GNV_REGION.longitude});
        relation["leisure"="nature_reserve"](around:48000, ${GNV_REGION.latitude}, ${GNV_REGION.longitude});
      );
      out center tags;
    `;
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: `data=${encodeURIComponent(overpassQuery)}`
    })
      .then(r => r.json())
      .then(json => {
        const points = (json.elements || []).map(el => {
          // ways/relations have a 'center'; nodes have lat/lon directly
          const lat = el.lat ?? el.center?.lat;
          const lon = el.lon ?? el.center?.lon;
          return {
            id: `${el.type}/${el.id}`,
            name: el.tags?.name || 'Gas station',
            brand: el.tags?.brand,
            latitude: lat,
            longitude: lon,
          };
        }).filter(p => p.latitude && p.longitude);
        setStations(points);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //provider={PROVIDER_GOOGLE} // optional; remove if you want Apple Maps on iOS
        initialRegion={GNV_REGION}
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
  map: { width: '100%', height: '100%' },
  spinner: { position: 'absolute', top: 20, right: 20 }
});
