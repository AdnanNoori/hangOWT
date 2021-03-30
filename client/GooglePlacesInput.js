import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { googleKey } from '../config.js';
import Constants from 'expo-constants';
import axios from 'axios';

const GooglePlacesInput = () => {
  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: googleKey,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => {
          var location = data.description.split(' ').join('+')
          axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=geojson`)
            .then((geoCode) => {
              console.log(JSON.parse(geoCode.request["_response"]).features[0].geometry);
            });

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
    paddingTop: Constants.statusBarHeight + 10,
  },
});