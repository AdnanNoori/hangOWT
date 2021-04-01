import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { googleKey } from '../config.js';
import Constants from 'expo-constants';
import axios from 'axios';

const GooglePlacesInput = ({ currentView, updateCurrentView, setPotentialEvent, setPotentialEventAddress }) => {
  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: googleKey,
          language: 'en',
        }}
        onPress={(data, details = null) => {
          setPotentialEventAddress(data.description);
          var location = data.description.split(' ').join('+')
          axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=geojson`)
            .then((geoCode) => {
              let position = JSON.parse(geoCode.request["_response"]).features[0].geometry;
              updateCurrentView({longitude: position.coordinates[0], latitude: position.coordinates[1]})
              setPotentialEvent(true);
            })
            .catch((err) => {
              console.log(err);
            })

        }}
        onFail={(error) => console.error(error)}
        styles={{
          textInputContainer: {
          },
          textInput: {
            height: 38,
            fontSize: 16,
          },
        }}
      />
    </View>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight - 20,
  },
});