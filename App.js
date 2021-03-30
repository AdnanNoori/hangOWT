import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//import GetLocation from 'react-native-get-location';
import RNLocation from 'react-native-location';
import GooglePlacesInput from './client/GooglePlacesInput.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { googleKey } from './config.js';

export default function App() {

  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  RNLocation.configure({
    distanceFilter: 5.0
  })

  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse"
    }
  }).then(granted => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
          setUserLocation({latitude: locations[0].latitude, longitude: locations[0].longitude})
        })
      }
    })

  return (
    <View style={styles.constainer}>
      <View style={styles.map}>
        <MapView
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: 37.78525,
          longitude: -122.4124,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0121,
        }}
        >
        <Marker
          coordinate={{ latitude : 37.78525 , longitude : -122.4124 }}
          title={'Hello'}
          description={'World'}
          image={require('./marker.png')}
        >
        </Marker>
        {console.log(userLocation)}
        <Marker
          coordinate={{ latitude : userLocation.latitude , longitude : userLocation.longitude }}
          title={'Hello'}
          description={'World'}
          image={require('./marker.png')}
        >
        </Marker>
      </MapView>
     </View>
     <GooglePlacesInput/>
    </View>

  );
}

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

{/* <View style={styles.container}>
      <Text style={styles.search}>HELLO</Text>
      <MapView
       style={styles.map}
       showsUserLocation={true}
       region={{
         latitude: 37.78525,
         longitude: -122.4124,
         latitudeDelta: 0.05,
         longitudeDelta: 0.0121,
       }}
     >
      <Marker
        coordinate={{ latitude : 37.78525 , longitude : -122.4124 }}
        title={'Hello'}
        description={'World'}
        image={require('./marker.png')}
      >
      </Marker>
      {console.log(userLocation)}
      <Marker
        coordinate={{ latitude : userLocation.latitude , longitude : userLocation.longitude }}
        title={'Hello'}
        description={'World'}
        image={require('./marker.png')}
      >
      </Marker>
     </MapView>
    </View> */}