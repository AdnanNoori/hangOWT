import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import GetLocation from 'react-native-get-location';
// import RNLocation from 'react-native-location';
import GooglePlacesInput from './client/GooglePlacesInput.js';
import Map from './client/Map.js';

export default function App() {

  return (
    <View style={styles.constainer}>
      <Map></Map>
      <GooglePlacesInput/>
    </View>

  );
};

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});