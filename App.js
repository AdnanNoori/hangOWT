import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import GetLocation from 'react-native-get-location';
// import RNLocation from 'react-native-location';
import GooglePlacesInput from './client/GooglePlacesInput.js';
import Map from './client/Map.js';

export default function App() {
  const [currentView, setCurrentView] = useState({latitude: 0, longitude: 0});

  const updateCurrentView = (location) => {
    setCurrentView({latitude: location.latitude, longitude: location.longitude});
  }

  return (
    <View style={styles.constainer}>
      <Map currentView={currentView} updateCurrentView={updateCurrentView}></Map>
      <GooglePlacesInput/>
    </View>

  );
};

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
});