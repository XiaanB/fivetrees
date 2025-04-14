import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert, Linking } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const fiveTreesLocation = {
    latitude: -43.50257416921142,
    longitude: 172.58669100802567,
  };

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location to use this feature.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const openGoogleMaps = () => {
    if (!userLocation) {
      Alert.alert('Location not available', 'Please wait while we fetch your location.');
      return;
    }

    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const destination = `${fiveTreesLocation.latitude},${fiveTreesLocation.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...fiveTreesLocation,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={fiveTreesLocation}
          title="Five Trees Ltd"
          description="119 Brookside Terrace, Bryndwr, Christchurch 8053"
        />

        <Circle
          center={fiveTreesLocation}
          radius={1000}
          strokeColor="rgba(255,0,0,0.8)"
          fillColor="rgba(255,0,0,0.2)"
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Get Directions" onPress={openGoogleMaps} />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
});
