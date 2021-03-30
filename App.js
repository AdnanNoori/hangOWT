import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import GetLocation from 'react-native-get-location';
// import RNLocation from 'react-native-location';
import GooglePlacesInput from './client/GooglePlacesInput.js';
import Map from './client/Map.js';
import { getUserLocation } from './client/helperFunctions/helperFunctions.js';

export default function App() {

  const [currentView, setCurrentView] = useState({latitude: 0, longitude: 0});

  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  const updateCurrentView = (location) => {
    setCurrentView({latitude: location.latitude, longitude: location.longitude});
  }

  const resetView = () => {
    setCurrentView({latitude: userLocation.latitude, longitude: userLocation.longitude});
  }

  useEffect(() => {
    getUserLocation((locations) => {
      setUserLocation({latitude: locations[0].latitude, longitude: locations[0].longitude})
      updateCurrentView(locations[0]);
    })
  }, [])


  return (
    <View style={styles.constainer}>
      <Map currentView={currentView} userLocation={userLocation}/>
      <GooglePlacesInput currentView={currentView} updateCurrentView={updateCurrentView}/>
      <View>
        <Button
          title='click'
          onPress={resetView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
});