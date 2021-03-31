import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import GooglePlacesInput from './client/GooglePlacesInput.js';
import Map from './client/Map.js';
import { getUserLocation } from './client/helperFunctions/helperFunctions.js';

export default function App() {

  const [currentView, setCurrentView] = useState({latitude: 0, longitude: 0});

  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  const [potentialEvent, setPotentialEvent] = useState(false)

  const updateCurrentView = (location) => {
    setCurrentView({latitude: location.latitude, longitude: location.longitude});
  }

  const resetView = () => {
    setCurrentView({latitude: userLocation.latitude, longitude: userLocation.longitude});
    setPotentialEvent(false);
  }

  useEffect(() => {
    getUserLocation((locations) => {
      setUserLocation({latitude: locations[0].latitude, longitude: locations[0].longitude})
      updateCurrentView(locations[0]);
    })
  }, [])


  return (
    <View style={styles.constainer}>
      <Map
      potentialEvent={potentialEvent}
      currentView={currentView}
      userLocation={userLocation}
      />
      <View style={styles.resetButton}>
        <Button
          title='Reset'
          onPress={resetView}
        />
      </View>
      <View style={styles.searchInput}>
        <GooglePlacesInput
        currentView={currentView}
        updateCurrentView={updateCurrentView}
        setPotentialEvent={setPotentialEvent}
        />
      </View>
    </View>
  );
};

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
  resetButton: {
    position: 'absolute',
    right: 20,
    top: 100
  },
  searchInput: {
    position: 'absolute',
    width: width
  }
});