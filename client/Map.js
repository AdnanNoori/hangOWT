import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';

const Map = ({ currentView, updateCurrentView }) => {

  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
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
            updateCurrentView(locations[0])
          })
        }
      })
  }, [])

  return (
    <View style={styles.constainer}>
      <MapView
        style={styles.constainer}
        showsUserLocation={true}
        region={{
          latitude: currentView.latitude,
          longitude: currentView.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude : 37.78525 , longitude : -122.4124 }}
          title={'Hello'}
          description={'World'}
          image={require('../marker.png')}
        >
        </Marker>
        {console.log(userLocation)}
        <Marker
          coordinate={{ latitude : userLocation.latitude , longitude : userLocation.longitude }}
          title={'Hello'}
          description={'World'}
          image={require('../marker.png')}
        >
        </Marker>
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  constainer: {
    ...StyleSheet.absoluteFillObject,
  },
});